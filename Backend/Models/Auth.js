const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({


    username: {
        type: String,
        required: [true, "Please Enter username"]
    },


    email: {
        type: String,
        required: [true, "Please Enter Email address"]

    },

    phone: {
        type: Number,
        required: [true, "Please Enter Phone number"]

    },

    password: {
        type: String,
        required: [true, "Please Enter Phone number"]

    }
})


module.exports = mongoose.model("user", UserSchema)