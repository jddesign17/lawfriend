
const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    gmail:String,
    password:String
})

const model = mongoose.model("admin",Schema)

module.exports = model