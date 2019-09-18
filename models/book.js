const mongoose = require('mongoose');
const joi = require('joi');


const bookSchema = mongoose.Schema({
    author:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    genre:{
        type:String,
        required:true
    },
    location:{
        type:String
    },
    publishedIn:{
        type:String
    },
    publishDate:{
        type:Date
    },
    stock:{
        type:Number
    }

});
function validateBooks(book){
    const schema = {
        author:joi.string().min(3).required(),
        title:joi.string().min(3).required(),
        genre:joi.string().min(3).required(),
        location:joi.string().min(3),
        publishedIn:joi.string().min(3),
        publishedDate:joi.date(),
        stocks:joi.number().min(1)
    }
    return joi.validate(book,schema);
}
const Books = mongoose.model('Book',bookSchema);

exports.Book = Books;
exports.validateBooks = validateBooks;