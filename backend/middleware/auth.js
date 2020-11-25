const jwt = require('jsonwebtoken');
const User = require('../models/users.model');

const auth = async(req,res,next) =>{
    // Get token from header
    const token = req.header('x-auth-token');
    // Check if not token
    if (!token) {
       var  response = {
            statuscode: 400,
            data: {},
            error: [],
            message: 'No token found'
          }
          return res.json(response);
        
    }
    
    try {
        const decoded = jwt.verify(token, process.env.SECRET);
        console.log(decoded)
        let user = await User.findOne({_id:decoded._id});
        //console.log(user);
        if (!user) {
            throw new Error()
        }
        req.user = user;
        
        next();    
    
    } catch (error) {
        res.status(401).send({ error: 'Not Authorized to access this resource'})
    }

}

module.exports = auth

