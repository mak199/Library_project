const mongoose = require('mongoose');
const joi = require('joi');


const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    course:{
        type:String,
        required:true
    },
    universityID:{
        type:String,
        required:true
    }
});

function validateUser(user){
    const schema = {
        name:joi.string().min(3).required(),
        course:joi.string().min(3).required(),
        universityID:joi.string().min(6).required()
    }
    return joi.validate(user,schema);
}

const User = mongoose.model('User',userSchema);

exports.User = User;
exports.validateUser = validateUser;