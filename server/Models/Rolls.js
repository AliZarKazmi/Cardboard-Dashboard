const mongoose = require("mongoose")

const RoolSchema =  new mongoose.Schema({
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
            Quantity:  {
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

module.exports = mongoose.model("Roll",RoolSchema)