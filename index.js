const express = require('express');
const app = express();
const users = require('./routes/users');
const books = require('./routes/books');
const lendings = require('./routes/lendings');
const returns = require('./routes/returns');
const mongoose = require('mongoose');



mongoose.connect('mongodb://localhost:/library', {useNewUrlParser: true,useUnifiedTopology: true})
  .then(()=>console.log("Connected to mongoDB..."));

app.use(express.json());
app.use('/users',users);
app.use('/books',books);
app.use('/lendings',lendings);
app.use('/returns',returns);


const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;