const db = require('./db')()
const models = db.getModels()
const { Article, Tag } = models

const getAllArticles = async () => await Article.find({}).exec()

const getSpecificArticle = async article =>
  await Article.find({
    title: article.title,
    href: article.href,
    authorName: article.authorName,
  }).exec()

const getTagFromDBWithId = async tagId => await Tag.find({ _id: tagId }).exec()

const getTagFromDBWithLabel = async label => await Tag.find({ label }).exec()

module.exports = {
  getAllArticles,
  getSpecificArticle,

  getTagFromDBWithId,
  getTagFromDBWithLabel,
}
