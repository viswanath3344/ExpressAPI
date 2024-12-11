const express = require("express");
const mongoose = require("mongoose");
const User = mongoose.model('User');

const router = express.Router();

router.post("/signup", async (req, res) => {
    const { email, password } = req.body;
    try {
    const user = new User({ email, password });
    await user.save()
    res.status(200).send({message: "Registration Success"})
    }catch (err) {
      res.status(422).send({message: "Registration failed"})
    }
})

module.exports = router;