const db = require('../../lib/db/db')()

const addArticleController = require('./AddArticleController')(db)

describe('AddArticleController', () => {
  describe('postAction', () => {
    it('foo', () => {
      const fakeArticle = {
        title: 'What is the Future of Front End Web Development?',
        href:
          'https://css-tricks.com/future-front-end-web-development/?utm_campaign=Revue%20newsletter&utm_medium=Newsletter&utm_source=revue',
        authorName: 'Chris Coyier',
        readingTimeInMinutes: '5',
        tags: [
          { slug: '/theory', label: 'Theory' },
          { slug: '/js', label: 'JS' },
        ],
        date: 'Wed Jan 09 2019 09:11:12 GMT+0100 (CET)',
        read: false,
      }
      const formattedArticle = encodeURIComponent(JSON.stringify(fakeArticle))

      const req = {
        query: {
          articleData: formattedArticle,
        },
      }
      const res = {}
      const next = jest.fn()

      const actual = addArticleController.postAction(req, res, next)
    })
  })
})
