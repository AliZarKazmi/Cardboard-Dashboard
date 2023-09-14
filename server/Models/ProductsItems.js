const mongoose = require('mongoose')

const CardItemsSchema= new mongoose.Schema({
    cardboardname:String,
    description:String,
    minOrder :Number,
    length: Number,
    width:Number,
    depth:Number,
    rate:Number,
    quantity:Number,
    img:String
})


const CardItemsModel =  mongoose.model('CardItems',CardItemsSchema)

module.exports= CardItemsModel
