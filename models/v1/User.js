const { DataTypes} = require('sequelize');

const sequelize = require('../../util/database');

const User = sequelize.define('User', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    username:{
        type: DataTypes.STRING,
        allowNull:false,
        unique: {
            msg:'Username is already taken'
        },
        validate:{
            notNull:{
                msg:'Please enter an username'
            },
            notEmpty:{
                msg:'Username can\'t be empty'
            },
        }
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull:{
                msg:'Please enter your first name'
            },
            notEmpty:{
                msg:'First name required!'
            },
        }

    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull:{
                msg:'Please enter your last name'
            },
            notEmpty:{
                msg:'Last name required!'
            },
        }
    }
});


User.deleteAll = function(){
    return this.destroy({force:true, where:{},truncate:true})
}

module.exports = User;