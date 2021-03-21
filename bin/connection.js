const db = require('../util/database');

module.exports = () => db.sync({force:true})
