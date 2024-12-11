const express = require("express");
const requireAuth = require("../middlewares/requireAuth");
const mongoose = require("mongoose");

const Track = mongoose.model("Track");

const router = express.Router();
router.use(requireAuth);

router.get("/", async (req, res) => {
    const userId = req.user._id;
    
    if (!userId) {
        const message = "Invalid user ID";
        return res.status(422).send({ message })
    }

    const tracks = await Track.find({ userId });
    return res.send({ tracks })
});

router.post("/add", async (req, res) => {
    const { name, locations } = req.body;

    if (!name || !locations) {
        return res.status(422).send({ message: "Name and Locations should required" });
    }

    const userId = req.user._id;
    const track = new Track({name, locations, userId});
    await track.save();

    return res.send({ track })
})

module.exports = router;

