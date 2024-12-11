
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
        const token = JWT.sign({ id: user._id }, "MY_SECRET_KEY");
        res.send({
            message: "Registration Success",
            token
        });

    } catch (err) {
        res.status(422).send({ message: "Registration failed" });
    }
});


router.post("/signin", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).send({ message: "Must provide email and password" });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(422).send({ message: "Invalid username" });
    }

    try {
        const isMatched = await user.comparePassword(password);

        console.log("isMatched", isMatched);
        if (!isMatched) {
            return res.status(422).send({ message: "Invalid credentials" });
        }

        const token = JWT.sign({ id: user._id }, "MY_SECRET_KEY");

       return res.status(200).send({ message: "Login success", token });

    } catch (err) {
        return res.status(422).send({ message: "Invalid Credentials" });
    }

});

module.exports = router;