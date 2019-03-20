const mongoose = require('mongoose')
const env = process.env

const articles = require('./data/articles')
const articleSchema = require('./schemas/article-schema')

class Db {
  constructor() {
    this.ArticleDB = null

    this._connect()
    this._initializeArticle()
  }

  _connect() {
    const mongoDbUri = `mongodb://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_URL}`
    mongoose.connect(mongoDbUri)
  }

  _initializeArticle() {
    const schema = new mongoose.Schema(articleSchema)
    this.ArticleDB = mongoose.model('Articles', schema)
  }
}

module.exports = Db
