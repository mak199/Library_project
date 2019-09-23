const express = require('express');
const router = express.Router();
const {validateLending,Lending} = require('../models/lending');
const {Student} = require('../models/student');
const {Book} = require('../models/book');


router.post('/',async(req,res)=>{
    const {error} = validateLending(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const students = await Student.findById(req.body.studentId);
    if(!students) return res.status(400).send("Student does not exist");
    const book = await Book.findById(req.body.bookId);
    if(!book) return res.status(400).send("Book does not exist");
    let lending = new Lending({
        student:{
            _id: students._id,
            name:students.name
        },
        book:{
            _id: book._id,
            title:book.title
        }
    });
    lending = await lending.save();
    book.stock = book.stock - 1;
    await book.save();
    res.status(200).send(lending);

})

module.exports = router;