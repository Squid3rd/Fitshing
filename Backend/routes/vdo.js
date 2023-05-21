const express = require("express");
const pool = require("../config");
const multer = require("multer");
const path = require("path");
const Joi = require("joi");
const fs = require("fs");
const { timeStamp } = require("console");

router = express.Router();

// Upload Image
const storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./static/uploads/vdo");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage, limits: { fileSize: 1000000 } });

// show all vdo
router.get("/vdo", async function (req, res, next) {
    try {
      const [rows, fields] = await pool.query('SELECT * FROM vdo_clip')
      return res.json(rows)
    } catch (err) {
      console.log(err);
      next(err)
    }
  });

//  get some vdo
router.get("/vdo/:id", async function (req, res, next) {
    const promise1 = pool.query("SELECT * FROM vdo_clip WHERE id=?", [
        req.params.id,
      ]);
    
      Promise.all([promise1])
        .then((results) => {
          const [vdos, vdoFields] = results[0];
          res.json({
            vdo: vdos[0],
            error: null,
          });
        })
        .catch((err) => {
          return res.status(500).json(err);
        });
  });

  const addvdoSchema = Joi.object({
    info: Joi.string().required().min(25).max(240),
    link_vdo: Joi.string().required().uri({ scheme: ['https'], allowQuerySquareBrackets: true }),
    clip_name: Joi.string().required().min(5).max(240),
})

// add vdo
router.post("/vdo", upload.single('images'), async function (req, res, next) {

    try {
      await addvdoSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
      console.log(err)
      return res.status(400).json(err.message)
  
    }
  
      const images = req.file.path.substr(6);
    
      const info = req.body.info;
      const link_vdo = req.body.link_vdo;
      const clip_name = req.body.clip_name;
  
      const conn = await pool.getConnection();
      await conn.beginTransaction();
    
      try {
        let results = await conn.query(
          "INSERT INTO vdo_clip(info, link_vdo, clip_name, image1, date) " +
          "VALUES(?, ?, ?, ?, CURRENT_TIMESTAMP);",
          [info, link_vdo, clip_name, images]
        );

          await conn.commit()
          res.status(201).send()
      } catch (err) {
          console.log(err)
          await conn.rollback();
          res.status(400).json(err.toString());
      } finally {
          conn.release()
      }
    });

    const updateSchema = Joi.object({
        info: Joi.string().required().min(25).max(150),
        link_vdo: Joi.string().required().uri({ scheme: ['https'], allowQuerySquareBrackets: true }),
        clip_name: Joi.string().required().min(5).max(240),
    })

// update vdo
router.put("/vdo/edit/:id", async function (req, res, next) {
  
    try {
      await updateSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
      console.log(err)
      return res.status(400).json(err.message)
  
    }

    const info = req.body.info;
    const link_vdo = req.body.link_vdo;
    const clip_name = req.body.clip_name;
  
    const conn = await pool.getConnection()
    await conn.beginTransaction();
  
    try {
      let results = await conn.query(
        "UPDATE vdo_clip SET clip_name=?, info=?, link_vdo=? WHERE id=?",
        [clip_name, info, link_vdo, req.params.id]
      )
  
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

//   update Image vdo
router.put("/vdo/update/image/:id", upload.single('imagesC'), async function (req, res, next) {

    const imagesC = req.file.path.substr(6);

    const conn = await pool.getConnection()
    await conn.beginTransaction();
  
    try {
      // Get Path files from the upload folder
      const [
          images,
          imageFields,
      ] = await conn.query(
          "SELECT image1 FROM `vdo_clip` WHERE `id` = ?",
          [req.params.id]
      );

      // Update File from path
      const appDir = path.dirname(require.main.filename); // Get app root directory
    console.log(appDir)
    const p = path.join(appDir, 'static', images[0].image1);
    fs.unlinkSync(p);


    console.log
      // Delete Data from Table images
      const [rows1, fields1] = await conn.query(
          'update `vdo_clip` set image1 = ? WHERE `id`=?', [imagesC ,req.params.id]
      )

      // commit
      await conn.commit()
      res.json({ message: "Update image Complete" })
  } catch (error) {
      next(error)
      await conn.rollback();
      // res.status(500).json(error)
  } finally {
      conn.release();
  }
  });

// delete vdo
router.delete("/vdo/:id", async function (req, res, next) {

    const conn = await pool.getConnection();
    await conn.beginTransaction();
  
    try {
  
        console.log(req.params.id)
      // Delete images
      const [
        rows2,
        fields2,
      ] = await conn.query("DELETE FROM vdo_clip WHERE id = ?", [
        req.params.id,
      ]);

      await conn.commit();
    } catch (err) {
      console.log(err)
      await conn.rollback();
      return res.status(500).json(err);
    } finally {
      conn.release();
    }
  });

exports.router = router;
