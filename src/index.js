const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./Routes/authRoutes");

const app = express();
app.use(authRoute);

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

app.get("/",(req, res) => {
    return res.send("Hi There !!!")
})

app.listen(3000, () => {
    console.log("Listening on Port: 3000");
})