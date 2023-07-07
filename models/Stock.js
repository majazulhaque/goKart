const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  product: {
    type: String,
    ref: "Product",
    required: true,
  },
  warehouse: {
    type: String,
    ref: "Warehouse",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
});

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
