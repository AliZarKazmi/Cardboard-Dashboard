const mongoose = require("mongoose");

const CostSchema = new mongoose.Schema({
  labor: {
    type: Number,
    required: [true, "Please add a cost for the labor"],
  },
  printedSides: {
    type: Number,
    required: [true, "Please add sides for printed Sides"],
  },
  rent: { type: Number, required: [true, "Please add the rent cost"] },
});

const CostModel = mongoose.model("costs", CostSchema);

module.exports = CostModel;
