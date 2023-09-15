const mongoose = require("mongoose");
const ProductItem = require("../Models/ProductsItems.js"); // Import your "ProductItem" model
const Order = require("../Models/Orders.js"); // Import your "Order" model


// Execute the aggregation query
Order.aggregate([
  {
    $unwind: "$items" // Split orders with multiple items into separate documents
  },
  {
    $group: {
      _id: "$items.name", // Group by product name
      totalOrdered: { $sum: "$items.quantity" } // Calculate the total quantity ordered for each product name
    }
  }
])
  .exec((err, result) => {
    if (err) {
      console.error("Error executing aggregation query:", err);
    //   mongoose.disconnect();
      return;
    }

    console.log("Total quantities ordered for each product:");
    console.log(result);

    // mongoose.disconnect();
  });
