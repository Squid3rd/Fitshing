const express = require('express')
const pool = require("../config");
const multer = require("multer");
const path = require("path");
const Joi = require('joi')
const fs = require("fs");
const { timeStamp } = require('console');

router = express.Router();

// router.get("/payment", async function (req, res, next) {
//     try {
//       const [rows, fields] = await pool.query('SELECT * FROM payment where p_id=36')
//       console.log(rows)
//       return res.json(rows)
//     } catch (err) {
//       console.log(err);
//       next(err)
//     }
//   });
  




exports.router = router;