const Warehouse = require("../models/Warehouse");
const Stock = require("../models/Stock");

const haversine = require("haversine-distance");

module.exports.getWarehouses = async function (req, res) {
  try {
    const warehouses = await Warehouse.find({});
    const warehouseList = warehouses.map((warehouse) => ({
      warehouseNumber: warehouse.warehouseNumber,
      warehouseName: warehouse.warehouseName,
      state: warehouse.state,
      location: warehouse.location.coordinates,
    }));
    res.status(200).json(warehouseList);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.add = async (req, res) => {
  try {
    const { warehouseNumber, warehouseName, state, location, stockLimit } =
      req.body;

    // Check if the warehouse number already exists
    const existingWarehouse = await Warehouse.findOne({ warehouseNumber });
    if (existingWarehouse) {
      return res.status(400).json({ error: "Warehouse number already exists" });
    }

    // Calculate the coordinates from the location string (e.g., "(latitude,longitude)")
    const [latitude, longitude] = location
      .replace("(", "")
      .replace(")", "")
      .split(",")
      .map((coord) => parseFloat(coord.trim()));

    // Create a new warehouse
    const warehouse = new Warehouse({
      warehouseNumber,
      warehouseName,
      state,
      location: {
        type: "Point",
        coordinates: [longitude, latitude],
      },
      stockLimit,
    });

    // Check if the new warehouse is within 30km of an existing warehouse
    const existingWarehouses = await Warehouse.find({});
    const withinRadius = existingWarehouses.some((existingWarehouse) => {
      const existingCoordinates = existingWarehouse.location.coordinates;
      const distance = haversine(
        { lat: latitude, lng: longitude },
        { lat: existingCoordinates[1], lng: existingCoordinates[0] }
      );
      return distance <= 30000; // 30km in meters
    });
    if (withinRadius) {
      return res.status(400).json({
        error:
          "A new warehouse cannot be added within 30km of an existing warehouse",
      });
    }

    // Save the warehouse to the database
    await warehouse.save();

    res.status(201).json(warehouse);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Warehouse info
module.exports.getWarehouseInfo = async function (req, res) {
  try {
    const { warehouseNumber } = req.params;

    // Find the warehouse by warehouse number
    const warehouse = await Warehouse.findOne({ warehouseNumber });
    if (!warehouse) {
      return res.status(404).json({ error: "Warehouse not found" });
    }

    // Get the list of available SKUs in the warehouse
    const stocks = await Stock.find({ warehouse: warehouse._id }).populate(
      "product"
    );
    const skuList = stocks.map((stock) => ({
      sku: stock.product.sku,
      productName: stock.product.name,
    }));

    // Calculate the available storage capacity
    const availableStorage =
      warehouse.stockLimit !== undefined && warehouse.stockLimit !== null
        ? warehouse.stockLimit - calculateTotalStockCapacity(warehouse._id)
        : -1; // Unlimited storage

    const warehouseInfo = {
      warehouseNumber: warehouse.warehouseNumber,
      warehouseName: warehouse.warehouseName,
      state: warehouse.state,
      location: warehouse.location.coordinates,
      availableStorage,
      skuList,
    };

    res.status(200).json(warehouseInfo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

async function calculateTotalStockCapacity(warehouseId) {
  const stockAggregation = await Stock.aggregate([
    { $match: { warehouse: warehouseId } },
    { $group: { _id: null, totalCapacity: { $sum: "$quantity" } } },
  ]);

  return stockAggregation.length > 0 ? stockAggregation[0].totalCapacity : 0;
}
