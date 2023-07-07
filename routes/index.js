const express = require("express");

const router = express.Router();

router.use("/customer", require("./Customer.js"));

module.exports = router;