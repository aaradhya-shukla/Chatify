const User = require('../models/user');
const bcrypt = require('bcrypt');
exports.postSignup= async (req,res,next)=>{
    let name = req.body.name;
    let email = req.body.email;
    let phone = req.body.phone;
    let password = req.body.password;
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
            password:JSON.stringify(encrypted_password),
        })
        res.status(200).json({msg:'account successfully created'})
    }
    catch(err){
        console.log(err);
    }
}