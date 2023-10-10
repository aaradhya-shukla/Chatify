const {Sequelize} = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER_NAME,process.env.DB_PASSWORD,{
    'dialect':'mysql',
    'host':process.env.HOST
})

module.exports = sequelize;