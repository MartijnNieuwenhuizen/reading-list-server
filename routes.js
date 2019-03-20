const Router = require('express').Router

const db = require('./lib/db/db')()

const addArticleController = require('./area/add-article/AddArticleController')(
  db
)
const getArticlesController = require('./area/get-articles/get-articles-controller')(
  db
)
const developmentController = require('./area/development/development-controller')

/**
 * @param {Object} app
 */
function register(app) {
  const router = Router()

  // Dev routes
  router.use('/put-mock-in-db', developmentController)

  // Production used routes
  router.get('/get-all-articles', getArticlesController.indexAction)
  router.post('/add-article', addArticleController.postAction)

  app.use(router)
}

module.exports = { register }
