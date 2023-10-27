const { Sequelize } = require('sequelize');
const sequelize = require('../util/database');


const Archive = sequelize.define('archive',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        unique:true,
        primaryKey:true
    },
    message:Sequelize.STRING ,
    name:Sequelize.STRING
})

module.exports=Archive;