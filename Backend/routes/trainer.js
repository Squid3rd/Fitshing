const express = require('express')
const pool = require("../config");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "./static/uploads");
    },
    filename: function (req, file, callback) {
      callback(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  const upload = multer({ storage: storage });

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

// Add Product
router.post("/product", upload.array("myImage", 5), async function (req, res, next) {

    const file = req.files;
    let pathArray = [];
  
    if (!file) {
      return res.status(400).json({ message: "Please upload a file" });
    }
  
    const ex_name = req.body.title;
    const ex_info = req.body.content;
    const amount = req.body.status;
    const ex_price = req.body.pinned;
  
    const conn = await pool.getConnection();
    await conn.beginTransaction();
  
    try {
      let results = await conn.query(
        "INSERT INTO exercise(ex_name, ex_info, amount, ex_price) " +
        "VALUES(?, ?, ?, ?);",
        [ex_name, ex_info, amount, ex_price]
      );
      const exerciseId = results[0].insertId;
  
      req.files.forEach((file, index) => {
        let path = [exerciseId, file.path.substring(6)];
        pathArray.push(path);
      });
  
      await conn.query(
        "INSERT INTO images(ex_id, file_path) VALUES ?;",
        [pathArray]
      );
  
      await conn.commit();
      res.send("success!");
    } catch (err) {
      await conn.rollback();
      return res.status(400).json(err);
    } finally {
      conn.release();
    }
  });



exports.router = router;