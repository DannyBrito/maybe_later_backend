module.exports = (params,permit) =>{
    const resultParams = {}
    permit.forEach(key => {
        if(params[key]){
            resultParams[key] = params[key]
        }
    });
    return resultParams
}