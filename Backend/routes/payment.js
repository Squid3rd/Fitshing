const express = require('express')
const pool = require("../config");
const Joi = require('joi')

router = express.Router();

// router.get("/payment/:id", async function (req, res, next) {
//     try {
//       const [rows, fields] = await pool.query('SELECT * FROM payment where u_id=?', [req.params.id])
//       console.log(rows)
//       return res.json(rows)
//     } catch (err) {
//       console.log(err);
//       next(err)
//     }
//   });
  

exports.router = router;