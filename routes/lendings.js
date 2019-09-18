const express = require('express');
const router = express.Router();
const {validateLending,Lending} = require('../models/lending');
const {User} = require('../models/user');
const {Book} = require('../models/book');


router.post('/',async(req,res)=>{
    const {error} = validateLending(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const user = await User.findById(req.body.userId);
    if(!user) return res.status(400).send("User does not exist");
    const book = await Book.findById(req.body.bookId);
    if(!book) return res.status(400).send("Book does not exist");
    let lending = new Lending({
        user:{
            _id: user._id,
            name:user.name
        },
        book:{
            _id: book._id,
            title:book.title
        }
    });
    lending = await lending.save();
    res.status(200).send(lending);

})

module.exports = router;