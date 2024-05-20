const mongoose = require('mongoose')

const Schema =  mongoose.Schema

const messagepanel = new Schema({
    lawyerid:String,
    memebers:[
        {
            type:Schema.Types.ObjectId,
            ref:'user'
        }
    ]
})

const model = mongoose.model("messagepanel",messagepanel)


module.exports = model