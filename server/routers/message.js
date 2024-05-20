const {Router} = require('express')
const model = require("../model/messagedata")
const panel = require("../model/chatpanel")
const userpanel = require("../model/panel")
const router = Router()

router.post("/message",async(req,res)=>{
    const {senderid,receiverid,message} = req.body
  
        try
        {

            const messagedata =  await new model({
                sender:senderid,
                receiver:receiverid,
                message:message,           
            })

            await messagedata.save()

            res.send(messagedata)
        }

        catch(er)
        {
            console.log(er)
        }
    

})


router.post("/getmessage", async(req, res) => {
    const { senderid, receiverid } = req.body;
    console.log(senderid)
    console.log(receiverid)
    try{
        const messagedata = await model.find({
            $or:[
                {sender:senderid,receiver:receiverid},
                {sender:receiverid,receiver:senderid}
            ]
        })  
        res.send(messagedata)
    
    }catch(err)
    {
            console.log(err)
    }   
  });



router.post("/unread",async(req,res)=>{
    const {lawyerid} = req.body

    try
    {
        const messagepanel = await panel.findOne({lawyerid}).populate('memebers')
        const data = []

        for(const member of messagepanel.memebers)
        {
            const unreadcount = await model.countDocuments({
                sender:member._id,
                isRead:false,
                receiver:lawyerid
            })

            data.push({memberid:member._id,count:unreadcount})
        }

        res.send(data)


    }
    catch(err)
    {
        res.send(err)
    }
})


router.post("/userunread",async(req,res)=>{
    const {userid} = req.body

    try
    {
        const messagepanel = await userpanel.findOne({userid}).populate('memebers')
        const data = []

        for(const member of messagepanel.memebers)
        {
            const unreadcount = await model.countDocuments({
                sender:member._id,
                isRead:false,
                receiver:userid
            })

            data.push({memberid:member._id,count:unreadcount})
        }

        res.send(data)


    }
    catch(err)
    {
        res.send(err)
    }
})
  



router.put("/read",async(req,res)=>{

    const {senderid} = req.body
    try
    {
        
        const sender = await model.updateMany(
            {sender:senderid},
            {isRead:true}
        )

        res.send(sender)
        

    }catch(err)
    {
        console.log(err)
    }
})

 router.post("/lawyerpanel",async(req,res)=>{
    const {senderid,receiverid} = req.body
  
        try
        {
            const lawyerpanel = await panel.findOne({lawyerid:receiverid})

            if(!lawyerpanel)
            {
                const insertpanel = await new panel({
                    lawyerid:receiverid,
                    memebers:[senderid]
                })

                await insertpanel.save()

               return res.send(insertpanel)
            }
            else
            {
               const checkuser= await lawyerpanel.memebers.includes(senderid)

               if(!checkuser)
               {
                    lawyerpanel.memebers.push(senderid)
                    await lawyerpanel.save()

                    return res.send(lawyerpanel)
               }

               else
               {
                   return res.send("Users is Already found") 
               }
            }

        }

        catch(er)
        {
          
            console.log(er)
        }
    

})


router.post("/userpanel",async(req,res)=>{
    const {senderid,receiverid} = req.body
  
        try
        {
            const userpanel1 = await userpanel.findOne({userid:receiverid})
           
            if(!userpanel1)
            {
                const insertpanel = await new userpanel({
                    userid:receiverid,
                    memebers:[senderid]
                })

                await insertpanel.save()

               return res.send(insertpanel)
            }
            else
            {
               const checkuser= await userpanel1.memebers.includes(senderid)

               if(!checkuser)
               {
                    userpanel1.memebers.push(senderid)
                    await userpanel1.save()

                    return res.send(userpanel1)
               }

               else
               {
                   return res.send("Users is Already found") 
               }
            }

        }

        catch(er)
        {
          
            console.log(er)
        }
    

})


router.post("/getpanel",async(req,res)=>{
    const {lawyerid} = req.body
    try
    {
        
        const lawyerdata = await panel.findOne({lawyerid:lawyerid})
        const extend = await lawyerdata.populate('memebers')
        console.log(extend)
        res.send(extend)
    }catch(err)
    {
        res.send(err)
    }
})


module.exports = router