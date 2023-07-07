const express = require("express");

const router = express.Router();

const ProductController = require("../controllers/Product_controller");

router.post("/add", ProductController.add);
router.get("/", ProductController.getProducts);

module.exports = router;
