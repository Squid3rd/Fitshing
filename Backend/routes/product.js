const express = require('express')
const pool = require("../config");
const multer = require("multer");
const path = require("path");
const Joi = require('joi')
const fs = require("fs");
const { timeStamp } = require('console');

router = express.Router();

router.get("/product", async function (req, res, next) {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM exercise RIGHT OUTER JOIN ex_image using (ex_id) left outer join ex_type on (exercise.type1 = ex_type.id);')
    return res.json(rows)
  } catch (err) {
    console.log(err);
    next(err)
  }
});

// View Preview
router.get("/product/:id", function (req, res, next) {

  const promise1 = pool.query("SELECT * FROM exercise left outer join ex_type on (exercise.type1 = ex_type.id) WHERE ex_id=?", [
    req.params.id,
  ]);
  const promise2 = pool.query("SELECT * FROM ex_image WHERE ex_id=?", [
    req.params.id,
  ]);

  Promise.all([promise1, promise2])
    .then((results) => {
      const [products, productFields] = results[0];
      const [images, imageFields] = results[1];
      res.json({
        product: products[0],
        images: images,
        error: null,
      });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

// Upload Image
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
const upload = multer({ storage: storage,
  limits: { fileSize: 1000000 } });


// Validate
const addproductSchema = Joi.object({
  ex_name: Joi.string().required().max(150),
  ex_info: Joi.string().required().max(150),
  ex_price: Joi.number().required(),
  amount: Joi.number().required(),
  type1: Joi.number().required(),
})

// Add Product
router.post("/product",  upload.single('images'), async function (req, res, next) {

  try {
    await addproductSchema.validateAsync(req.body, { abortEarly: false })
  } catch (err) {
    console.log(err)
    return res.status(400).json(err.message)

  }

    const images = req.file.path.substr(6);
  
    const ex_name = req.body.ex_name;
    const ex_info = req.body.ex_info;
    const amount = req.body.amount;
    const ex_price = req.body.ex_price;
    const type1 = req.body.type1;
  
    console.log(ex_name)
    console.log(ex_info)
    console.log(amount)
    console.log(ex_price)
    console.log(type1)

    const conn = await pool.getConnection();
    await conn.beginTransaction();
  
    try {
      let results = await conn.query(
        "INSERT INTO exercise(ex_name, ex_info, amount, ex_price, type1) " +
        "VALUES(?, ?, ?, ?, ?);",
        [ex_name, ex_info, amount, ex_price, type1]
      );

      const exerciseId = results[0].insertId;

      await conn.query(
        "INSERT INTO ex_image(ex_id, file_path, date) VALUES(?, ?, CURRENT_TIMESTAMP)",
        [exerciseId, images]
      );
  
        await conn.commit()
        res.status(201).send()
    } catch (err) {
        console.log(err)
        await conn.rollback();
        res.status(400).json(err.toString());
    } finally {
        conn.release()
  
    }
  });
  
  // Delete Product
  router.delete("/product/:id", async function (req, res, next) {

    const conn = await pool.getConnection();
    await conn.beginTransaction();
  
    try {
      //Delete files from the upload folder
      const [images,imageFields] = await conn.query(
        "SELECT * FROM ex_image WHERE ex_id = ?",
        [req.params.id]
      );

      const appDir = path.dirname(require.main.filename); 
      images.forEach((e) => {
        const p = path.join(appDir, 'static', e.file_path);
        fs.unlinkSync(p);
      });
  
      // Delete images
      await conn.query("DELETE FROM ex_image WHERE ex_id = ?", [
        req.params.id,
      ]);

      // Delete the Product
      const [
        rows2,
        fields2,
      ] = await conn.query("DELETE FROM exercise WHERE ex_id = ?", [
        req.params.id,
      ]);
  
      if (rows2.affectedRows === 1) {
        await conn.commit();
        res.status(204).send();
      } else {
        throw "Cannot delete the Product";
      }
    } catch (err) {
      console.log(err)
      await conn.rollback();
      return res.status(500).json(err);
    } finally {
      conn.release();
    }
  });

  // Update Product 
  router.put("/product/:id", async function (req, res, next) {
  
    const ex_name = req.body.ex_name;
    const ex_info = req.body.ex_info;
    const amount = req.body.amount;
    const ex_price = req.body.ex_price;
    const type1 = req.body.type1;
    // const ex_id = req.body.ex_id;
  
    console.log(req.params.ex_name)
    console.log(req.params.id)
    const conn = await pool.getConnection()
    await conn.beginTransaction();
  
    try {
      let results = await conn.query(
        "UPDATE exercise SET ex_name=?, ex_info=?, amount=?, ex_price=?, type1=? WHERE ex_id=?",
        [ex_name, ex_info, amount, ex_price, type1, req.params.id]
      )
  
      await conn.commit()
      res.send("success!");
    } catch (err) {
      await conn.rollback();
      next(err);
    } finally {
      console.log('finally')
      console.log(ex_price)
      conn.release();
    }
    return;
  });

  // Update Image Product
  router.put("/product/update/image/:id", upload.single('imagesC'), async function (req, res, next) {

    const imagesC = req.file.path.substr(6);

    const conn = await pool.getConnection()
    await conn.beginTransaction();
  
    try {
      // Get Path files from the upload folder
      const [
          images,
          imageFields,
      ] = await conn.query(
          "SELECT `file_path` FROM `ex_image` WHERE `ex_id` = ?",
          [req.params.id]
      );

      // Update File from path
      const appDir = path.dirname(require.main.filename); // Get app root directory
      console.log(appDir)
      const p = path.join(appDir, 'static', images[0].file_path);
      fs.unlinkSync(p);

      console.log("ddd")
    console.log
      // Delete Data from Table images
      const [rows1, fields1] = await conn.query(
          'update `ex_image` set file_path = ? WHERE `ex_id`=?', [imagesC ,req.params.id]
      )

      // commit
      await conn.commit()
      res.json({ message: "Update image Complete" })
  } catch (error) {
      next(error)
      await conn.rollback();
      // res.status(500).json(error)
  } finally {
      conn.release();
  }
  });

  // Delete Image Product
  router.put("/product/delete/image/:id", upload.single('imagesC'), async function (req, res, next) {

    const imagesC = req.file.path.substr(6);
  
    try {
      // Get Path files from the upload folder
      const [
          images,
          imageFields,
      ] = await conn.query(
          "SELECT `file_path` FROM `ex_image` WHERE `ex_id` = ?",
          [req.params.id]
      );

      // Delete File from path
      const appDir = path.dirname(require.main.filename); // Get app root directory
      console.log(appDir)
      const p = path.join(appDir, 'static', images[0].file_path);
      fs.unlinkSync(p);

      // Delete Data from Table images
      const [rows1, fields1] = await conn.query(
          'DELETE FROM `ex_image` WHERE `ex_id`=?', [req.params.id]
      )

      // commit
      await conn.commit()
      res.json({ message: "Delete image Complete" })
  } catch (error) {
      next(error)
      await conn.rollback();
      // res.status(500).json(error)
  } finally {
      conn.release();
  }
  });


//insert to payment
router.post("/payment", async function (req, res, next) {
  const quantity = req.body.quantity;
  const ex_id = req.body.ex_id;
    const slip_info = req.body.slip_info;
    const total_price = req.body.total_price;
    const u_id = req.body.u_id;
    const type = req.body.type;
    const conn = await pool.getConnection();
    await conn.beginTransaction();
  
    try {
      let [rows,fields] = await conn.query(
        "INSERT INTO payment(slip_info,date,amount, total_price, u_id, type) " +
        "VALUES(?,  CURRENT_TIMESTAMP,?,?, ?, ?);",
        [slip_info,quantity, total_price, u_id, type]
      );
      let [rowsEx,fieldsEx] = await conn.query(
        "UPDATE exercise SET amount = amount - ? WHERE ex_id=?",[quantity,ex_id]);
        await conn.commit()
        res.status(201).send()
    } catch (err) {
        console.log(err)
        await conn.rollback();
        res.status(400).json(err.toString());
    } finally {
        conn.release()
  
    }
  });

// Delete Product
router.delete("/product/:id", async function (req, res, next) {

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    //Delete files from the upload folder
    const [images,imageFields] = await conn.query(
      "SELECT * FROM ex_image WHERE ex_id = ?",
      [req.params.id]
    );

    const appDir = path.dirname(require.main.filename); 
    images.forEach((e) => {
      const p = path.join(appDir, 'static', e.file_path);
      fs.unlinkSync(p);
    });

    // Delete images
    await conn.query("DELETE FROM ex_image WHERE ex_id = ?", [
      req.params.id,
    ]);

    // Delete the Product
    const [
      rows2,
      fields2,
    ] = await conn.query("DELETE FROM exercise WHERE ex_id = ?", [
      req.params.id,
    ]);

    if (rows2.affectedRows === 1) {
      await conn.commit();
      res.status(204).send();
    } else {
      throw "Cannot delete the Product";
    }
  } catch (err) {
    console.log(err)
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    conn.release();
  }
});

exports.router = router;