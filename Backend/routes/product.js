const express = require('express')
const pool = require("../config");
const multer = require("multer");
const path = require("path");
const { timeStamp } = require('console');

router = express.Router();

router.get("/product", async function (req, res, next) {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM exercise RIGHT OUTER JOIN ex_image using (ex_id)')
    return res.json(rows)
  } catch (err) {
    console.log(err);
    next(err)
  }
});

// View Preview
router.get("/product/:id", function (req, res, next) {

  const promise1 = pool.query("SELECT * FROM exercise WHERE ex_id=?", [
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
        product: products,
        images: images,
        error: null,
      });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

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
const upload = multer({ storage: storage });

// Add Product
router.post("/product",  upload.single('images'), async function (req, res, next) {

    const images = req.file.path.substr(6);
  
    const ex_name = req.body.ex_name;
    const ex_info = req.body.ex_info;
    const amount = req.body.amount;
    const ex_price = req.body.ex_price;
    const type1 = req.body.type1;
  
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
        // res.redirect("/")
    } catch (err) {
        console.log(err)
        await conn.rollback();
        res.status(400).json(err.toString());
    } finally {
        conn.release()
    }
  });



exports.router = router;