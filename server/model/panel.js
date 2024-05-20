const mongoose = require('mongoose')

const Schema =  mongoose.Schema

const messagepanel = new Schema({
    userid:String,
    memebers:[
        {
            type:Schema.Types.ObjectId,
            ref:'createlawyer'
        }
    ]
})

const model = mongoose.model("userpanel",messagepanel)


module.exports = model