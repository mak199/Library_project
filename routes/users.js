const express = require('express');
const router = express.Router();
const {User,validateUser} = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const passport = require('passport');
const Joi = require('joi');


router.get('/login',(req,res)=>{
    res.render("login");
});

router.get('/register',(req,res)=>{
    res.render("register");
});

router.post('/register',async(req,res)=>{
    let user;
    let errors = [];
    const {error} = validateUser(req.body);
    const {email,password} = req.body;
    if(error) errors.push({msg:error.details[0].message});//return res.status(400).send(error.details[0].message);
    

    user = await User.findOne({ email: email });
    if (user) errors.push({msg:'Email already registered'});//return res.status(400).send("Email already registered.");
  
    if(errors.length>0){
        res.render('register',{
            errors,
            email,
            password        
        });
    }
    else{
        user = new User({
            email:req.body.email,
            name:req.body.name,
            password:req.body.password
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        const token = user.generateAuthToken();
        req.flash('success_msg','You are now registered');
        res.redirect("/users/register");
    }
   
});

router.post('/login',async(req,res,next)=>{
    let errors = [];
    const { error } = validate(req.body); 
    if (error) errors.push({msg:error.details[0].message});//return res.status(400).send(error.details[0].message);
    
    const {email,password} = req.body;

    let user = await User.findOne({ email:email});
    if (!user) errors.push({msg:'Incorrect email or password'});//return res.status(400).send('Invalid email or password.');
  
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) errors.push({msg:'Incorrect email or password'});//return res.status(400).send('Invalid email or password.');
    
    if(errors.length>0){
        res.render('login',{
            errors,
            email,
            password
        });
    }
    else{
        const token = user.generateAuthToken();
        //res.send(token);
        req.flash('success_msg','You are now logged out');
        res.redirect('/users/login');
    }

   
});

function validate(req) {
    const schema = {
      email: Joi.string().email({ minDomainAtoms: 2 }).min(5).max(255).required(),
      password: Joi.string().min(5).max(255).required()
    };
  
    return Joi.validate(req, schema);
  }

router.get('/logout',(req,res)=>{
    req.logOut();
    //req.flash('success_msg','You are now logged out');
    res.redirect('/users/login');
})
module.exports = router;