const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
const mongoose = require('mongoose')
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

mongoose.connect('your-mlab-mongodb-uri')

app.use('/', (req, res, next) => {
  // const url = decodeURIComponent(req.query.targetUrl)
  // fetch(url)
  //   .then(res => res.text())
  //   .then(helpers.getPageContent)
  //   .then(helpers.getWordCount)
  //   .then(amountOfWords => {
  //     res.send(
  //       JSON.stringify({
  //         amountOfWords,
  //         url
  //       })
  //     )
  //   })
  //   .catch(err => res.send(err))
})

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.send('error', JSON.stringify(err, null, 2))
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
