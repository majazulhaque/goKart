const express = require("express");

const router = express.Router();

const StockController = require("../controllers/Stock_controller");

router.post("/add", StockController.add);

module.exports = router;
