const User = require('../../models/v1/User')
const params = require('../.././/util/strongParams')
const Auth = require('../../models/v1/Auth')

const permitParams = ['username','password']


exports.create = async (req,res,next) =>{
    const {username,password} = params(req.body,permitParams)
    let user = await User.scope('withPassword').findOne({where:{username}})
    let result = await user.authenticate(password)
    if(result){
        let token = await Auth.createToken(user.id)
        res.status(201).json({user,token})
    }
    else{
        res.status(401).json("Incorrect Username or Password")
    }
}

exports.autoLogin = (req,res,next) =>{

}