const mongoose = require("mongoose")
const express = require("express");
const JWT = require("jsonwebtoken");
const User = mongoose.model("User");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(404).send({message: "Incorrect Authorization"})
    }

    const token = authorization.replace("Bearer ", "");
    
    JWT.verify(token, "MY_SECRET_KEY", async (err, payload) => {
       if(err){
        return res.status(404).send({message: "Incorrect user authentication"});
       }

       const { id } = payload;
       const user = await User.findById(id);

       req.user = user;

       next();
    });


};
