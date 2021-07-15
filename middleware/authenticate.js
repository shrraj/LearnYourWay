//used for checking login and cookies
const jwt = require('jsonwebtoken');
const User = require("../models/Users");

const authenticate = async (req, res, next)=>{
    try{
        const token = req.cookies.eLearning;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const validUser = await User.findOne({_id:verifyToken._id , "tokens.token":token});
        if(!validUser) { throw new Error('User not found') }
        req.token = token;
        req.validUser = validUser;
        next();
    }
    catch(err){ res.status(401).send("Unauthorized: No token provided"); }
}

module.exports = authenticate;