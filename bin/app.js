require('dotenv').config()

const express = require('express');

const app = express();

const errorHandler = require('../middleware/errorHandler');

const morgan = require('morgan');

app.use(express.json());

app.use(express.urlencoded({extended:false}))

app.use(morgan('dev'));

const apiRouter = require('../routes/api')

app.use('/api', apiRouter)

app.use(errorHandler)

module.exports = app