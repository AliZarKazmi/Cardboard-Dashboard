const mongoose = require("mongoose")

const CostSchema =  new mongoose.Schema({
    labor : Number,
    printedSides:Number,
    rent :Number,
    imagePrintedSide: Number
})

const CostModel = mongoose.model('costs',CostSchema)

module.exports = CostModel