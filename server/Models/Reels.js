const mongoose = require("mongoose")

const ReelSchema =  new mongoose.Schema({
    Type:{
        type: String,
        required: true,
        trim:true
    },
    Rate:{
        type: Number,
        required: true
    },
    Sizes:{
        type:[{
            Size: {
                type: Number,
                required: true
            },
            Weight:  {
                type: Number,
                required: true
            }
        }],        
    },
    description:{
        type:String,        
        required: true,
        trim:true
    }


})

module.exports = mongoose.model("Reel",ReelSchema)