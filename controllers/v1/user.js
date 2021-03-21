const User = require('../../models/v1/User')

exports.getUser = async (req,res,next) =>{
    
    try{
        const id = req.params.id
        const currentUser = await User.findByPk(id)
        if(currentUser){
            return res.status(302).json(currentUser)
        }
        else {
            return res.status(404).json('User Not Found')
        }
    }
    catch(error){
        console.log("ERROR: \n",error)
        return res.status(404).json("User Not Error Found")
    }

}

exports.indexUsers = async (req,res,next) =>{
    try{
        const users = await User.findAll();
        return res.status(302).json(users)
    }
    catch(error){
        console.log("Error", error)
        return res.status(404).json("Not Users")
    }
}

exports.createUser = async (req, res, next) =>{
const firstName = req.body.firstName
    const lastName = req.body.lastName
    const username = req.body.username
    let user = {
        firstName,lastName,username
    }
    try{
        user = await User.create(user)
        return res.status(302).json(user)
    }
    catch(error){
        console.log(error)
        return res.status(400).json('could not create')
    }
}