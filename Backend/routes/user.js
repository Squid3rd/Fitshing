const express = require("express")
const pool = require("../config")
const Joi = require('joi')
const bcrypt = require('bcrypt');
const multer = require("multer");
const path = require("path");
const { generateToken } = require("../utils/token");
const { isLoggedIn } = require('../middlewares')
const fs = require("fs");
router = express.Router();

// SET STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "./static/uploads/user");
    },
    filename: function (req, file, callback) {
      callback(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  });
  const upload = multer({ storage: storage });

  // Joi Lidate
const passwordValidator = (value, helpers) => {
    if (value.length < 8) {
        throw new Joi.ValidationError('Password must contain at least 8 characters')
    }
    if (!(value.match(/[a-z]/) && value.match(/[A-Z]/) && value.match(/[0-9]/))) {
        throw new Joi.ValidationError('Password must be harder')
    }
    return value
}

const usernameValidator = async (value, helpers) => {
    const [rows, _] = await pool.query("SELECT username FROM users WHERE username = ?", [value])
    if (rows.length > 0) {
        const message = 'This username is already taken'
        throw new Joi.ValidationError(message, { message })
    }
    return value
}

const signupSchema = Joi.object({
    email: Joi.string().required().email(),
    phone: Joi.string().required().pattern(/0[0-9]{9}/),
    fname: Joi.string().required().max(150),
    lname: Joi.string().required().max(150),
    password: Joi.string().required().custom(passwordValidator),
    con_password: Joi.string().required().valid(Joi.ref('password')),
    username: Joi.string().required().min(5).max(20).external(usernameValidator),
    gender: Joi.string().required(),
    role: Joi.string().required(),
    age: Joi.number().required(),
    weight: Joi.number().required(),
    height: Joi.number().required(),
})

router.post('/register', upload.single('images'), async (req, res, next) => {
    try {
        await signupSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
      console.log(err)
        return res.status(400).send(err)
    }

    const images = req.file.path.substr(6);

    // if (!file) {
    //     return res.status(400).json({ message: "Please upload a file" });
    //   }

    const conn = await pool.getConnection()
    await conn.beginTransaction()

    const email = req.body.email
    const fname = req.body.fname
    const lname = req.body.lname
    const username = req.body.username
    const password = await bcrypt.hash(req.body.password, 5)
    const con_password = req.body.con_password
    const phone = req.body.phone
    const gender = req.body.gender
    const role = req.body.role
    const age = req.body.age
    const weight = req.body.weight
    const height = req.body.height

    console.log(role)
    
    try {
        let results = await conn.query(
            'INSERT INTO users(username, password, fname, lname, email, phone, gender, image, status, role, age, weight, height) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?, ?)',
            [username, password, fname, lname, email, phone, gender, images, role, age, weight, height]
        )

        const userId = results[0].insertId;

        if(role == 'trainer'){
            await conn.query(
                'INSERT INTO trainer(certificate, specialize, info, amount_t, u_id) VALUES ("-", "-", "-", 0, ?)',
                [userId]
            )
        }

        conn.commit()
        res.status(201).send()
        res.json({ message: "Register Complete" })
    } catch (err) {
        conn.rollback()
        // res.status(400).json(err.toString());
    } finally {
        conn.release()
    }
});

const loginSchema = Joi.object({
         username: Joi.string().required(),
         password: Joi.string().required()
 })

 router.post('/login', async (req, res, next) => {
         try {
             await loginSchema.validateAsync(req.body, { abortEarly: false })
     } catch (err) {
             return res.status(400).send(err)
     }
     const username = req.body.username
     const password = req.body.password

     const conn = await pool.getConnection()
     await conn.beginTransaction()

     try {
             // Check if username is correct
             const [users] = await conn.query(
                 'SELECT * FROM users WHERE username=?', 
                 [username]
             )
             const user = users[0]
             if (!user) {    
                 throw new Error('Incorrect username or password')
         }

             // Check if password is correct
             if (!(await bcrypt.compare(password, user.password))) {
                 throw new Error('Incorrect username or password')
         }

             // Check if token already existed
             const [tokens] = await conn.query(
                 'SELECT * FROM tokens WHERE u_id=?', 
                 [user.id]
             )
             let token = tokens[0]?.token
             if (!token) {
                 // Generate and save token into database
                 token = generateToken()
                 await conn.query(
                     'INSERT INTO tokens(u_id, token) VALUES (?, ?)', 
                     [user.id, token]
                 )
         }

             conn.commit()
             res.status(200).json({'token': token})
     } catch (error) {
             conn.rollback()
             res.status(400).json(error.toString())
     } finally {
             conn.release()
     }
 });

 router.get('/user/me', isLoggedIn, async (req, res, next) => {
     // req.user ถูก save ข้อมูล user จาก database ใน middleware function "isLoggedIn"
     res.json(req.user)
 })

// Get User Profile
router.get("/user/:id", function (req, res, next) {

    const promise1 = pool.query("SELECT * FROM users WHERE id=?", [
        req.params.id,
      ]);

      console.log(promise1)
    
      Promise.all([promise1])
        .then((results) => {
          const [userinfos, userinfoFields] = results[0];
          res.json({
            userinfo: userinfos[0],
            error: null,
          });
          console.log(userinfos[0])
        })
        .catch((err) => {
          console.log(req.params.id)
          return res.status(500).json(err);
        });
  });

// Update Profile
router.put("/profile/edit/:id", async function (req, res, next) {
  
  const email = req.body.email
  const fname = req.body.fname
  const lname = req.body.lname
  const username = req.body.username
  const phone = req.body.phone
  const gender = req.body.gender
  const age = req.body.age
  const weight = req.body.weight
  const height = req.body.height
  // const ex_id = req.body.ex_id;

  console.log(req.params.ex_name)
  console.log(req.params.id)
  const conn = await pool.getConnection()
  await conn.beginTransaction();

  try {
    let results = await conn.query(
      "UPDATE users SET username=?, fname=?, lname=?, email=?, phone=?, gender=?, weight=?, height=?, age=?  WHERE id=?",
      [username, fname, lname, email, phone, gender, weight, height, age, req.params.id]
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

// Update Password
router.put("/profile/edit/password/:id", async function (req, res, next) {
  
  const password = await bcrypt.hash(req.body.password, 5)

  const conn = await pool.getConnection()
  await conn.beginTransaction();

  try {
    let results = await conn.query(
      "UPDATE users SET password=? WHERE id=?",
      [password, req.params.id]
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

// Update Proile Image
router.put("/profile/edit/image/:id", upload.single('imagesC'), async function (req, res, next) {

  const imagesC = req.file.path.substr(6);

  const conn = await pool.getConnection()
  await conn.beginTransaction();

  try {
    // Get Path files from the upload folder
    const [
        images,
        imageFields,
    ] = await conn.query(
        "SELECT image FROM users WHERE id = ?",
        [req.params.id]
    );

    // Update File from path
    const appDir = path.dirname(require.main.filename); // Get app root directory
    console.log(appDir)
    const p = path.join(appDir, 'static', images[0].image);
    fs.unlinkSync(p);

    console.log("ddd")
  console.log
    // Delete Data from Table images
    const [rows1, fields1] = await conn.query(
        'update users set image = ? WHERE id=?', [imagesC ,req.params.id]
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



exports.router = router