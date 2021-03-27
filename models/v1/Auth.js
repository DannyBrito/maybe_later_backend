const sequelize = require('../../util/database');

const jwt = require('jsonwebtoken')

const Auth = sequelize.define('Auth');

Auth.createToken = async function(id){
    const token = await jwt.sign({userId:id}, process.env.JWT_KEY)
    return token
}

Auth.verifyToken = async function(token){
    token = await jwt.verify(token,process.env.JWT_KEY)
    return token
}
module.exports = Auth;