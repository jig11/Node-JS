const express = require('express');
const router = express.Router();
const User = require("../models/userModel");

router.post("/", async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required.' });
    }
    
    const newUser = new User({ name:name, email:email });
    // res.status(201).json(newUser);

    try {
      const newUser = await User.create({ name, email });
      res.status(201).json(newUser);
    } catch (err) {
      if (err.code === 11000) {
        res.status(409).json({ error: 'Email already exists.' });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }

    //  newUser.save().then((result) => {
    //         res.status(201).json(result); //res.send(result);
    //     }).catch((err) => {
    //         pinologger.error(err);
    //         res.status(500).send({ error: 'Failed to SignUp User.' });
    //     });
});
module.exports = router;