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
    next();
  });
}

module.exports = authenticateToken; 