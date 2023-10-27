var cron = require('node-cron');

const { Model, Op } = require('sequelize');
const Chat = require('./models/chats');
const sequelize = require('./util/database');
const {Sequelize} = require('sequelize');
const Archive = require('./models/archive');
let c=1
console.log(sequelize.now)
cron.schedule('* 0 * * *',getTime)
async function getTime(){
    console.log(c)
    c+=1
    try{
        const current = await sequelize.query("SELECT CURRENT_TIMESTAMP();", { 
            type:Sequelize.QueryTypes.SELECT
        })
        const currTime = current[0]['CURRENT_TIMESTAMP()']
        const time = await Chat.findAll({
            where:{
                createdAt:{
                    [Op.lt]:currTime
                }
            },
            // attributes:['message']
        })
        console.log('time>>>',time);
        for(let i of time){
            const arc = await Archive.create({
                message:i.dataValues.message,
                name:i.dataValues.name
            })
        } 
        const res = await Chat.destroy({
            where:{
                createdAt:{
                    [Op.lt]:currTime
                }
            }
        })

    }
    catch(err){
        console.log(err)
    }
}

// module.exports = getTime;