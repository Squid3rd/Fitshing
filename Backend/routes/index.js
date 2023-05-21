const express = require('express')
const pool = require("../config");

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

// detail
router.get("/preview/:id", async function (req, res, next) {

  const conn = await pool.getConnection();

  try {

    const [rows, fields] = await conn.query("SELECT * FROM exercise RIGHT OUTER JOIN ex_image using (ex_id) where ex_id = ?",
      [req.params.id]);
      
    const [images, imageFields] = await conn.query("SELECT `file_path` FROM `ex_image` WHERE `ex_id` = ?",
        [req.params.id]
      );
    return res.json(rows, images);

  } catch (err) {
    console.log(err)
    return next(err);
  }
});

// admin get payment
router.get("/payment", async function (req, res, next) {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM payment')
    return res.json(rows)
  } catch (err) {
    console.log(err);
    next(err)
  }
});

// user get Payment
router.get("/payment/:id", async function (req, res, next) {
  const promise1 = pool.query("SELECT * FROM payment WHERE u_id=?", [
    req.params.id,
  ]);

  Promise.all([promise1])
    .then((results) => {
      const [payments, paymentFields] = results[0];
      res.json({
        payment: payments,
        error: null,
      });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});


exports.router = router;