module.exports = {
    connect: () => {
        const db =  require('../../util/database')
        db.options.logging = false
        return db.sync({force:true})
    },
    disconnect: db => db.close(),
    deleteUsers: db => db.models.User.deleteAll()

}