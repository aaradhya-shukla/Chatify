const jwt = require('jsonwebtoken');
const User = require('./models/user');


exports.authenticateToken= async(req,res,next)=>{
    const authHeaders = req.headers.authenticate;
    console.log("headers>>>",req.headers,req.url)
    const id = jwt.verify(authHeaders,process.env.JWT_SECRET_KEY);
    req.body.id=id
    const user = await User.findByPk(id);
    req.body.user=user;
    next();
}

