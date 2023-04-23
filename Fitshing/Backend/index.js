const express = require("express")
var cors = require('cors')
const path = require("path")


const app = express();
app.use(cors())
// Statics
app.use(express.static('static'))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// routers
const indexRouter = require('./routes/index')
const blogRouter = require('./routes/blog')
const commentRouter = require('./routes/comment')

app.use(indexRouter.router)
app.use(blogRouter.router)
app.use(commentRouter.router)

app.listen(3000, () => {
  console.log(`Example app listening at http://localhost:3000`)
})