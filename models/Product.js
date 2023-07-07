const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sku: {
    type: Number,
    unique: true,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
  imageLink: {
    type: String,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
