const model = require("../model/user")
const {Router} = require('express')
const router = Router()

router.post("/getuser",async(req,res)=>{

    const {token} = req.body
    console.log(token)
    try{
        const getdata = await model.findById(token)
        console.log(getdata)
        res.send(getdata)
    }
    catch(err)
    {
        console.log(err)
    }
   
})


module.exports = router