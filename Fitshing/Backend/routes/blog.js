const express = require("express");
const path = require("path")
const pool = require("../config");
router = express.Router();


// Require multer for file upload
const multer = require('multer')
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './static/uploads')
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })



router.post("/blogs/search", async function (req, res, next) {
  // Your code here
});

router.post("/blogs/addlike/:blogId", async function (req, res, next) {
  // Your code here
  try{
    const [rows, fields] = await pool.query("SELECT * FROM blogs WHERE id=?", [
      req.params.blogId,
    ]);
    //ข้อมูล blog ที่เลือกจะอยู่ในตัวแปร rows
    console.log('Selected blogs =', rows)
    //สร้างตัวแปรมาเก็บจำนวน like ณ ปัจจุบันของ blog ที่ select มา
    let likeNum = rows[0].like
    console.log('Like num =', likeNum+=1) // console.log() จำนวน Like ออกมาดู
    //เพิ่มจำนวน like ไปอีก 1 ครั้ง

    //Update จำนวน Like กลับเข้าไปใน DB
    const [rows2, fields2] = await pool.query("UPDATE blogs SET blogs.like=? WHERE blogs.id=?", [
      likeNum, req.params.blogId,
    ]);
    res.send("message")
  } catch (err) {
    return next(err);
  }
});

router.post('/blogs', upload.single('blog_image'), async function (req, res, next) {
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  const title = req.body.title;
  const content = req.body.content;
  const status = req.body.status;
  const pinned = req.body.pinned ? 1 : 0;
  const conn = await pool.getConnection()
  // Begin transaction
  await conn.beginTransaction();

  try {
    let results = await conn.query(
      "INSERT INTO blogs(title, content, status, pinned, `like`,create_date) VALUES(?, ?, ?, ?, 0,CURRENT_TIMESTAMP);",
      [title, content, status, pinned]
    )
    const blogId = results[0].insertId;

    await conn.query(
      "INSERT INTO images(blog_id, file_path, main) VALUES(?, ?, ?);",
      [blogId, file.path.substr(6), 1])

    await conn.commit()
    res.redirect("/")
  } catch (err) {
    await conn.rollback();
    next(err);
  } finally {
    console.log('finally')
    conn.release();
  }
});


exports.router = router;
