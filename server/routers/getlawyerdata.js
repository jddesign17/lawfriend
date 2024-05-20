const {Router} = require('express')
const router = Router()
const model = require('../model/lawyer')

router.post("/getlawyer",async(req,res)=>{
    const {gmail,password} = req.body
    try
    {
            const users = await model.findOne({gmail:gmail})
            console.log(users)

            if(!users)
            {
               return res.send({message:"User Not Found"})
            }

            else
            {
                
                if(password===users.password)
                {
                    return res.send({data:users,message:"succes"})
                }

                else
                {
                   return res.send({message:"wrong"})
                }

            }

    }catch(err)
    {
           return res.send(err)
    }
})

router.post('/getlawyerac' ,async(req,res)=>{
    const {userid} = req.body

    try
    {
        const response = await model.findOne({_id:userid})
        if(!response)
        {
            res.send("User Not Found")
        }

        res.send(response)
        console.log(response)
    }catch(err)
    {
        console.log(err)
    }
})


router.get("/lawyer/count",async(req,res)=>{
    try {
        const count = await model.countDocuments();
        res.send({ message: "success", count: count });
    } catch (err) {
        res.status(500).send({ message: "error", error: err });
    }
})
module.exports = router