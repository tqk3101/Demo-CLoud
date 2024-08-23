var express = require('express');
var router = express.Router();
var ToyModel = require('../models/ToyModel')

router.get('/', (req, res) => {
   //1) render homepage
   res.render('index', { title: "TOYS STORE" })
   //2) redirect to Toy List page
   //res.redirect('/toy')
})

//Get all toys
//URL: http://localhost:PORT/toy
router.get('/view', async (req, res) => {
   let toys = await ToyModel.find({}).sort({ _id: -1 })
   res.render('view', { toys })
})


module.exports = router;
