const express = require('express');
const router = express.Router();
const {Return,validateReturns} = require('../models/return');
const {User} = require('../models/user');
const {Lending} = require('../models/lending');
const {Book} = require('../models/book');


router.get('/',async(req,res)=>{
    const returns = await Return.find()
        .select('.__v')
        .sort('book');
    res.status(200).send(returns);
})


router.post('/',async(req,res)=>{
    const {error} = validateReturns(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const user = await User.findById(req.body.userId);
    if(!user) return res.status(400).send('UserId does not exist');
    const book = await Book.findById(req.body.bookId);
    if(!book) return res.status(400).send('BookId does not exist');
    const lending = await Lending.findOne({
        'user._id': req.body.userId,
        'book._id': req.body.bookId,
    });
    if(!lending) return res.status(200).send('No lent book for user');
    if(lending.returnDate) return res.status(400).send('The book was returned');
    lending.returnDate = new Date();
    await lending.save();
    book.stock = book.stock + 1;
    await book.save();
    res.status(200).send(lending);
})

module.exports = router;