const express = require("express");

const router = express.Router();

const OrderController = require("../controllers/Order_controller");

router.get("/", OrderController.viewOrders);
router.post("/new", OrderController.processOrder);

module.exports = router;
