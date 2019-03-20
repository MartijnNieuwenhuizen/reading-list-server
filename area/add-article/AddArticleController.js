'use strict'

const dbQueries = require('../../lib/db/queries')
const { getTagFromDBWithLabel, getSpecificArticle } = dbQueries

const getTagIds = (article, Tag) => {
  const hasTag = tag => tag.length
  const hasNoTag = tag => !tag.length
  const saveNewTagToDb = async tag => await new Tag(tag).save()
  const getTagFromDB = tag => getTagFromDBWithLabel(tag.label)
  const getIds = tag => tag._id
  const getFirstItem = tag => tag[0]

  return new Promise(async (resolve, reject) => {
    const { tags } = article

    // Get the tags from the DB
    const tagsDBRequests = tags.map(getTagFromDB)
    const tagsDBResponse = await Promise.all(tagsDBRequests)

    // Get the ID's of the existing tag
    const existingTagsIds = tagsDBResponse
      .filter(hasTag)
      .map(getFirstItem)
      .map(getIds)

    // Store the new Tags in the DB
    const newTagRequests = tagsDBResponse
      .filter(hasNoTag)
      .map((tag, index) => article.tags[index])
      .map(saveNewTagToDb)

    //  Retrieve the ID"s from the new tags
    const newTagResponses = await Promise.all(newTagRequests)
    const newTagIds = newTagResponses.map(getIds)

    // Return the article with the tags ID's
    const allTagIds = [...newTagIds, ...existingTagsIds]
    resolve(allTagIds)
  })
}

class AddArticleController {
  constructor(db) {
    this._db = db

    const { Tag, Article } = db.getModels()
    this._Tag = Tag
    this._Article = Article

    this.postAction = this.postAction.bind(this)
  }

  /**
   * Post action handler
   * @param {Object} req
   * @param {Object} res
   * @param {Object} next
   */
  async postAction(req, res, next) {
    // Get and parse the article data
    const articleData = decodeURIComponent(req.query.articleData)
    const parsedArticle = JSON.parse(articleData)
    const articleFromDb = getSpecificArticle(parsedArticle)

    if (articleFromDb) return

    const allTagIds = await getTagIds(parsedArticle, this._Tag)

    const articleWithTagIds = {
      ...parsedArticle,
      tags: allTagIds,
    }

    await new this._Article(articleWithTagIds).save()
  }
}

module.exports = db => new AddArticleController(db)
