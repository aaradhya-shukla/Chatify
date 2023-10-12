const { where, Op } = require('sequelize');
const User = require('../models/user');
const { use } = require('../routes/SignUp');
const Chat = require('../models/chats');
exports.getChats= async(req,res,next)=>{
    const id= req.body.id;
    console.log(id)
    try{
        const users = await User.findAll({where:{
            online : true
        }});
        const user = await User.findByPk(id);
        console.log(user)
        const messages = await Chat.findAll();
        console.log(messages);
        res.status(200).json({users:users,messages:messages})
    }
    catch(err){
        console.log(err)
    }
}
exports.postSendmsg = async(req,res,next)=>{
    try{
        const id = req.body.id;
        const message = req.body.message;
        const user = await User.findByPk(id);
        const result = await user.createChat({
            message:message,
            name:user.name
        })
        res.status(200).json({msg:'message succesffuly sent',message:result})
    }
    catch(err){
        console.log(err);
    }
}

exports.getUsers=async(req,res,next)=>{
     try{
        const result = await User.findAll({
            where:{
                online:true
            }
        })
        res.status(200).json({users:result});
     }
     catch(err){
        console.log(err)
     }
}

exports.getNewMessages= async (req,res,next)=>{
    const id = req.query.messageId;
    console.log(id)
    try{
        const result = await Chat.findAll({
            where:{
                id:{[Op.gt]:id}
            }
        })
        res.status(200).json({messages:result});
    }
    catch(err){
        console.log(err);
    }
}