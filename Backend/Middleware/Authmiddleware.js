const jwt = require("jsonwebtoken")


const protectMidddleware = (req, res, next) =>{
    const token = req.cookies;
c
    if (token){
const verifToken = jwt.verify(token, "ABCD");

res.send(verifToken)
next()
    }

    else {
        res.send({"msg":"Not authentication"})
    }
}