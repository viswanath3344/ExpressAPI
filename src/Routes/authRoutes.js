
const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model('User');
const JWT = require("jsonwebtoken");

const router = express.Router();

router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    try {
    const user = new User({ email, password });
    await user.save()
    const token = JWT.sign({id: user._id}, "MY_SECRET_KEY");
    res.send({
        message: "Registration Success", 
        token
    });

    }catch (err) {
      res.status(422).send({message: "Registration failed"})
    }
})

module.exports = router;