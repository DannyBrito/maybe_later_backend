module.exports = model => { 
    return async (req, res, next) =>{
        const result = {}
        let limit = handleLimit(req.query.limit)
        let page = handlePage(req.query.page)
        let offset = (page - 1) * limit
        try{
            if(offset < 0){
                limit = 0
                offset = 0     
            }
            const{count:totalRecords,rows:records} = await model.findAndCountAll({limit,offset})
            limit = limit || 5
            let totalPages = Math.ceil(totalRecords/limit)
            result.records = records
            result.totalRecords = totalRecords
            result.totalPages = totalPages
            result.currentPage = page
            if(page * limit < totalRecords){
                result.next = {
                    page: (page < 0) ? 1 : page + 1,
                    limit
                }
            }
            if(offset > 0){
                result.previous = {
                    page: (totalPages < page) ? totalPages : page - 1,
                    limit
                }
            }
            res.paginatedResults = result
            next()    
        }catch(error){
            next(error)
        }
    }
}

const handleLimit = (givenLimit = 5) =>{
    givenLimit = parseInt(givenLimit)
    if(!givenLimit || givenLimit < 5) givenLimit = 5
    givenLimit = Math.min(25,givenLimit)
    return givenLimit
}

const handlePage = (givenPage = 1) => {
    givenPage = parseInt(givenPage) 
    if(givenPage !== 0) givenPage = givenPage || 1
    return givenPage
}