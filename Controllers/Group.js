const { Op } = require('sequelize');
const Group = require('../models/Group');
const User = require('../models/user');
const Membership = require('../models/membership');

exports.postAddGroup = async (req,res,next)=>{
    const phone = req.body.numbers;
    const group_name = req.body.name;
    // return console.log(phone)
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