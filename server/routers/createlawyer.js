const {Router} = require('express')
const router = Router()
const uploads = require('../middleware/multer')
const model = require('../model/lawyer')
router.post("/createlawyer",uploads.single("image"),async(req,res)=>{

    const {name,district,phonenumber,desc,gmail,password,category} = req.body
    const image = req.file.filename

    try{
        const alldata = await new model({
            name:name,
            gmail:gmail,
            image:image,
            password:password,
            category:category,
            district:district,
            phonenumber:phonenumber,
            desc:desc
    
        })
    
        await alldata.save()

        res.send(alldata)
    }

    catch(err)
    {
        console.log(err)
    }


})


module.exports = router