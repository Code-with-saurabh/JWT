const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utilities/Config");

const authMiddleware = (req,res,next)=>{
    const authHeader = req.headers.authorization;
    // const authHeader = req.get('Authorization'); ->We you can also do


    if(!authHeader || !authHeader.startsWith("Bearer ")){
          return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    const token = authHeader.split(" ")[1];

    try{
        const decoded = jwt.verify(token,JWT_SECRET)
        req.user = decoded;
        console.log(decoded)
        next()
    }catch(error){
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
}

module.exports = authMiddleware;