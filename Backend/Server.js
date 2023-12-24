const express = require("express")
const app = express();
require("dotenv").config()
const AuthRoute = require("./Routes/Auth")
require("./Connection")
const cors = require("cors")
const cookie = require("cookie-parser")



//Middlewares

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials : true
    }))
app.use(cookie())

    
//Listening to server

const PORT = process.env.PORT
app.listen(PORT, ()=>{
    console.log(`Server is running at port ${PORT}`)
});

// Routes

app.use("/ChatApp", AuthRoute)



