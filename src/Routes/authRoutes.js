const express = require("express");

const router = express.Router();

router.post("/signup", (req, res)=> {
    res.send("Called Registration API")
})

module.exports = router;