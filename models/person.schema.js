const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    access_code:{
        type:Number,
        required:true
    },
    created_at:{
        type: Date,
        require:true,
        default:Date.now()
    }
})

const personModel = mongoose.model('person', personSchema)

module.exports = personModel