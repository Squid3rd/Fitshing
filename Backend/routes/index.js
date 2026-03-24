const express = require('express')
const pool = require("../config");
const { isLoggedIn, isAdmin } = require('../middlewares')

const router = express.Router();

// Get all products with images
router.get("/product", async function (req, res, next) {
  try {
    const [rows] = await pool.query('SELECT * FROM exercise RIGHT OUTER JOIN ex_image using (ex_id)')
    return res.json(rows)
  } catch (err) {
    next(err)
  }
});

// Product detail (single query - images extracted from JOIN results)
router.get("/preview/:id", async function (req, res, next) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM exercise RIGHT OUTER JOIN ex_image USING (ex_id) WHERE ex_id = ?",
      [req.params.id]
    );
    const images = rows.map(r => ({ file_path: r.file_path }));
    return res.json({ product: rows, images });
  } catch (err) {
    return next(err);
  }
});

// Admin get all payments
router.get("/payment", isLoggedIn, isAdmin, async function (req, res, next) {
  try {
    const [rows] = await pool.query('SELECT * FROM payment')
    return res.json(rows)
  } catch (err) {
    next(err)
  }
});

// User get their payments
router.get("/payment/:id", isLoggedIn, async function (req, res, next) {
  try {
    const [payments] = await pool.query("SELECT * FROM payment WHERE u_id=?", [req.params.id]);
    res.json({
      payment: payments,
      error: null,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

exports.router = router;
