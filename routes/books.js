const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Book,validateBooks} = require('../models/book');
const {ensureAuthenticated} = require('../config/auth');

router.get('/',async(req,res)=>{
    const book = await Book.find()
    .select("-__v")
    .sort("author");
  res.send(book);

});
router.get('/ucad',ensureAuthenticated,async(req,res)=>{
    res.render("ucadBooks",{});

});

router.post('/ucad',async(req,res)=>{
    const {error} = validateBooks(req.body);
    let errors = [];
    if(error) errors.push({msg:error.details[0].message});//return res.status(400).send(error.details[0].message);
    
    const {title,author,genre} = req.body;

    const book = await Book.findOne({title});
    if(book) errors.push({msg:'Book is already added'});

    if(errors.length>0){
      res.render('ucadBooks',{
        errors
      });
    
    }else{
      let book = new Book({
        author: author,
        title: title,
        genre: genre
      });
      book = await book.save();
      req.flash('success_msg','Your book has been added successfully!');
      res.redirect('/books/ucad');
      //res.status(200).send(book);
    }
  
});

module.exports = router;