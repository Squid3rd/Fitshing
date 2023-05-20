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

app.use(indexRouter.router)
app.use(productRouter.router)
app.use(userRouter.router)
app.use(trainerRouter.router)
app.use(requestRouter.router)
app.use(paymentRouter.router)


app.listen(3000, () => {
  console.log('Start server at port 3000.')
})