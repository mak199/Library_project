const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {Book,validateBooks} = require('../models/book');

router.get('/',async(req,res)=>{
    res.send("In Books");
});
router.post('/',async(req,res)=>{
    const {error} = validateBooks(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let book = new Book({
        author: req.body.author,
        title: req.body.title,
        genre: req.body.genre
      });
      book = await book.save();
      res.status(200).send(book);
});

module.exports = router;