const { Sequelize } = require('sequelize');
const sequelize = require('../util/database');


const Chats = sequelize.define('chats',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        unique:true,
        primaryKey:true
    },
    message:Sequelize.STRING ,
    name:Sequelize.STRING
})

module.exports=Chats;