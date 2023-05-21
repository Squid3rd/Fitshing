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

// View Edit Preview
router.get("/trainer/edit/:id", function (req, res, next) {

  const promise1 = pool.query("SELECT * FROM trainer RIGHT OUTER JOIN users on (users.id = trainer.u_id) where status=1 and u_id = ?;", [
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
    const amount_t = req.body.amount_t;
  
    const conn = await pool.getConnection();
    await conn.beginTransaction();
  
    try {
      let results = await conn.query(
        "Update trainer set specialize=?, certificate=?, info=?, amount_t=? where u_id = ?",
        [specialize, certificate, info, amount_t, req.params.id]
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

// Update Trainer
router.put("/trainer/edit/:id", async function (req, res, next) {

    const specialize = req.body.specialize;
    const certificate = req.body.certificate;
    const info = req.body.info;
    const amount_t = req.body.amount_t;
  
    const conn = await pool.getConnection();
    await conn.beginTransaction();

  try {
    let results = await conn.query(
      "Update trainer set specialize=?, certificate=?, info=?, amount_t=? where u_id = ?",
      [specialize, certificate, info, amount_t, req.params.id]
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

// Delete Trainer
// router.delete("/request/deletetrainer/:id", async function (req, res, next) {

//   const conn = await pool.getConnection();
//   await conn.beginTransaction();

//   console.log(req.params.id)

//   try {
//     const [
//       rows1,
//       fields1,
//     ] = await conn.query("select * FROM request WHERE t_id = ?", [
//       req.params.id,
//     ]);


//     // Delete the Request
//     if(rows1[0] != null){
//       console.log("cannot ")
//     }
//     else{
//       const [
//         rows2,
//         fields2,
//       ] = await conn.query("DELETE FROM trainer WHERE u_id = ?", [
//         req.params.id,
//       ]);
//       if (rows2.affectedRows === 1) {
//         await conn.commit();
//         res.status(204).send();
//       } else {
//         throw "Cannot delete the Request";
//       }
//     }

    
//   } catch (err) {
//     console.log(err)
//     await conn.rollback();
//     return res.status(500).json(err);
//   } finally {
//     conn.release();
//   }
// });

// Update when delete
router.put("/request/deletetrainer/:id", async function (req, res, next) {
  

  const conn = await pool.getConnection()
  await conn.beginTransaction();

  try {

    const [
      rows1,
      fields1,
    ] = await conn.query("select * FROM request WHERE t_id = ?", [
      req.params.id,
    ]);

    console.log(req.params.id)

    if(rows1[0]){
      console.log("cannot ")
      throw "Cannot delete the Request Because You have member";
    }
    else{
      let results = await conn.query(
        "Update trainer set specialize=?, certificate=?, info=?, amount_t=? where u_id = ?",
        ["", "", "", 0, req.params.id]
      );
  
      let results1 = await conn.query(
        "UPDATE users set status=0 where id= ?",
        [req.params.id]
      );

      // if (results.affectedRows === 1) {
      //   await conn.commit();
      //   res.status(204).send();
      // } else {
      //   throw "Cannot delete the Request";
      // }
    }

    await conn.commit()
    res.send("success!");
  } catch (err) {
    await conn.rollback();
    next(err);
  } finally {
    console.log('finally')
    conn.release();
  }
  return;
});


exports.router = router;