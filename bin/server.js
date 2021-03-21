const app = require('./app')

const dbConnection = require('./connection')

const server = dbConnection()
    .then(() =>  {
        console.log('DB - Connection has been established successfully.');
        return app.listen(process.env.PORT,() =>console.log(`server listen on: ${process.env.PORT}`));
    })
    .catch(error => console.error('Unable to connect to the database:',error))

module.exports = server