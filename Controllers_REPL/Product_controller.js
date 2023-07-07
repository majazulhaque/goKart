const Product = require("../models/Product");
const Stock = require("../models/Stock");
const Warehouse = require("../models/Warehouse");

// REPL IMPLEMENTATION
async function addProduct(args) {
  try {
    const { productName, skuId, category, subCategory, imageLink } = args;

    // Check if the SKU ID already exists
    const existingProduct = await Product.findOne({ sku: skuId });
    if (existingProduct) {
      return "SKU ID already exists";
    }
    // Create a new product
    const product = await Product.create({
      name: args[0],
      sku: args[1],
      category: args[2],
      subCategory: args[3],
      imageLink: args[4],
    });

    console.log("Product Added Successfully\n",JSON.stringify(product, null, 2));
    return;
  } catch (error) {
    return { error: "Error adding product", message: error.message };
  }
}

async function listProducts() {
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

    console.log("Product Listed Successfully\n",JSON.stringify(productList, null, 2));
    return;
  } catch (error) {
    return { error: "Error while Listing Products", message: error.message };
  }
}

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

module.exports = { addProduct, listProducts };
