const {Router} = require('express')
const router = Router()
const model = require('../model/lawyer')

router.get("/getlawyers",async(req,res)=>{

    try{
        
        const alldata = await  model.find()
        res.send(alldata)
    }
    catch(err)
    {
        console.log(err)
    }
})


module.exports = router