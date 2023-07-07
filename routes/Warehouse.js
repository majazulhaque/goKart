const express = require("express");

const router = express.Router();

const WarehouseController = require("../controllers/Warehouse_controller");

router.get("/", WarehouseController.getWarehouses);
router.post("/add", WarehouseController.add);
router.get("/:warehouseNumber", WarehouseController.getWarehouseInfo);


module.exports = router;
