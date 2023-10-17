const { Op } = require('sequelize');
const Group = require('../models/Group');
const User = require('../models/user');
const Membership = require('../models/membership');

exports.postAddGroup = async (req,res,next)=>{
    const admin = req.body.user; 
    const phone = req.body.numbers;
    const group_name = req.body.name;
    try{
        const user = await User.findAll({
            where:{
                phone:{
                    [Op.or]:phone
                }
            }
        })
        const group = await Group.create({
            name:group_name
        })
        admin.addGroup(group,{through:{Admin: true}});
        for(let i of user){
            console.log('>>>>>here at member>>>')
          await i.addGroup(group);
        }
        res.status(200).json({msg:'group created'})
    }
    catch(err){
        console.log(err);
    }
}

exports.getGroups= async(req,res,next)=>{
    const id = req.body.id;
    try{
        console.log("getting groupss")
        const user = await User.findByPk(id);
        const groups = await user.getGroups({
            through:Membership
        })
        res.status(200).json({groups:groups});
    }
    catch(err){
        console.log(err);
    }
}

exports.getNewGroups = async(req,res,next)=>{
    const id = req.body.id;
    try{
        console.log("getting groupss")
        const user = await User.findByPk(id);
        const groups = await user.getGroups({
            through:Membership
        })
        res.status(200).json({groups:groups});
    }
    catch(err){
        console.log(err);
    }
}

exports.getAddNewUser=async (req,res,next)=>{
    const phone = req.query.phone;
    const group_name = req.query.group;
    try{
        const group =await Group.findOne({where:{name:group_name}});
        const user = await group.getUsers({
            where:{
                phone:phone,
            }
        },
        {
            through:Membership
        })
        console.log(user)
        if(user.length>0){
            return res.status(200).json({msg:'user already in group'})
        }
        else{
           const user = await User.findOne({where:{phone:phone}});
           await user.addGroup(group);
           return res.status(200).json({msg:'user added'});
        }
    }
    catch(err){
        console.log(err)
    }
}

exports.getDeleteUser= async (req,res,next)=>{
    const phone = req.query.phone;
    const group_name = req.query.group;
    try{
        const user = await User.findOne({where:{phone:phone}});
        const group = await Group.findOne({where:{name:group_name}});
        Membership.destroy({
            where:{
                userId: user.id,
                GroupId: group.id
            }
        })
        res.status(200).json({msg:'successfully removed from group'})
    }
    catch(err){
        console.log(err)
    }
}

exports.getChangeAdmin = async (req,res,next)=>{
    const phone = req.query.phone;
    const group_name = req.query.group;
    const id=req.body.id;
    try{
        const group = await Group.findOne({where:{name:group_name}});
        const curr_admin = await Membership.findOne({
            where:{
                userId: id,
                GroupId: group.id
            }
        })
        console.log("curret admin:",curr_admin);
        curr_admin.Admin = false;
        await curr_admin.save();
        const new_admin = await User.findOne({
            where:{
                phone:phone
            }
        })
        console.log("new admin:",new_admin);
        const update_admin = await Membership.findOne({
            where:{
                userId: new_admin.id,
                GroupId: group.id
            }
        })
        console.log('upd',update_admin);
        update_admin.Admin = true;
        await update_admin.save();
        console.log('updated admin:',update_admin)
        res.status(200).json({msg:'admin changed'});
    }
    catch(err){
        console.log(err)
    }
}

exports.getCheckForAdmin= async(req,res,next)=>{
    console.log('XXX')
    const id = req.body.id;
    const group_name = req.query.group;
    console.log("I am here at check admin")
    try{
        const group = await Group.findOne({where:{name:group_name}});
        const result = await Membership.findOne({
            where:{
                userId: id,
                GroupId: group.id

            }
        })
        console.log('checking for admin',result)
        res.status(200).json({admin:result.Admin});
    }
    catch(err){
        console.log(err);
    }
}