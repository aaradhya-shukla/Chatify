const { type } = require('os');
const sequelize = require('../util/database');
const { Sequelize } = require('sequelize');
const { setEngine } = require('crypto');

const User = sequelize.define('user',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        unique:true,
        primaryKey:true
    },
    name:Sequelize.STRING,
    email:Sequelize.STRING,
    phone:Sequelize.STRING,
    password:Sequelize.STRING,
    online:{
       type: Sequelize.BOOLEAN,
       defaultValue:false
    }
})

module.exports = User;