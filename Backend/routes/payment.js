const express = require('express')
const pool = require("../config");
const Joi = require('joi')
const { isLoggedIn } = require('../middlewares')

const router = express.Router();

const InserpaymentSchema = Joi.object({
  type: Joi.string().valid('Mobile Banking', 'Credit/Debit', 'Cash on Delivery').required(),
  quantity: Joi.number().required(),
  ex_id: Joi.number().required(),
  slip_info: Joi.string().required(),
  total_price: Joi.number().required(),
  u_id: Joi.number().required(),
})

// Insert payment
router.post("/payment", isLoggedIn, async function (req, res, next) {
  try {
    await InserpaymentSchema.validateAsync(req.body, { abortEarly: false })
  } catch (err) {
    return res.status(400).json(err.message)
  }

  const { quantity, ex_id, slip_info, total_price, u_id, type } = req.body;

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    await conn.query(
      "INSERT INTO payment(slip_info, date, amount, total_price, u_id, type) VALUES(?, CURRENT_TIMESTAMP, ?, ?, ?, ?);",
      [slip_info, quantity, total_price, u_id, type]
    );
    await conn.query(
      "UPDATE exercise SET amount = amount - ? WHERE ex_id=?",
      [quantity, ex_id]
    );

    await conn.commit()
    res.status(201).json({ message: "Payment created" })
  } catch (err) {
    await conn.rollback();
    res.status(400).json({ message: err.toString() });
  } finally {
    conn.release()
  }
});

exports.router = router;
