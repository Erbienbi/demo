require('dotenv').config()
const router = require('./routes/index.js')
const errorHandler = require('./middlewares/errorHandler.js')
const cors = require('cors')
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(router)
app.use(errorHandler)

app.listen(PORT, console.log(`Server live at port ${PORT}!`))

// module.exports = app