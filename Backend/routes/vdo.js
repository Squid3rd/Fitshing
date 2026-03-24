const express = require("express");
const pool = require("../config");
const multer = require("multer");
const path = require("path");
const Joi = require("joi");
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
    callback(null, "./static/uploads/vdo");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage, limits: { fileSize: 1000000 }, fileFilter: imageFileFilter });

// Get all videos (supports pagination: ?page=1&limit=20)
router.get("/vdo", async function (req, res, next) {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 0;

    if (page > 0 && limit > 0) {
      const offset = (page - 1) * limit;
      const [[{ total }]] = await pool.query('SELECT COUNT(*) as total FROM vdo_clip');
      const [rows] = await pool.query(
        'SELECT * FROM vdo_clip LIMIT ? OFFSET ?',
        [limit, offset]
      );
      return res.json({ data: rows, total, page, limit, totalPages: Math.ceil(total / limit) });
    }

    const [rows] = await pool.query('SELECT * FROM vdo_clip');
    return res.json(rows);
  } catch (err) {
    next(err)
  }
});

// Get single video
router.get("/vdo/:id", async function (req, res, next) {
  try {
    const [vdos] = await pool.query("SELECT * FROM vdo_clip WHERE id=?", [req.params.id]);
    res.json({
      vdo: vdos[0],
      error: null,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

const addvdoSchema = Joi.object({
  info: Joi.string().required().min(25).max(240),
  link_vdo: Joi.string().required().uri({ scheme: ['https'], allowQuerySquareBrackets: true }),
  clip_name: Joi.string().required().min(5).max(240),
})

// Add video
router.post("/vdo", isLoggedIn, isAdmin, upload.single('images'), async function (req, res, next) {
  try {
    await addvdoSchema.validateAsync(req.body, { abortEarly: false })
  } catch (err) {
    return res.status(400).json(err.message)
  }

  const images = req.file.path.substr(6);
  const { info, link_vdo, clip_name } = req.body;

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    await conn.query(
      "INSERT INTO vdo_clip(info, link_vdo, clip_name, image1, date) VALUES(?, ?, ?, ?, CURRENT_TIMESTAMP);",
      [info, link_vdo, clip_name, images]
    );

    await conn.commit()
    res.status(201).json({ message: "Video created" })
  } catch (err) {
    await conn.rollback();
    res.status(400).json({ message: err.toString() });
  } finally {
    conn.release()
  }
});

const updateSchema = Joi.object({
  info: Joi.string().required().min(25).max(150),
  link_vdo: Joi.string().required().uri({ scheme: ['https'], allowQuerySquareBrackets: true }),
  clip_name: Joi.string().required().min(5).max(240),
})

// Update video
router.put("/vdo/edit/:id", isLoggedIn, isAdmin, async function (req, res, next) {
  try {
    await updateSchema.validateAsync(req.body, { abortEarly: false })
  } catch (err) {
    return res.status(400).json(err.message)
  }

  const { info, link_vdo, clip_name } = req.body;

  const conn = await pool.getConnection()
  await conn.beginTransaction();

  try {
    await conn.query(
      "UPDATE vdo_clip SET clip_name=?, info=?, link_vdo=? WHERE id=?",
      [clip_name, info, link_vdo, req.params.id]
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

// Update video thumbnail
router.put("/vdo/update/image/:id", isLoggedIn, isAdmin, upload.single('imagesC'), async function (req, res, next) {
  const imagesC = req.file.path.substr(6);

  const conn = await pool.getConnection()
  await conn.beginTransaction();

  try {
    const [images] = await conn.query(
      "SELECT image1 FROM `vdo_clip` WHERE `id` = ?",
      [req.params.id]
    );

    const appDir = path.dirname(require.main.filename);
    const p = path.join(appDir, 'static', images[0].image1);
    try { await fs.unlink(p); } catch {}

    await conn.query(
      'UPDATE `vdo_clip` SET image1 = ? WHERE `id`=?', [imagesC, req.params.id]
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

// Delete video
router.delete("/vdo/:id", isLoggedIn, isAdmin, async function (req, res, next) {
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    await conn.query("DELETE FROM vdo_clip WHERE id = ?", [req.params.id]);
    await conn.commit();
    res.status(204).send();
  } catch (err) {
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    conn.release();
  }
});

exports.router = router;
