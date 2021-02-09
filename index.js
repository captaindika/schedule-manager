const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const app = express()

const user = require('./src/routes/user')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())
app.use('/user',user)

const port = process.env.PORT || 6969
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})