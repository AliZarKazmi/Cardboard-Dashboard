const mongoose = require('mongoose')

const OrderSchema= new mongoose.Schema({
    item:[{
        name: String,
        length: Number,
        width: Number,
        depth: Number,
        // Add other necessary details for the product
      }],
    client:{
        name:String,
        emial: String,
        shippingAddress : String,
        phone : Number,
        totalAmount:Number,
        cardNumber:Number
    }
    
    
})


const OrderModel =  mongoose.model('orders',OrderSchema)

module.exports= OrderModel
