const e = require("express")

module.exports = (err, req, res,next) =>{
    let errors = err
    if(err.errors){
        errors = errorHandler(err)
    }
    else{
        errors = err.message
    }
    return res.status(400).json(errors)
}

const errorHandler = ({errors,name}, errorType = name) =>{
    const errorResult = {
        errorType,
        errors: errors.map(({message,path}) =>({message,path}))
    }
    return errorResult
}