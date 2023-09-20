const mongoose =  require("mongoose")

const MaterialSchema =  new mongoose.Schema({
    materailName :String,
    paperRate :Number,
    rollRate:Number,
    gamrige: Number
})

const MaterialModel =  mongoose.model('materialsEntity',MaterialSchema)
module.exports=MaterialModel;