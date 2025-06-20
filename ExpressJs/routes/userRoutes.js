require('dotenv').config();
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const authenticateToken = require('../middleware/authenticateTokenMiddleware');
//const pinologger = require('../middleware/pinoMiddleware');
const User = require("../schemas/courseSchema");

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
        //pinologger.error(err);
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
          res.json({token});
          } 
          catch (err) 
          {
                //pinologger.error('Error fetching users:', err);
                res.status(500).send({ error: 'Failed to fetch users.' });
          }
});

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