const State = require("../models/State");
const Warehouse = require("../models/Warehouse");

module.exports.getStates = async function (req, res) {
  try {
    const states = await State.find({});
    const stateData = [];
    for (const state of states) {
      const warehousesCount = await Warehouse.countDocuments({
        state: state.name,
      });
      const totalStockCapacity = await calculateTotalStockCapacity(state.name);
      stateData.push({
        state: state.name,
        stateId: state.stateId,
        warehousesCount,
        totalStockCapacity,
      });
    }
    res.status(200).json(stateData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Helper function to calculate the total stock capacity for a state
async function calculateTotalStockCapacity(state) {
  const warehouses = await Warehouse.find({ state });
  let totalCapacity = 0;
  for (const warehouse of warehouses) {
    if (warehouse.stockLimit) {
      totalCapacity += warehouse.stockLimit;
    }
  }
  return totalCapacity;
}

module.exports.add = async (req, res) => {
  try {
    const { state } = req.body;

    // Generate a unique state ID
    const stateId = generateStateId();

    // Create a new state
    const newState = new State({
      name: state,
      stateId,
    });

    // Save the state to the database
    await newState.save();

    res.status(201).json(newState);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Helper function to generate a unique state ID
function generateStateId() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const stateId =
    characters.charAt(Math.floor(Math.random() * characters.length)) +
    characters.charAt(Math.floor(Math.random() * characters.length));
  return stateId;
}
