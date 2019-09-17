const express = require('express');
const app = express();
const users = require('./routes/users');

app.use('/users',users);

const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);
