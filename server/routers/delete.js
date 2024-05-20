const {Router} = require('express')
const router = Router()
const model = require("../model/lawyer")

router.delete("/deleteproduct/:deleteid",async(req,res)=>{

        const {deleteid} = req.params
        try{
            const response = await model.findByIdAndDelete(deleteid)
            res.send(response)
        }
        catch(err)
        {
            console.log(err)
        }
})


module.exports = router