const Order = require("../models/Order");
const Warehouse = require("../models/Warehouse");
const Stock = require("../models/Stock");
const Customer = require("../models/Customer");
const Product = require("../models/Product");

// REPL IMPLEMENTATIONS
async function processOrder(args) {
  try {
    const [customerId, sku, orderQuantity, customerLocation] = args;

    // Find the customer in the customer database
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return "Customer not found";
    }

    // Find the nearest warehouse based on customer location
    const nearestWarehouse = await findNearestWarehouse(customerLocation);
    if (!nearestWarehouse) {
      return "No warehouses available";
    }
    // Find product based on product sku
    const currentProduct = await Product.findOne({ sku: sku });

    // Check if the nearest warehouse has sufficient stock for the requested SKU
    let stock = await Stock.findOne({
      product: currentProduct.name,
      warehouse: nearestWarehouse.warehouseName,
    });
    if (!stock || stock.quantity < orderQuantity) {
      // Stock not available in the nearest warehouse, find the next closest warehouse with sufficient stock
      const nextClosestWarehouse = await findNextClosestWarehouse(
        customerLocation,
        currentProduct.name,
        orderQuantity
      );
      if (!nextClosestWarehouse) {
        return `SKU out of stock in all warehouses or Requested SKU not available in the nearest warehouse. Closest warehouse is ${nextClosestWarehouse.warehouseName}`;
      }
      stock = await Stock.findOne({
        product: currentProduct.name,
        warehouse: nextClosestWarehouse.warehouseName,
      });
    }

    // Reduce the stock quantity in the nearest warehouse
    stock.quantity -= orderQuantity;
    await stock.save();

    // Create the order
    const order = new Order({
      customerId,
      sku,
      productName: currentProduct.name,
      orderQuantity,
      customerLocation: JSON.parse(customerLocation),
      warehouseId: nearestWarehouse._id,
      warehouse: nearestWarehouse.warehouseName,
    });
    await order.save();

    console.log("Order Processed Successfully\n",JSON.stringify(order, null, 2));
    return;
  } catch (error) {
    return { error: "Error while processing Order", message: error.message };
  }
}

async function viewOrders() {
  try {
    // Retrieve all orders from the database
    const orders = await Order.find().populate("customerId warehouseId");

    // Map the orders to the desired format
    const formattedOrders = orders.map((order) => ({
      customerId: order.customerId._id,
      orderData: {
        orderQuantity: order.orderQuantity,
        fulfilled: order.fulfilled,
      },
      fulfillmentStatus: order.fulfilled ? "Fulfilled" : "Pending",
      warehouse: order.warehouse ? order.warehouse : "N/A",
    }));

    console.log("Order Views Successfully\n",JSON.stringify(formattedOrders, null, 2));
    return;
  } catch (error) {
    return { error: "Error while viewing Order", message: error.message };
  }
}

async function findNearestWarehouse(customerLocation) {
  const warehouses = await Warehouse.find();

  // Calculate the distance between the customer location and each warehouse location
  const distances = warehouses.map((warehouse) => ({
    warehouse,
    distance: calculateDistance(customerLocation, warehouse.location),
  }));

  // Sort the warehouses by distance in ascending order
  distances.sort((a, b) => a.distance - b.distance);

  // Return the nearest warehouse
  return distances[0].warehouse;
}

async function findNextClosestWarehouse(customerLocation, name, orderQuantity) {
  const warehouses = await Warehouse.find();

  // Calculate the distance between the customer location and each warehouse location
  const distances = warehouses.map((warehouse) => ({
    warehouse,
    distance: calculateDistance(customerLocation, warehouse.location),
  }));

  // Sort the warehouses by distance in ascending order
  distances.sort((a, b) => a.distance - b.distance);

  // Find the next closest warehouse with sufficient stock for the requested SKU
  for (const { warehouse } of distances) {
    const stock = await Stock.findOne({
      product: name,
      warehouse: warehouse.warehouseName,
    });
    if (stock && stock.quantity >= orderQuantity) {
      return warehouse;
    }
  }

  // No warehouse found with sufficient stock
  return null;
}

// Helper function to calculate the distance between two locations (latitude, longitude)
function calculateDistance(location1, location2) {
  const earthRadius = 6371; // Radius of the Earth in kilometers

  // Convert latitude and longitude to radians
  const lat1 = degToRad(location1.latitude);
  const lon1 = degToRad(location1.longitude);
  const lat2 = degToRad(location2.coordinates[0]);
  const lon2 = degToRad(location2.coordinates[1]);

  // Calculate the differences between latitudes and longitudes
  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  // Calculate the Haversine distance
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c;

  return distance;
}

// Helper function to convert degrees to radians
function degToRad(degrees) {
  return degrees * (Math.PI / 180);
}

module.exports = { viewOrders, processOrder };
