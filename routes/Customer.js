const express = require("express");

const router = express.Router();

const CustomerController = require("../controllers/Customer_controller");

router.post("/add", CustomerController.createCustomer);
router.get("/:customerId", CustomerController.getCustomerById);
router.get("/", CustomerController.getAllCustomers);
router.delete("/:customerId", CustomerController.deleteCustomerById);
router.put("/:customerId", CustomerController.updateCustomerById);

module.exports = router;
