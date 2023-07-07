const Product = require("../models/Product");
const Stock = require("../models/Stock");
const Warehouse = require("../models/Warehouse");


module.exports.add = async function (req, res) {
  try {
    const { productName, skuId, category, subCategory, imageLink } = req.body;

    // Check if the SKU ID already exists
    const existingProduct = await Product.findOne({ sku: skuId });
    if (existingProduct) {
      return res.status(400).json({ error: "SKU ID already exists" });
    }

    // Create a new product
    const product = await Product.create({
      name: productName,
      sku: skuId,
      category,
      subCategory,
      imageLink,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
