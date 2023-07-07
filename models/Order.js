const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    required: true,
  },
  sku: {
    type: Number,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  orderQuantity: {
    type: Number,
    required: true,
  },
  customerLocation: {
    type: Object,
    required: true,
  },
  warehouseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Warehouse",
    required: true,
  },
  warehouse: {
    type: String,
    required: true,
  },
  fulfilled: {
    type: Boolean,
    default: false,
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
