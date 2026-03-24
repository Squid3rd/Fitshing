require('dotenv').config();
const express = require('express')
const cors = require("cors")
const app = express()

app.use(express.static('static'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())

const indexRouter = require('./routes/index')
const productRouter = require('./routes/product')
const userRouter = require('./routes/user')
const trainerRouter = require('./routes/trainer')
const requestRouter = require('./routes/request')
const paymentRouter = require('./routes/payment')
const vdoRouter = require('./routes/vdo')

app.use(indexRouter.router)
app.use(productRouter.router)
app.use(userRouter.router)
app.use(trainerRouter.router)
app.use(requestRouter.router)
app.use(paymentRouter.router)
app.use(vdoRouter.router)


// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error'
  })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Start server at port ${PORT}.`)
})