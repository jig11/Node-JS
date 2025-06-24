require('dotenv').config();
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authenticateToken = require('../middleware/authenticateTokenMiddleware');
// const pinologger = require('../middleware/pinoMiddleware');
const User = require("../schemas/userSchema");

function generateRefreshToken(user_id) {
    const refresh_token = jwt.sign(
      { sub: user_id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_TIME }
    );

    // redis_client.get(user_id.toString(), (err, data) => {
    //   if (err) throw err;
    //   redis_client.set(
    //     user_id.toString(),
    //     JSON.stringify({ token: refresh_token })
    //   );
    // });
    return refresh_token;
  }

module.exports.GetAccessToken = (req,res)=>{
const user_id =req.userData.sub;
const access_token = jwt.sign({sub:user_id},process.env.JWT_ACCESS_SECRET,{expiresIn:process.env.JWT_ACCESS_TIME})
const refresh_token = generateRefreshToken(user_id);
return res.status(200).json({status:true,message:"Success..",data:{access_token,refresh_token}});
}

router.post("/signup", async (req, res) => {
  // Create a new user
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  let newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword
    });
    newUser.save().then((result) => {
        res.status(201).send(result);
    }).catch((err) => {
        // pinologger.error(err);
        res.status(500).send({ error: 'Failed to SignUp User.' });
    });
});

router.post("/login", async (req, res) => {
  // login
    try {
          const {email, password} = req.body;
          const user = await User.findOne({email : email});
          const result = await bcrypt.compare(password, user.password)
          
          if (!user || !result) {
            return res.status(404).send({ error: 'Invalid Credentials.' });
          }

          const token = jwt.sign({user}, process.env.JWT_SECRET, {expiresIn:'1h'})
          //const access_token = jwt.sign({ sub: username },process.env.JWT_ACCESS_SECRET,{ expiresIn: process.env.JWT_ACCESS_TIME }
          //const refresh_token = generateRefreshToken(username);
          // token:{
          //     access_token:access_token,
          //     refresh_token:refresh_token
          // }
          res.json({token});
          } 
          catch (err) 
          {
                //pinologger.error('Error fetching users:', err);
                res.status(500).send({ error: 'Failed to fetch users.' });
          }
});

// router.post('/login',Login);
// router.post('/refreshToken',auth_middleware.verifyRefreshToken,GetAccessToken);


router.post("/logout",authenticateToken, async (req, res) => {
  // logout
    res.send("user logout");
});

router.get("/profile",authenticateToken,(req,res)=>{
    res.json({"message":`Hello ${req.user["user"][0].email}`})
})

// router.get('/',(req,res)=>{
//     res.send("users page!");
// });

// router.get('/:id',(req,res)=>{
//     res.send(`users page with id ${req.params.id} !`);
// });
// router.put("/:id", (req, res) => {
//   // Update user information
//   const userId = req.params.id;
//   res.send(`User ID ${userId} updated`);
// });

// router.delete("/:id", (req, res) => {
//   // Delete a user
//   const userId = req.params.id;
//   res.send(`User ID ${userId} deleted`);
// });

module.exports = router;