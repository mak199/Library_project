const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const {User,validateUser} = require('../models/user');


router.get('/',async(req,res)=>{
    const user = await User.find()
        .select('-__v')
        .sort('name');
    res.status(200).send(user);
    
});

router.post('/',async(req,res)=>{
    const {error} = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    let user = new User({
        name:req.body.name,
        course:req.body.course,
        universityID:req.body.universityID
    });
    user = await user.save();
    res.send(user);
});

module.exports = router;