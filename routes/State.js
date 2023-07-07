const express = require("express");

const router = express.Router();

const StateController = require("../controllers/State_controller");

router.get("/", StateController.getStates);
router.post("/add", StateController.add);

module.exports = router;
