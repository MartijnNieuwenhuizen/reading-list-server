'use strict'
const mongoose = require('mongoose')
const createSchemas = require('./schemas')
const createModels = require('./models')

const env = process.env

let _db = null

class DB {
  constructor() {
    this._connect()
    this._register()
  }

  /**
   * @private
   * connect to the DB
   */
  _connect() {
    const dbUri = `mongodb://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_URL}`
    mongoose.connect(dbUri)
  }

  /**
   * @private
   * Create all schemas && models
   */
  _register() {
    this._schemas = createSchemas(mongoose)
    this._models = createModels(mongoose, this._schemas)
  }

  /**
   * @public
   * @returns {Object}
   */
  getModels() {
    return this._models
  }
}

module.exports = () => {
  // Use singleton pattern to only have one instance of the DB connection
  if (!_db) {
    _db = new DB()
  }

  return _db
}
