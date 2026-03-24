const express = require('express')
const pool = require("../config");
const { isLoggedIn } = require('../middlewares')

const router = express.Router();

// Get all trainers (supports pagination: ?page=1&limit=20)
router.get("/trainer", async function (req, res, next) {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 0;

    if (page > 0 && limit > 0) {
      const offset = (page - 1) * limit;
      const [[{ total }]] = await pool.query('SELECT COUNT(*) as total FROM trainer INNER JOIN users ON users.id = trainer.u_id WHERE status=1');
      const [rows] = await pool.query(
        'SELECT * FROM trainer RIGHT OUTER JOIN users ON (users.id = trainer.u_id) WHERE status=1 LIMIT ? OFFSET ?',
        [limit, offset]
      );
      return res.json({ data: rows, total, page, limit, totalPages: Math.ceil(total / limit) });
    }

    const [rows] = await pool.query(
      'SELECT * FROM trainer RIGHT OUTER JOIN users ON (users.id = trainer.u_id) WHERE status=1'
    );
    return res.json(rows);
  } catch (err) {
    next(err)
  }
});

// View trainer preview
router.get("/trainer/:id", async function (req, res, next) {
  try {
    const [trainers] = await pool.query(
      "SELECT * FROM trainer RIGHT OUTER JOIN users ON (users.id = trainer.u_id) WHERE status=1 AND t_id = ?;",
      [req.params.id]
    );
    res.json({
      trainer: trainers[0],
      error: null,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// View trainer edit preview
router.get("/trainer/edit/:id", async function (req, res, next) {
  try {
    const [trainers] = await pool.query(
      "SELECT * FROM trainer RIGHT OUTER JOIN users ON (users.id = trainer.u_id) WHERE status=1 AND u_id = ?;",
      [req.params.id]
    );
    res.json({
      trainer: trainers[0],
      error: null,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Register as Trainer
router.put("/trainer/:id", isLoggedIn, async function (req, res, next) {
  const { specialize, certificate, info, amount_t } = req.body;

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    await conn.query(
      "UPDATE trainer SET specialize=?, certificate=?, info=?, amount_t=? WHERE u_id = ?",
      [specialize, certificate, info, amount_t, req.params.id]
    );

    await conn.query(
      "UPDATE users SET status=1 WHERE id = ?",
      [req.params.id]
    );

    await conn.commit();
    res.json({ message: "success!" });
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    conn.release();
  }
});

// Update Trainer
router.put("/trainer/edit/:id", isLoggedIn, async function (req, res, next) {
  const { specialize, certificate, info, amount_t } = req.body;

  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    await conn.query(
      "UPDATE trainer SET specialize=?, certificate=?, info=?, amount_t=? WHERE u_id = ?",
      [specialize, certificate, info, amount_t, req.params.id]
    );

    await conn.commit();
    res.json({ message: "success!" });
  } catch (err) {
    await conn.rollback();
    return res.status(400).json(err);
  } finally {
    conn.release();
  }
});

// Deactivate Trainer
router.put("/request/deletetrainer/:id", isLoggedIn, async function (req, res, next) {
  const conn = await pool.getConnection()
  await conn.beginTransaction();

  try {
    const [rows1] = await conn.query(
      "SELECT * FROM request WHERE t_id = ?",
      [req.params.id]
    );

    if (rows1[0]) {
      throw new Error("Cannot delete trainer because you have active members");
    }

    await conn.query(
      "UPDATE trainer SET specialize=?, certificate=?, info=?, amount_t=? WHERE u_id = ?",
      ["", "", "", 0, req.params.id]
    );

    await conn.query(
      "UPDATE users SET status=0 WHERE id = ?",
      [req.params.id]
    );

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
