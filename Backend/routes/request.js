const express = require("express");
const pool = require("../config");
const Joi = require("joi");
const { timeStamp } = require("console");

router = express.Router();

// validate
// const addRequestSchema = Joi.object({
//   requestinfo: Joi.string().required().min(25).max(150),
// })

// Add Request
router.post("/request/:id", async (req, res, next) => {
  //     try {
  //         await addRequestSchema.validateAsync(req.body, { abortEarly: false })
  // } catch (err) {
  //         return res.status(400).send(err)
  // }
  const requestinfo = req.body.requestinfo;
  const u_id = req.body.u_id;
  let count = req.body.count;

  console.log(req.params.id)
  // const password = req.body.password

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    let results = await conn.query(
        "INSERT INTO request(request_info, status_r, u_id, t_id) " +
        "VALUES(?, false, ?, ?);",
        [requestinfo, u_id, req.params.id]
      );

    let results2 = await conn.query(
        "Update users set status=2 where id=?",
        [u_id]
    );

    let results4 = await conn.query(
      "Update trainer set amount_t=? where u_id=?",
      [--count ,req.params.id]
  );

    // let results3 = await conn.query(
    //     "Update users set status=2 where id=?",
    //     [req.params.id]
    // );
    conn.commit();
  } catch (error) {
    conn.rollback();
    res.status(400).json(error.toString());
  } finally {
    conn.release();
  }
});

// Trainer Get Request
router.get("/request/:id", function (req, res, next) {

  const promise1 = pool.query("SELECT * FROM request left outer join users on (request.u_id = users.id) WHERE t_id=?", [
    req.params.id,
  ]);

  Promise.all([promise1])
    .then((results) => {
      const [requests, requestFields] = results[0];
      res.json({
        request: requests,
        error: null,
      });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

// User Get Trainer
router.get("/request/gotit/:id", function (req, res, next) {

  const promise1 = pool.query("SELECT * FROM request left outer join users on (request.t_id = users.id) WHERE u_id=?", [
    req.params.id,
  ]);

  Promise.all([promise1])
    .then((results) => {
      const [userreqs, userreqFields] = results[0];
      res.json({
        userreq: userreqs,
        error: null,
      });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});

// Accept Request By Trainer
router.put("/request/accept/:id", async function (req, res, next) {
  // const ex_id = req.body.ex_id;
  const t_id = req.body.t_id;


  console.log(req.params.id)
  const conn = await pool.getConnection()
  await conn.beginTransaction();

  try {
    // let results = await conn.query(
    //   "UPDATE users SET status=3 WHERE id=?",
    //   [req.params.id]
    // )

    let results2 = await conn.query(
      "UPDATE users SET status=3 WHERE id=?",
      [t_id]
    )

    let results3 = await conn.query("UPDATE request SET status_r=1 WHERE u_id=?",
    [t_id])

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

// Reject Request Trainer
router.delete("/request/delete/trainer/:id", async function (req, res, next) {

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  // console.log("Trainer = "+ req.params.id)

  try {

    // Delete the Request
      const [
        rows2,
        fields2,
      ] = await conn.query("DELETE FROM request WHERE u_id = ?", [
        req.params.id,
      ]);
      if (rows2.affectedRows === 1) {
        await conn.commit();
        res.status(204).send();
      } else {
        throw "Cannot delete the Request";
      }
    
  } catch (err) {
    console.log(err)
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    conn.release();
  }
});

// Reject Request User
router.delete("/request/delete/user/:id", async function (req, res, next) {

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  console.log("User = "+ req.params.id)

  try {
    // Delete the Request
      const [
        rows2,
        fields2,
      ] = await conn.query("DELETE FROM request WHERE u_id = ?", [
        req.params.id,
      ]);
      if (rows2.affectedRows === 1) {
        await conn.commit();
        res.status(204).send();
      } else {
        throw "Cannot delete the Request";
      }
    
  } catch (err) {
    console.log(err)
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    conn.release();
  }
});

// Update when delete Request
router.put("/request/delete/:id", async function (req, res, next) {
  // const ex_id = req.body.ex_id;
  const another = req.body.another;
  console.log("Another id = "+another)

  console.log("Owner id = "+req.params.id)
  const conn = await pool.getConnection()
  await conn.beginTransaction();

  try {
    const [rows1, fields1] = await conn.query(
      'select * from users where id=?', [req.params.id]
  )

  console.log(rows1[0].role)
  console.log(another)
  console.log(req.params.id)

  if(rows1[0].role == 'trainer'){

    let results4 = await conn.query(
      "UPDATE trainer SET amount_t=amount_t+1 WHERE u_id=?",
      [req.params.id]
    )

    let results3 = await conn.query(
      "UPDATE users SET status=0 WHERE id=?",
      [another]
    )
  }
  else if(rows1[0].role == 'user'){
    console.log("User")
    let results2 = await conn.query(
      "UPDATE users SET status=0 WHERE id=?",
      [req.params.id]
    )

    let results4 = await conn.query(
      "UPDATE trainer SET amount_t=amount_t+1 WHERE u_id=?",
      [another]
    )

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
