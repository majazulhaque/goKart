const productController = require("./Controllers_REPL/Product_controller");
const warehouseController = require("./Controllers_REPL/Warehouse_controller");
const stockController = require("./Controllers_REPL/Stock_controller");
const stateController = require("./Controllers_REPL/State_controller");
const orderController = require("./Controllers_REPL/Order_controller");
const customerController = require("./Controllers_REPL/Customer_controller");

async function processCommand(command) {
  const [commandName, ...args] = command.split(" ");

  switch (commandName) {
    case "ADD_CUSTOMER":
      return customerController.addCustomer(args);

    case "LIST_CUSTOMER":
      return customerController.listCustomer();

    case "UPDATE_CUSTOMER":
      return customerController.updateCustomer(args);

    case "GET_CUSTOMER":
      return customerController.getCustomer(args);

    case "DELETE_CUSTOMER":
      return customerController.deleteCustomer(args);

    case "ADD_PRODUCT":
      return productController.addProduct(args);

    case "ADD_WAREHOUSE":
      return warehouseController.addWarehouse(args);

    case "ADD_STOCK":
      return stockController.addStock(args);

    case "ADD_STATE":
      return stateController.addState(args);

    case "VIEW_STATE":
      return stateController.viewStates();

    case "VIEW_ORDERS":
      return orderController.viewOrders();

    case "LIST_PRODUCTS":
      return productController.listProducts();

    case "LIST_WAREHOUSES":
      return warehouseController.listWarehouses();

    case "WAREHOUSE_INFO":
      return warehouseController.getWarehouseInfo(args);

    case "PROCESS_ORDER":
      return orderController.processOrder(args);

    default:
      return `Invalid command: ${commandName}`;
  }
}

module.exports = { processCommand };
