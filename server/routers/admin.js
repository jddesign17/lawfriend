const {Router} = require('express')
const router = Router()
const model = require("../model/admin")

router.post("/admin",async(req,res)=>{
    const {gmail,password} = req.body
    try
    {
        console.log(gmail)
        console.log(password)
        const users = await model.find({gmail:gmail})
        if(users)
        {
            const realpassword = await(password,users.password)
            if(realpassword)
            {
               return res.send({message:"succes"})
            }
            else
            {
                return res.send({message:"Wrong"})
            }
        }
       
    }catch(err)
    {
            res.send(err)
    }
})

module.exports = router