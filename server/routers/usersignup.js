const {Router} = require("express")
const router = Router()
const model = require("../model/user")
const { route } = require("./createlawyer")
router.post('/user',async(req,res)=>{
    const {name,email,password} = req.body
    try
    {
        const users = await model.findOne({email:email})
        console.log(users)

        if(!users)
        {
            const alldata = await new model({
                name:name,
                email:email,
                password:password
    
            })
    
            await alldata.save()
            res.send({message:"succes",data:alldata})
            console.log(alldata)


        }

        else
        {
            
            res.send({message:"found",data:"Email is Already Found"})
        }
       
    }

    catch(err)
    {
        res.send(err)
    }
})


router.get('/user/count', async (req, res) => {
    try {
        const count = await model.countDocuments();
        res.send({ message: "success", count: count });
    } catch (err) {
        res.status(500).send({ message: "error", error: err });
    }
});


router.post("/userlogin",async(req,res)=>{
    const {email,password} = req.body
    console.log(email)
    console.log(password)
    try
    {
            const users = await model.findOne({email:email})
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

module.exports = router