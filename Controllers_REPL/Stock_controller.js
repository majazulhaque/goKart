// REPL IMPLEMENTATION

const Product = require("../models/Product");
const Warehouse = require("../models/Warehouse");
const Stock = require("../models/Stock");


// Function to ADD STOCK
async function addStock(args) {
  try {
    const [sku, warehouseNumber, quantity] = args;

    // Find the product in the product catalog
    const product = await Product.findOne({ sku });
    if (!product) {
      return "Invalid SKU";
    }

    // Find the warehouse
    const warehouse = await Warehouse.findOne({ warehouseNumber });
    if (!warehouse) {
      return "Invalid warehouse number";
    }

    // Check if the warehouse has a stock limit
    const stockLimit = warehouse.stockLimit;
    let totalQuantity = 0;
    let existingStock = 0;
    if (stockLimit !== undefined && stockLimit !== null) {
      // Check if the stock limit will be exceeded by this shipment
      existingStock = await Stock.findOne({
        product: product.name,
        warehouse: warehouse.warehouseName,
      });
      const availableQuantity = existingStock ? existingStock.quantity : 0;
      totalQuantity = availableQuantity + quantity;
      if (totalQuantity > stockLimit) {
        return "Stock limit exceeded";
      }
      if (existingStock) {
        // delete previous stock to update
        await Stock.findByIdAndDelete(existingStock._id);
      }
    }

    // Add stock to the warehouse
    const stock = new Stock({
      product: product.name,
      warehouse: warehouse.warehouseName,
      quantity: totalQuantity,
    });
    await stock.save();

    console.log("Stock Added Successfully\n",JSON.stringify(stock, null, 2));
    return;
  } catch (error) {
    return { error: "Error while adding stock", message: error.message };
  }
}

module.exports = { addStock };
