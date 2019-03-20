const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

// const mongoose = require('mongoose')
// const mongoDbUri = `mongodb://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_URL}`
// mongoose.connect(mongoDbUri)
// const env = process.env
// const articles = require('./data/articles')

const routes = require('./routes')

const PORT = process.env.PORT || 5000

const app = express()

app.use((req, res, next) => {
  res.header('access-control-allow-origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Content-Length, Authorization, Accept, X-Requested-With'
  )
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')

  next()
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// RegisterRoutes
routes.register(app)

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
