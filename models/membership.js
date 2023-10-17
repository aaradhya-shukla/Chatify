const { Sequelize } = require('sequelize');
const sequelize = require('../util/database');

const Membership = sequelize.define('Membership',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    }
})

module.exports = Membership;