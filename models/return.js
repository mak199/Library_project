const mongoose = require('mongoose');
const joi = require('joi');
joi.objectId = require('joi-objectid')(joi);

const returnSchema = mongoose.Schema({
    book:{
        type:new mongoose.Schema({
            name:{
                type:String,
                required:true
            }
        }),
        required:true
    },
    user:{
        type:new mongoose.Schema({
            name:{
                type:String,
                required:true
            }
        }),
        required:true
    },

});

const validateReturns = function(returns){
    const schema ={
        bookId:joi.objectId().required(),
        userId:joi.objectId().required()
    }
    return joi.validate(returns,schema);
}

const Return = mongoose.model('Return',returnSchema);

exports.Return = Return;
exports.validateReturns = validateReturns;