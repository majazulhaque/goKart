const Warehouse = require("../models/Warehouse");
const Stock = require("../models/Stock");

const haversine = require("haversine-distance");

// REPL IMPLEMENTATION
async function addWarehouse(args) {
  try {
    const [warehouseNumber, warehouseName, state, location, stockLimit] = args;

    // Check if the warehouse number already exists
    const existingWarehouse = await Warehouse.findOne({ warehouseNumber });
    if (existingWarehouse) {
      return { message: "Warehouse number already exists" };
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
      return {
        message:
          "A new warehouse cannot be added within 30km of an existing warehouse",
      };
    }
    // Save the warehouse to the database
    await warehouse.save();

    console.log("Warehouses Added Successfully\n",JSON.stringify(warehouse, null, 2));
    return;
  } catch (error) {
    return { error: "Error while adding warehouse", message: error.message };
  }
}

// LIST WAREHOUSE
async function listWarehouses() {
  try {
    const warehouses = await Warehouse.find({});
    const warehouseList = warehouses.map((warehouse) => ({
      warehouseNumber: warehouse.warehouseNumber,
      warehouseName: warehouse.warehouseName,
      state: warehouse.state,
      location: warehouse.location.coordinates,
    }));
    console.log("Warehouses Listed Successfully\n",JSON.stringify(warehouseList, null, 2));

    return;
  } catch (error) {
    return { error: "Error while Listing Warehouses", message: error.message };
  }
}

// GET WAREHOUSE INFO
async function getWarehouseInfo(args) {
  try {
    const [warehouseNumber] = args;

    // Find the warehouse by warehouse number
    const warehouse = await Warehouse.findOne({ warehouseNumber });
    if (!warehouse) {
      return "Warehouse not found";
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

    console.log("Get Warehouse Info Successfully\n",JSON.stringify(warehouseInfo, null, 2));
    return;

  } catch (error) {
    return {
      error: "Error while fetching warehouse Info",
      message: error.message,
    };
  }
}

async function calculateTotalStockCapacity(warehouseId) {
  const stockAggregation = await Stock.aggregate([
    { $match: { warehouse: warehouseId } },
    { $group: { _id: null, totalCapacity: { $sum: "$quantity" } } },
  ]);

  return stockAggregation.length > 0 ? stockAggregation[0].totalCapacity : 0;
}

module.exports = { addWarehouse, listWarehouses, getWarehouseInfo };
