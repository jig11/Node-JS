const jwt = require('jsonwebtoken');
//const pinologger = require('./pinoMiddleware');

// Middleware to protect routes
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];
 
  if (!token)
  {
    //pinologger.warn("Invalid JWT.");
    return res.sendStatus(401);
  } 
 
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
     //pinologger.warn("Invalid JWT.",err);
     return res.sendStatus(403); 
    }
    req.user = user;
    //Verify BlackListed Access Token
    //    redis_client.get('BL_'+decoded.sub.toString(),(err,data)=>{
    //        if(err) throw err;
    //        if(data===token)  return res.status(403).json({status:false,message:"Blacklisted token"})
    //        next();
    //    })
    next();
  });
}

function verifyRefreshToken(req,res,next){
    const token = req.body.token;
    if(token===null) return res.status(401).json({status:false,message:"Token is null"})
    try {
       const decoded = jwt.verify(token,process.env.JWT_REFRESH_SECRET);
       console.log("Decoded value",decoded);
       req.userData = decoded;
       // If token is there in store or not

        // redis_client.get(decoded.sub.toString(),(err,data)=>{
        //     if(err) throw err;
        //     if(data==null) return res.status(401).json({status:false,message:"Token is not there in store"})
        //     if(JSON.parse(data).token != token) return res.status(401).json({status:false,message:"Token is not same in store"})
        //     next()
        // })
        next()
       
    } catch (error) {
        return res.status(401).json({status:false,message:"Your session is not valid"})
    }
}

module.exports = authenticateToken; 