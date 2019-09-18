const mongoose = require('mongoose');


const lenderSchema = mongoose.Schema({
    book:new Schema({

    }),
    lender:new Schema({

    })

    

});

const Lendings = mongoose.model('Lending',lenderSchema);