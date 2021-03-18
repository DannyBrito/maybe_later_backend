require('dotenv').config()

const express = require('express');

const app = express();

const apiRouter = require('../controllers/api')

const morgan = require('morgan');

app.use(morgan('dev'));

app.use('/api', apiRouter)

const db = require('../util/database');

db.sync()
    .then(() =>  {
        console.log('Connection has been established successfully.');
        return app.listen(process.env.PORT);
    })
    .then(() =>console.log(`server listen on: ${process.env.PORT}`))
    .catch(error => console.error('Unable to connect to the database:',error))

app.use(express.urlencoded({extended:false}));
