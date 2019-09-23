const express = require('express');
const router = express.Router();
const {User,validateUser} = require('../models/user');
const bcrypt = require('bcrypt');
const _ = require('lodash');


router.get('/',(req,res)=>{
    res.status(200).send("Hello World");
});

router.post('/',async(req,res)=>{
    const {error} = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    

    let user = await User.findOne({ name: req.body.name });
    if (user) return res.status(400).send("User already registered.");
  
    user = new User({
        name:req.body.name,
        password:req.body.password
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    const token = user.generateAuthToken();
    res
        .header("x-auth-token", token)
        .send(_.pick(user, ["_id", "name"]));
});

module.exports = router;