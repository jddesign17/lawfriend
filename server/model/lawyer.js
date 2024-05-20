const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    name:String,
    district:String,
    desc:String,
    phonenumber:String,
    image:String,
    gmail:String,
    password:String,
    category:String

})

const model = mongoose.model("createlawyer",Schema)

module.exports = model