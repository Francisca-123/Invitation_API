const mongoose = require('mongoose');

const inviteSchema = new mongoose.Schema({

    user:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'person',
        required:true,
    },

    invite_code:{
        type: Number,
        required:true
    },

    class:{
        type: String,
        enum:["REGULAR", "VIP"],
        require:true
    },
    description:{
        venue:{type:String,required:false},
        
    
    },
    
    created_at:{
        type:Date,
        default:Date.now()
    },

})

const inviteModel = mongoose.model('invite', inviteSchema)

module.exports = inviteModel