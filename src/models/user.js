const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const user = new mongoose.Schema({
    email : {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    }
})

user.pre("save", function(next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }  

    bcrypt.genSalt(10, (err, salt)=> {
        if(err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, (err, hashPassword) => {
            if(err) {
                return next(err);
            }
    
            user.password = hashPassword;
            next();
        });
    })

})

user.methods.comparePassword = function(candidatePassword) {
    const user = this

    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, user.password, (err, isMatched) => {
            if(err) {
                return reject(err);
            }

            if(!isMatched) {
                return reject(false);
            }

            resolve(true);
        })
    })
}

mongoose.model("User", user);
