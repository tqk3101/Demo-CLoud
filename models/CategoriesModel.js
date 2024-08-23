const mongoose = require('mongoose')
const CategoriesSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: true
      }
   }
)
const CategoriesModel = mongoose.model('categories', CategoriesSchema)
module.exports = CategoriesModel