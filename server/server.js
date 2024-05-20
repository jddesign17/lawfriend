const express = require('express')
const app = express()
const mongoose = require('mongoose')
const createlawyer = require('./routers/createlawyer')
const userrouter = require('./routers/usersignup')
const userprofile = require('./routers/getuserdata')
const getlawyer = require('./routers/getlawyerdata')
const getlawyers=require('./routers/getlawyers')
const Editlawyer = require("./routers/editlawyer")
const lawyerdetails = require("./routers/lawyerdetails")
const admin = require("./routers/admin")
const deleteproduct = require("./routers/delete")
const messagerouter = require("./routers/message")
const cors = require('cors')

require('dotenv').config()
const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("mongoDb Connected")
}).catch((err)=>{
    console.log(err)
})

app.use(express.json())
app.use(cors())
app.use(express.static("public"))





app.use(createlawyer)
app.use(messagerouter)
app.use(userrouter)
app.use(userprofile)
app.use(getlawyer)
app.use(getlawyers)
app.use(lawyerdetails)
app.use(admin)
app.use(Editlawyer)
app.use(deleteproduct)
app.listen(PORT,()=>console.log("Server is Running"))