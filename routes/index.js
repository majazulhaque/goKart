const express = require("express");

const router = express.Router();

router.use("/product", require("./Product.js"));
router.use("/warehouse", require("./Warehouse.js"));
router.use("/state", require("./State.js"));
router.use("/stock", require("./Stock.js"));
router.use("/order", require("./Order.js"));
router.use("/customer", require("./Customer.js"));

module.exports = router;
