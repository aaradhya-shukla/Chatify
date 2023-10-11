const jwt = require('jsonwebtoken');

exports.authenticateToken=(req,res,next)=>{
    const authHeaders = req.headers['authenticate'];
    

}