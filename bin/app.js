require('dotenv').config()

const express = require('express');

const app = express();

const morgan = require('morgan');

app.use(express.json());

app.use(express.urlencoded({extended:false}))

app.use(morgan('dev'));

const apiRouter = require('../routes/api')

app.use('/api', apiRouter)

module.exports = app