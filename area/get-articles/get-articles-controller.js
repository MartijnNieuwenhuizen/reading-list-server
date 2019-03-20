const dbQueries = require('../../lib/db/queries')
const db = require('../../lib/db/db')()
const models = db.getModels()
const { Tag } = models

const fakeData = require('../../data/backup-articles')

const getFirstItem = tag => tag[0]
const formatTagsForResponse = ({ slug, label }) => ({
  slug,
  label,
})

const formatTags = async tags => {
  const response = tags.split(',').map(tag => Tag.find({ _id: tag }).exec())

  const tagsFromDb = await Promise.all(response)

  return tagsFromDb.map(getFirstItem).map(formatTagsForResponse)
}

const buildArticle = async article => {
  const tags = await formatTags(article.tags)
  article.tags = tags
  return article
}

class GetArticlesController {
  constructor(db) {
    this.db = db
  }

  async indexAction(req, res, next) {
    res.send(JSON.stringify(fakeData))
  }

  // async indexAction(req, res, next) {
  //   try {
  //     const articles = await dbQueries.getAllArticles()

  //     const foo = await articles.map(buildArticle)
  //     console.log('foo: ', foo)
  //     // const response = await Promise.all(requests)

  //     res.send(JSON.stringify(foo))
  //   } catch (err) {
  //     // @TODO: improve error handling with statusCode and errorMessage
  //     res.send('error')
  //   }
  // }
}

module.exports = db => new GetArticlesController(db)

// const dbQueries = require('../../lib/db/queries')
// const db = require('../../lib/db/db')()
// const models = db.getModels()
// const { Tag } = models

// class GetArticlesController {
//   constructor(db) {
//     this.db = db
//   }

//   async indexAction(req, res, next) {
//     try {
//       const articles = await dbQueries.getAllArticles()
//       console.log('articles: ', articles)

//       const articlesWithTags = articles.map(async article => {
//         const tagsFoo = article.tags.split(',').map(async tag => {
//           const tagFromDb = await Tag.find({ _id: tag }).exec()
//           return tagFromDb
//         })

//         const res = await Promise.all(tagsFoo)

//         const combined = {
//           ...article,
//           tags: res,
//         }
//         return combined
//       })

//       const response = await Promise.all(articlesWithTags)
//       console.log('response: ', response)
//       res.send(JSON.stringify(response))
//     } catch (err) {
//       res.send([])
//     }
//   }
// }

// module.exports = db => new GetArticlesController(db)
