'use strict'

const db = require('../../lib/db/db')()
const dbHelpers = require('../../lib/db/helpers')

const { Tag, Article } = db.getModels()
const { getTagFromDBWithLabel } = dbHelpers

const getTagIds = article => {
  const foo = article.tags.map(tag => {
    return new Promise(async (resolve, reject) => {
      // Helper functions
      const filterByMatchingLabel = res => res.label === tag.label
      const mapId = res => res._id

      const tagFromDB = await getTagFromDBWithLabel(tag.label)

      // 1. Add if the tag exists in the DB
      if (tagFromDB.length) {
        const bar = tagFromDB
          .filter(filterByMatchingLabel)
          .map(mapId)
          .join()
        return resolve(bar)
      }

      // 2. Create a new tag in the DB
      const newTag = new Tag(tag)
      await newTag.save()

      // 2.1 Get new added tag from the DB
      try {
        const tagFromDBAfterSet = await getTagFromDBWithLabel(tag.label)
        const bar = tagFromDBAfterSet
          .filter(dbRes => dbRes.label === tag.label)
          .map(mapId)
          .join()
        return resolve(bar)
      } catch (err) {
        return reject(err)
      }
    })
  })

  return Promise.all(foo).then(response => response)
}

const postAction = async (req, res, next) => {
  // Handle received data
  const articleData = decodeURIComponent(req.query.articleData)
  const parsedArticle = JSON.parse(articleData)

  try {
    // Format
    const tags = await getTagIds(parsedArticle)
    const correctArticle = {
      ...parsedArticle,
      tags,
    }

    // Create new article based on the model
    const articleInDb = new Article(correctArticle)

    // Put the article in the DB
    try {
      await articleInDb.save()
    } catch (err) {
      throw new Error(err)
    }

    res.status(200)
    res.send('success')
  } catch (err) {
    res.status(400)
    res.send('failed to post article')
  }
}

module.exports = {
  postAction,
}
