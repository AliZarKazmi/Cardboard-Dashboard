const mongoose = require("mongoose")

const RoolSchema =  new mongoose.Schema({
    Rooltype :{
        type: String,
        required: true,
        trim:true
    },
    rate:{
        type: Number,
        required: true
    },
    sizes:{
        type:[{
            size: {
                type: Number,
                required: true
            },
            quantity:  {
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