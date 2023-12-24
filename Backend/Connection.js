const mongoose = require("mongoose")

mongoose.connect("mongodb+srv://psaruna748:aooCVR01SSsdwdOp@cluster0.hzs68mc.mongodb.net/My_Chat").then(res => {
    console.log("Connected to database")
}).catch(err => {
    console.log(err)
})