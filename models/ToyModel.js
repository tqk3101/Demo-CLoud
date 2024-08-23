const mongoose = require('mongoose')
const ToySchema = new mongoose.Schema(
   {
      title: {
         type: String,
         required: true,
         minLength: 5,
         maxLength: 50
      },
      genre: String,
      price: {
         type: Number,
         required: true,
         min: [1, 'Lowest price must be 1$'],
         max: 1000
      },
     
      cover: String,
      categorie: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'categories'    //name of referenced collection (table) 
      }
   },
   {
      versionKey: false
   
   }
)
const ToyModel = mongoose.model('toys', ToySchema)  //books: table name
module.exports = ToyModel