const express = require("express")
const app = express()
const Route = express.Router()
const {Register , Login} = require("../Controller/AuthController")
const user = require("../Models/Auth")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookie = require("cookie-parser")

app.use(cookie())

Route.post("/register",   async (req, res)=>{
    const {username, email, phone, password } = req.body

    if (!username || !email || !phone || !password) {
        return res.json({"msg":"All fields are mandatory"})
    }

    const checkUser = await user.findOne({email});

    if (checkUser) {
        return res.status(400).json({"msg" : "User Already Registered with this email address"})
    }

    else {

        const hashpssword = await bcrypt.hash(password,10)
        const createuser = await user.create({
            username,
            email,
            phone,
            password : hashpssword
        })

        if (createuser) {
            return res.json("User Registered successfully")
        }
        else{
            return res.status(400).json({"msg":"Failed to create an Account"})
        }
    }
})

Route.post("/login", async (req, res) =>{

const {email, password} = req.body

if(!email || !password) {
    return res.json({"msg":"All fields are mandatory"})
}

const checkUser = await user.findOne({email});

if (checkUser && await bcrypt.compare(password, checkUser.password)){
    const token = jwt.sign({
        userid : checkUser._id
    }, "ABCD")


  return   res.cookie("Token" , token).json({"msg":"User logged in uccessfully!"})
}
else {
    return res.status(400).json({"msg":"Invalid email address or password"})
}
})


Route.post("/username", async (req, res)=>{

    const token = req.cookies;
    const userToken = token.Token

    console.log(userToken)
const verifyToken =  jwt.verify(userToken, "ABCD")
const useerid= verifyToken.userid;

const checkusername = await user.findById(useerid);

res.send(checkusername.username)


})
module.exports = Route