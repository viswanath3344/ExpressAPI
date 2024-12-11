const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

require("./models/user");
require("./models/track");

// Order should be down to the mongoose model loading. 
const authRoute = require("./routes/authRoutes");
const requireAuth = require("../src/middlewares/requireAuth");
const trackRoute = require("./routes/trackRoutes");

const app = express();
app.use(bodyParser.json());

app.use(authRoute);
app.use("/track", trackRoute);

const uri = "mongodb+srv://viswanath3344:Password@tracker.wxot5.mongodb.net/?retryWrites=true&w=majority&appName=Tracker"

 mongoose.connect(uri, {
    autoIndex: true
 });

mongoose.connection.on("connected", () => {
    console.log("Mongo DB connected")
})

mongoose.connection.on("error", (err)=> {
    console.error("Connection failed with ", err);
})

app.get("/", requireAuth ,(req, res) => {
    return res.send("Hi There !!!, I am " + req.user.email)
})

app.listen(3000, () => {
    console.log("Listening on Port: 3000");
})