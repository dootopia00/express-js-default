const express = require('express');
const app = express();
const port = 3000;

const router = require('./routes/router')(app);
console.log(`App listening on port ${port}`)
