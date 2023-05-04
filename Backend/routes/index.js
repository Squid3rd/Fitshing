const express = require('express')
const pool = require("../config");

router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    let results = await pool.query('SELECT * FROM exercise left OUTER JOIN ex_image ON (exercise.ex_id = ex_image.ex_id) left outer join ex_type on (exercise.type1 = ex_type.id);');
    res.send(results[0])
    console.log(results[0])
  } catch (err) {
    return next(err)
  }
});



exports.router = router;