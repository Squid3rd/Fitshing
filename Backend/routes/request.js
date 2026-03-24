const express = require("express");
const pool = require("../config");
const { isLoggedIn } = require('../middlewares')

const router = express.Router();

// Add Request
router.post("/request/:id", isLoggedIn, async (req, res, next) => {
  const { requestinfo, u_id } = req.body;
  let count = req.body.count;

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    await conn.query(
      "INSERT INTO request(request_info, status_r, u_id, t_id) VALUES(?, false, ?, ?);",
      [requestinfo, u_id, req.params.id]
    );

    await conn.query(
      "UPDATE users SET status=2 WHERE id=?",
      [u_id]
    );

    await conn.query(
      "UPDATE trainer SET amount_t=? WHERE u_id=?",
      [--count, req.params.id]
    );

    await conn.commit();
    res.status(201).json({ message: "Request created" });
  } catch (error) {
    await conn.rollback();
    res.status(400).json({ message: error.toString() });
  } finally {
    conn.release();
  }
});

// Trainer Get Requests
router.get("/request/:id", async function (req, res, next) {
  try {
    const [requests] = await pool.query(
      "SELECT * FROM request LEFT OUTER JOIN users ON (request.u_id = users.id) WHERE t_id=?",
      [req.params.id]
    );
    res.json({
      request: requests,
      error: null,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// User Get Trainer Requests
router.get("/request/gotit/:id", async function (req, res, next) {
  try {
    const [userreqs] = await pool.query(
      "SELECT * FROM request LEFT OUTER JOIN users ON (request.t_id = users.id) WHERE u_id=?",
      [req.params.id]
    );
    res.json({
      userreq: userreqs,
      error: null,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Accept Request By Trainer
router.put("/request/accept/:id", isLoggedIn, async function (req, res, next) {
  const t_id = req.body.t_id;

  const conn = await pool.getConnection()
  await conn.beginTransaction();

  try {
    await conn.query(
      "UPDATE users SET status=3 WHERE id=?",
      [t_id]
    )

    await conn.query(
      "UPDATE request SET status_r=1 WHERE u_id=?",
      [t_id]
    )

    await conn.commit()
    res.json({ message: "success!" });
  } catch (err) {
    await conn.rollback();
    next(err);
  } finally {
    conn.release();
  }
});

// Reject Request by Trainer
router.delete("/request/delete/trainer/:id", isLoggedIn, async function (req, res, next) {
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    const [rows2] = await conn.query(
      "DELETE FROM request WHERE u_id = ?",
      [req.params.id]
    );
    if (rows2.affectedRows === 1) {
      await conn.commit();
      res.status(204).send();
    } else {
      throw new Error("Cannot delete the Request");
    }
  } catch (err) {
    await conn.rollback();
    return res.status(500).json({ message: err.toString() });
  } finally {
    conn.release();
  }
});

// Reject Request by User
router.delete("/request/delete/user/:id", isLoggedIn, async function (req, res, next) {
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    const [rows2] = await conn.query(
      "DELETE FROM request WHERE u_id = ?",
      [req.params.id]
    );
    if (rows2.affectedRows === 1) {
      await conn.commit();
      res.status(204).send();
    } else {
      throw new Error("Cannot delete the Request");
    }
  } catch (err) {
    await conn.rollback();
    return res.status(500).json({ message: err.toString() });
  } finally {
    conn.release();
  }
});

// Update when delete Request (role-based)
router.put("/request/delete/:id", isLoggedIn, async function (req, res, next) {
  const another = req.body.another;

  const conn = await pool.getConnection()
  await conn.beginTransaction();

  try {
    const [rows1] = await conn.query(
      'SELECT * FROM users WHERE id=?', [req.params.id]
    )

    if (rows1[0].role == 'trainer') {
      await conn.query(
        "UPDATE trainer SET amount_t=amount_t+1 WHERE u_id=?",
        [req.params.id]
      )
      await conn.query(
        "UPDATE users SET status=0 WHERE id=?",
        [another]
      )
    } else if (rows1[0].role == 'user') {
      await conn.query(
        "UPDATE users SET status=0 WHERE id=?",
        [req.params.id]
      )
      await conn.query(
        "UPDATE trainer SET amount_t=amount_t+1 WHERE u_id=?",
        [another]
      )
    }

    await conn.commit()
    res.json({ message: "success!" });
  } catch (err) {
    await conn.rollback();
    next(err);
  } finally {
    conn.release();
  }
});

exports.router = router;
