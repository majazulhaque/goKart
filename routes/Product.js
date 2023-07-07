const express = require("express");

const router = express.Router();

const ProductController = require("../controllers/Product_controller");

router.post("/add", ProductController.add);




module.exports = router;