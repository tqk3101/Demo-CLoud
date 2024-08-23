const express = require('express')
const router = express.Router()

var ToyModel = require('../models/ToyModel')
var CategoriesModel = require('../models/CategoriesModel')

//Get all books
//URL: http://localhost:PORT/book
router.get('/', async (req, res) => {
   let toys = await ToyModel.find({}).sort({ _id: -1 })
   res.render('toy/index', { toys })
})


//URL: http://localhost:PORT/book/add
//render form "add book" for user to input
router.get('/add', async (req, res) => {
   let categories = await CategoriesModel.find({})
   res.render('toy/add' , { categories })
})
//Get book by id
//URL: http://localhost:PORT/book/detail/{id}
router.get('/detail/:id', async (req, res) => {
   //get book id value from url
   let id = req.params.id
   //return book data based on id
   let toy = await ToyModel.findById(id)
   //render view with book data
   res.render('toy/detail', { toy })
})

//Delete book by id
//URL: http://localhost:PORT/book/delete/{id}
router.get('/delete/:id', async (req, res) => {
   //get book id value from url
   let id = req.params.id
   try {
      //delete book based on id in url
      await ToyModel.findByIdAndDelete(id)
      //show success message
      console.log('delete succeed !')
   } catch (err) {
      console.error(err)
      //res.send("Delete failed !")
   }
   //redirect to book list page
   res.redirect('/toy')
})

//URL: http://localhost:PORT/book/add
//render form "add book" for user to input
router.get('/add', (req, res) => {
   res.render('toy/add')
})

//get input data from "add book" form & save to DB
router.post('/add', async (req, res) => {
   try {
      //get input data
      let toy = req.body
      //save book to DB
      await ToyModel.create(toy)
      //show message to console
      console.log('Add toy succeed !')
   } catch (err) {
      console.error (err)
   }

   //redirect to book list page
   res.redirect('/toy')
})

//URL: http://localhost:PORT/book/edit/{id}
//render form "edit"
router.get('/edit/:id', async (req, res) => {
   let id = req.params.id
   let toy = await ToyModel.findById(id)
   res.render('toy/edit', { toy })
})

//process form "edit"
router.post('/edit/:id', async (req, res) => {
   let id = req.params.id
   let toy = req.body
   try {
      await ToyModel.findByIdAndUpdate(id, toy)
      console.log('Edit book succeed !')
   } catch (err) {
      console.log("Edit book failed !")
      console.error(err)
   }
   res.redirect('/toy')
})

module.exports = router