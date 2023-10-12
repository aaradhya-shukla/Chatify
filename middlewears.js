const jwt = require('jsonwebtoken');

exports.authenticateToken=(req,res,next)=>{
    const authHeaders = req.headers.authenticate;
    console.log("headers>>>",req.headers)
    const id = jwt.verify(authHeaders,process.env.JWT_SECRET_KEY);
    req.body.id=id
    next();
}