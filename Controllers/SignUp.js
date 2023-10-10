const User = require('../models/user');
const bcrypt = require('bcryptjs');
exports.postSignup= async (req,res,next)=>{
    let {name,email,phone,password} = req.body
    try{
        const user = await User.findOne({
            where:{
                email:email
            }
        })
        if (user){
            return res.status(500).json({msg:'user already exists'})
        }
        const encrypted_password = await bcrypt.hash(password,10);
        const newUser = await User.create({
            name:name, 
            email:email,
            phone:phone,
            password:encrypted_password,
        })
        res.status(200).json({msg:'account successfully created'})
    }
    catch(err){
        console.log(err);
    }
}

exports.postLogin=async (req,res,next)=>{
    let {email,password} = req.body
    console.log("heloo:",email)
    try{
        const user = await User.findOne({
            where:{
                email:email
            }
        })
        if (user){
            console.log(typeof user.password ,typeof password)
            const hash_result = await bcrypt.compare(password,user.password)
            console.log('got hash',hash_result)
            if (hash_result){
                return res.status(200).json({msg:'user successfully logged in'});
            }
        }
        else{
            res.status(500).json({msg:'user does not exists'});
        }
    }
    catch(err){
        console.log(err)
    }
}