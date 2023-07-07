const Product = require("../models/Product");
const Stock = require("../models/Stock");
const Warehouse = require("../models/Warehouse");

// Function to GET PRODUCTS
module.exports.getProducts = async function (req, res) {
  try {
    const products = await Product.find({});
    const productList = [];
    for (const product of products) {
      const stock = await Stock.find({ product: product.name });
      const stockQuantity = stock.reduce(
        (total, item) => total + item.quantity,
        0
      );
      const inStockWarehouses = await getInStockWarehouses(product.name);
      // console.log(inStockWarehouses);
      productList.push({
        productName: product.name,
        skuId: product.sku,
        category: product.category,
        subCategory: product.subCategory,
        stockQuantity,
        inStockWarehouses,
      });
    }
    res.status(200).json(productList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Helper function to get the list of in-stock warehouses for a product
async function getInStockWarehouses(productName) {
  const stocks = await Stock.find({ product: productName });
  const inStockWarehouses = [];
  for (const stock of stocks) {
    const warehouses = await Warehouse.find({ warehouseName: stock.warehouse });
    for (const warehouse of warehouses) {
      inStockWarehouses.push({
        warehouseNumber: warehouse.warehouseNumber,
        warehouseName: warehouse.warehouseName,
      });
    }
  }
  return inStockWarehouses;
}

// Function to ADD PRODUCT
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
