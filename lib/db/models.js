module.exports = (mongoose, schemas) => {
  const { articleSchema, tagSchema } = schemas

  return {
    Article: mongoose.model('Articles', articleSchema),
    Tag: mongoose.model('Tags', tagSchema),
  }
}
