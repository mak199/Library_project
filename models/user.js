const mongoose = require('mongoose');
const joi = require('joi');
const jwt = require("jsonwebtoken");
const config = require('config');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign(
      {
        _id: this._id,
        name: this.name,
        password: this.password,
        isAdmin: this.isAdmin
      },
      config.get("jwtPrivateKey")
    );
    return token;
  };
  

const User = mongoose.model('User',userSchema);

const validateUser = function(user){
    const schema = {
        name:joi.string().required().min(3).max(255),
        password:joi.string().required().min(6).max(255)
    }
    return joi.validate(user,schema);
}

exports.User = User;
exports.validateUser = validateUser;