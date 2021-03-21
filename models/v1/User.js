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
        unique: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User;