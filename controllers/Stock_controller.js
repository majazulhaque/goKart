const Product = require("../models/Product");
const Warehouse = require("../models/Warehouse");
const Stock = require("../models/Stock");

module.exports.add = async (req, res) => {
  try {
    const { sku, warehouseNumber, quantity } = req.body;

    // Find the product in the product catalog
    const product = await Product.findOne({ sku });
    if (!product) {
      return res.status(400).json({ error: "Invalid SKU" });
    }

    // Find the warehouse
    const warehouse = await Warehouse.findOne({ warehouseNumber });
    if (!warehouse) {
      return res.status(400).json({ error: "Invalid warehouse number" });
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
        return res.status(400).json({ error: "Stock limit exceeded" });
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

    res.status(201).json(stock);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
