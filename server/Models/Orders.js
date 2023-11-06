const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    items: [{
        id: Number,
        name: String,
        dimension: {
            length: Number,
            width: Number,
            depth: Number,
        },
        material: String,
        quantity: Number,
        sides: String,
        price: Number,
        pricePerPiece: Number,
        printedSides:Number,
        quantity:Number,
        sides_design: {
                back: String,
                bottom: String,
                front: String,
                left: String,
                right: String,
        },
        thickness: Number
        // Add other necessary details for the product
    }],

    client: {
        name: String,
        emial: String,
        phone : Number
    },
    payment: {},
    shipping: {
        address: String,
        city: String,
        state: String,
        zip: String
    }
})


const OrderModel = mongoose.model('orders', OrderSchema)

module.exports = OrderModel
