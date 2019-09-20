const express = require('express');
const router = express.Router();
const {Return,validateReturns} = require('../models/return');

router.get('/',async(req,res)=>{
    const returns = await Return.find()
        .select('.__v')
        .sort('book');
    res.status(200).send(returns);
})


router.post('/',(req,res)=>{
    const {error} = validateReturns(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    res.status(200).send("Hello World");
})

module.exports = router;