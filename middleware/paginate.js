module.exports = model => { 
    return async (req, res, next) =>{
        const result = {}
        let limit = parseInt(req.query.limit) || 5
        limit = (limit < 5) ? 5 : limit
        limit = Math.min(limit, 25)
        let page = parseInt(req.query.page)
        let offset = (page - 1) * limit
        try{
            if( !offset || offset < 0){
                result.records = []
                result.totalRecords = await model.count()
                result.totalPages = Math.ceil(result.totalRecords/limit)
                result.next = {
                    page: 1,
                    limit
                }
                res.paginatedResults = result
                return next()        
            }
            const{count:totalRecords,rows:records} = await model.findAndCountAll({limit,offset})
            let totalPages = Math.ceil(totalRecords/limit)
            result.records = records
            result.totalRecords = totalRecords
            result.totalPages = totalPages
            result.currentPage = page
            if(page * limit < totalRecords){
                result.next = {
                    page: page + 1,
                    limit
                }
            }
            // if page Upper Outer Range Return Last Page
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