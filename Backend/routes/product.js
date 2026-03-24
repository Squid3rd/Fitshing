const express = require('express')
const pool = require("../config");
const multer = require("multer");
const path = require("path");
const Joi = require('joi')
const fs = require("fs").promises;
const { isLoggedIn, isAdmin } = require('../middlewares')

const router = express.Router();

// File filter for image uploads
const imageFileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files (jpeg, jpg, png, gif, webp) are allowed'));
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./static/uploads/exercise");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage, limits: { fileSize: 1000000 }, fileFilter: imageFileFilter });

// Get all products (supports pagination: ?page=1&limit=20)
router.get("/product", async function (req, res, next) {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 0;

    if (page > 0 && limit > 0) {
      const offset = (page - 1) * limit;
      const [[{ total }]] = await pool.query('SELECT COUNT(*) as total FROM exercise');
      const [rows] = await pool.query(
        'SELECT * FROM exercise RIGHT OUTER JOIN ex_image USING (ex_id) LEFT OUTER JOIN ex_type ON (exercise.type1 = ex_type.id) LIMIT ? OFFSET ?',
        [limit, offset]
      );
      return res.json({ data: rows, total, page, limit, totalPages: Math.ceil(total / limit) });
    }

    const [rows] = await pool.query(
      'SELECT * FROM exercise RIGHT OUTER JOIN ex_image USING (ex_id) LEFT OUTER JOIN ex_type ON (exercise.type1 = ex_type.id)'
    );
    return res.json(rows);
  } catch (err) {
    next(err)
  }
});

// View product preview (single query with JOIN, images extracted from results)
router.get("/product/:id", async function (req, res, next) {
  try {
    const [rows] = await pool.query(
      "SELECT e.*, t.name as type_name, i.file_path, i.date as image_date " +
      "FROM exercise e LEFT JOIN ex_type t ON e.type1 = t.id " +
      "LEFT JOIN ex_image i USING (ex_id) WHERE e.ex_id = ?",
      [req.params.id]
    );

    if (!rows.length) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const images = rows.map(r => ({ file_path: r.file_path, date: r.image_date }));
    const { file_path, image_date, ...product } = rows[0];
    product.file_path = file_path;

    res.json({ product, images, error: null });
  } catch (err) {
    return res.status(500).json(err);
  }
});

const addproductSchema = Joi.object({
  ex_name: Joi.string().required().max(150),
  ex_info: Joi.string().required().max(240),
  ex_price: Joi.number().required(),
  amount: Joi.number().required(),
  type1: Joi.number().required(),
})

// Add Product
router.post("/product", isLoggedIn, isAdmin, upload.single('images'), async function (req, res, next) {
  try {
    await addproductSchema.validateAsync(req.body, { abortEarly: false })
  } catch (err) {
    return res.status(400).json(err.message)
  }

  const images = req.file.path.substr(6);
  const { ex_name, ex_info, amount, ex_price, type1 } = req.body;

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    let results = await conn.query(
      "INSERT INTO exercise(ex_name, ex_info, amount, ex_price, type1) VALUES(?, ?, ?, ?, ?);",
      [ex_name, ex_info, amount, ex_price, type1]
    );

    const exerciseId = results[0].insertId;

    await conn.query(
      "INSERT INTO ex_image(ex_id, file_path, date) VALUES(?, ?, CURRENT_TIMESTAMP)",
      [exerciseId, images]
    );

    await conn.commit()
    res.status(201).json({ message: "Product created" })
  } catch (err) {
    await conn.rollback();
    res.status(400).json({ message: err.toString() });
  } finally {
    conn.release()
  }
});

// Delete Product
router.delete("/product/:id", isLoggedIn, isAdmin, async function (req, res, next) {
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    const [images] = await conn.query(
      "SELECT * FROM ex_image WHERE ex_id = ?",
      [req.params.id]
    );

    const appDir = path.dirname(require.main.filename);
    await Promise.all(images.map(async (e) => {
      const p = path.join(appDir, 'static', e.file_path);
      try { await fs.unlink(p); } catch {}
    }));

    await conn.query("DELETE FROM ex_image WHERE ex_id = ?", [req.params.id]);

    const [rows2] = await conn.query("DELETE FROM exercise WHERE ex_id = ?", [req.params.id]);

    if (rows2.affectedRows === 1) {
      await conn.commit();
      res.status(204).send();
    } else {
      throw new Error("Cannot delete the Product");
    }
  } catch (err) {
    await conn.rollback();
    return res.status(500).json({ message: err.toString() });
  } finally {
    conn.release();
  }
});

const updateproductSchema = Joi.object({
  ex_name: Joi.string().required().max(150),
  ex_info: Joi.string().required().max(240),
  ex_price: Joi.number().required(),
  amount: Joi.number().required(),
  type1: Joi.number().required(),
})

// Update Product
router.put("/product/:id", isLoggedIn, isAdmin, async function (req, res, next) {
  try {
    await updateproductSchema.validateAsync(req.body, { abortEarly: false })
  } catch (err) {
    return res.status(400).json(err.message)
  }

  const { ex_name, ex_info, amount, ex_price, type1 } = req.body;

  const conn = await pool.getConnection()
  await conn.beginTransaction();

  try {
    await conn.query(
      "UPDATE exercise SET ex_name=?, ex_info=?, amount=?, ex_price=?, type1=? WHERE ex_id=?",
      [ex_name, ex_info, amount, ex_price, type1, req.params.id]
    )

    await conn.commit()
    res.json({ message: "success!" });
  } catch (err) {
    await conn.rollback();
    next(err);
  } finally {
    conn.release();
  }
});

// Update Image Product
router.put("/product/update/image/:id", isLoggedIn, isAdmin, upload.single('imagesC'), async function (req, res, next) {
  const imagesC = req.file.path.substr(6);

  const conn = await pool.getConnection()
  await conn.beginTransaction();

  try {
    const [images] = await conn.query(
      "SELECT `file_path` FROM `ex_image` WHERE `ex_id` = ?",
      [req.params.id]
    );

    const appDir = path.dirname(require.main.filename);
    const p = path.join(appDir, 'static', images[0].file_path);
    try { await fs.unlink(p); } catch {}

    await conn.query(
      'UPDATE `ex_image` SET file_path = ? WHERE `ex_id`=?', [imagesC, req.params.id]
    )

    await conn.commit()
    res.json({ message: "Update image Complete" })
  } catch (error) {
    await conn.rollback();
    next(error)
  } finally {
    conn.release();
  }
});

// Delete Image Product
router.put("/product/delete/image/:id", isLoggedIn, isAdmin, async function (req, res, next) {
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    const [images] = await conn.query(
      "SELECT `file_path` FROM `ex_image` WHERE `ex_id` = ?",
      [req.params.id]
    );

    const appDir = path.dirname(require.main.filename);
    const p = path.join(appDir, 'static', images[0].file_path);
    try { await fs.unlink(p); } catch {}

    await conn.query(
      'DELETE FROM `ex_image` WHERE `ex_id`=?', [req.params.id]
    )

    await conn.commit()
    res.json({ message: "Delete image Complete" })
  } catch (error) {
    await conn.rollback();
    next(error)
  } finally {
    conn.release();
  }
});

exports.router = router;
