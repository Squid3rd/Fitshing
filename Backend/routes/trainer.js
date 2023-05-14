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

// Get trainer
router.get("/trainer", async function (req, res, next) {
  try {
    const [rows, fields] = await pool.query('SELECT * FROM trainer RIGHT OUTER JOIN users on (users.id = trainer.u_id) where status=1;')
    return res.json(rows)
  } catch (err) {
    console.log(err);
    next(err)
  }
});

// View Preview
router.get("/trainer/:id", function (req, res, next) {

  const promise1 = pool.query("SELECT * FROM trainer RIGHT OUTER JOIN users on (users.id = trainer.u_id) where status=1 and t_id = ?;", [
    req.params.id
  ]);

  Promise.all([promise1])
    .then((results) => {
      const [trainers, trainerFields] = results[0];
      res.json({
        trainer: trainers[0],
        error: null,
      });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

// Add Trainer
router.put("/trainer/:id", async function (req, res, next) {
  
    const specialize = req.body.specialize;
    const certificate = req.body.certificate;
    const info = req.body.info;
  
    const conn = await pool.getConnection();
    await conn.beginTransaction();
  
    try {
      let results = await conn.query(
        "Update trainer set specialize=?, certificate=?, info=? where u_id = ?",
        [specialize, certificate, info, req.params.id]
      );

      let results1 = await conn.query(
        "UPDATE users set status=1 where id= ?",
        [req.params.id]
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

// Update status 
// router.put("/trainer/:id", async function (req, res, next) {

//   const conn = await pool.getConnection();
//   await conn.beginTransaction();

//   try {
//     let results = await conn.query(
//       "INSERT INTO trainer (specialize, certificate, info, u_id) " +
//       "VALUES(?, ?, ?, );",
//       [specialize, certificate, info, req.params.id]
//     );

//     await conn.commit();
//     res.send("success!");
//   } catch (err) {
//     await conn.rollback();
//     return res.status(400).json(err);
//   } finally {
//     conn.release();
//   }
// });

exports.router = router;