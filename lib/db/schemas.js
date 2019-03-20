const articleSchema = mongoose =>
  new mongoose.Schema({
    title: String,
    href: String,
    authorName: String,
    readingTimeInMinutes: Number,
    tags: String,
    date: String,
    read: Boolean,
  })

const tagSchema = mongoose =>
  new mongoose.Schema({
    label: String,
    slug: String,
  })

module.exports = mongoose => ({
  articleSchema: articleSchema(mongoose),
  tagSchema: tagSchema(mongoose),
})
