const mongoose = require('mongoose');
const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);

const lenderSchema = mongoose.Schema({

    student: { 
        type: new mongoose.Schema({
          name:{
              type:String,
              required:true
          }
        }),
        required:true
    },
    book:{
        type: new mongoose.Schema({
            title:{
                type:String,
                required:true
            }
        })
    },
    lendingDate:{
        type:Date,
        default:Date.now,
        required:true
    },
    returnDate:{
        type:Date
    }
    

});

function validateLending(lending){
    const schema = {
        studentId:joi.objectId().required(),
        bookId:joi.objectId().required()
    }
    return joi.validate(lending,schema);
}

const Lending = mongoose.model('Lending',lenderSchema);

exports.validateLending = validateLending;
exports.Lending = Lending;