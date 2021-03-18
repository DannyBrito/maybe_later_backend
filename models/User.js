const { DataTypes} = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('User', {
    id:{
        type: DataTypes.UUID
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