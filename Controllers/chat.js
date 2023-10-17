const { where, Op } = require('sequelize');
const User = require('../models/user');
const { use } = require('../routes/SignUp');
const Chat = require('../models/chats');
const Group = require('../models/Group');
const Membership = require('../models/membership');
exports.getChats= async(req,res,next)=>{
    const id= req.body.id;
    const group_name = req.query.group;
    console.log('grp',group_name)
    try{
        if(group_name){
            const group = await Group.findOne({
                where:{
                    name:group_name
                }
            })
            const messages =await group.getChats();
            res.status(200).json({messages:messages})
        }
        else{
            const messages = await Chat.findAll({
                where:{
                    GroupId:null
                }
            });
            console.log('i am message>>',messages);
            res.status(200).json({messages:messages})
        }
        console.log(messages);
    }
    catch(err){
        console.log(err)
    }
}
exports.postSendmsg = async(req,res,next)=>{
    try{
        const id = req.body.id;
        const group_name = req.query.group
        const message = req.body.message;
        const user = await User.findByPk(id);
        if(group_name){
            const group = await Group.findOne({where:{name:group_name}})
            const result = await user.createChat({
                message:message,
                name:user.name,
                GroupId:group.id
            })
            res.status(200).json({msg:'message succesffuly sent',message:result})
        }
        else{
            const result = await user.createChat({
                message:message,
                name:user.name,
            })
            res.status(200).json({msg:'message succesffuly sent',message:result})
        }
        
        
    }
    catch(err){
        console.log(err);
    }
}

exports.getUsers=async(req,res,next)=>{
    const group_name = req.query.group;
    // return console.log('yyy',group_name)
     try{
        if(group_name){
            const group = await Group.findOne({
                where:{
                    name:group_name
                }
            })
            const users = await group.getUsers({
                through:Membership
            })
            // const result = await  Membership.findAll({
            //     where:{
            //         GroupId:group.id
            //     }     
            // })
            // let arr=[]
            // for(i of result){
            //     arr.push(i.userId)
            // }
            // const users = await User.findAll({
            //     where:{
            //         id:{
            //             [Op.eq]:arr
            //         }
            //     }
            // })
            res.status(200).json({users:users});
        }
        else{
            const users = await User.findAll({
                where:{
                    online:true
                }
            })
            res.status(200).json({users:users});
        }
       
     }
     catch(err){
        console.log(err)
     }
}

exports.getNewMessages= async (req,res,next)=>{
    const id = req.query.messageId;
    const group_name = req.query.group;
    console.log(id)
    try{
        if(group_name){
            const group = await Group.findOne({
                where:{
                    name:group_name
                }
            })
            const result = await group.getChats({
                where:{
                    id:{[Op.gt]:id}
                }
            })
            console.log("messages->>> group",result)
            res.status(200).json({messages:result});
        }
        else{
            const result = await Chat.findAll({
                where:{
                    id:{[Op.gt]:id},
                    GroupId:null
                    
                }
            })
            console.log("messages->>> global",result)
            res.status(200).json({messages:result});
        }
        
        
    }
    catch(err){
        console.log(err);
    }
}

exports.getLogOff = async(req,res,next)=>{
    try{
        const id = req.body.id;
        const user = await User.findByPk(id);
        user.online=false;
        await user.save()
        res.status(200).json({msg:'logged off'});

    }
    catch(err){
        console.log(err)
    }
}

exports.getNewUsers=async (req,res,next)=>{
    const group_name  = req.query.group;
    const userId = req.body.userId;
    console.log('grop name is =',group_name);
    try{
        if(group_name){
            console.log("herree")
            const group = await Group.findOne({
                where:{
                    name:group_name
                }
            })
            console.log('group details',group)
            const users = await group.getUsers({
                through:Membership
            })
            // const result = await  Membership.findAll({
            //     where:{
            //         GroupId:group.id
            //     }     
            // })
            // let arr=[]
            // for(i of result){
            //     arr.push(i.userId)
            // }
            // const users = await User.findAll({
            //     where:{
            //         id:{
            //             [Op.eq]:arr
            //         }
            //     }
            // })
            console.log("users>>>>",users)
            res.status(200).json({users:users});
        }
        else{
            const users = await User.findAll({
                where:{
                    online:true,
                }
            })
            res.status(200).json({users:users});
        }
       
     }
     catch(err){
        console.log(err)
     }
    }