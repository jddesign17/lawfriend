const {Router} = require('express')
const router = Router()
const model = require('../model/lawyer')
router.get("/civildetails",async(req,res)=>{
    try
    {
        const data = await model.find({category:'Civil Lawyer'})
        console.log(data)
        res.send(data)
    }

    catch(err)
    {
            res.send(err)
    }
})

router.get("/criminaldetails",async(req,res)=>{
    try
    {
        const data = await model.find({category:'Criminal Lawyer'})
        console.log(data)
        res.send(data)
    }

    catch(err)
    {
            res.send(err)
    }
})

router.get("/corporatedetails",async(req,res)=>{
    try
    {
        const data = await model.find({category:'Corporate Lawyer'})
        console.log(data)
        res.send(data)
    }

    catch(err)
    {
            res.send(err)
    }
})

router.get("/familydetails",async(req,res)=>{
    try
    {
        const data = await model.find({category:'Family Lawyer'})
        console.log(data)
        res.send(data)
    }

    catch(err)
    {
            res.send(err)
    }
})


router.get("/realestatedetails",async(req,res)=>{
    try
    {
        const data = await model.find({category:'Real Estate Lawyer'})
        console.log(data)
        res.send(data)
    }

    catch(err)
    {
            res.send(err)
    }
})


module.exports = router