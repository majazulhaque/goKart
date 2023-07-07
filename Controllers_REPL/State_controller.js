const State = require("../models/State");
const Warehouse = require("../models/Warehouse");

// REPL IMPLEMENTATION

async function addState(args) {
  try {
    const [state] = args;

    // Generate a unique state ID
    const stateId = generateStateId();

    // Create a new state
    const newState = new State({
      name: state,
      stateId,
    });

    // Save the state to the database
    await newState.save();

    console.log("State Added Successfully\n",JSON.stringify(newState, null, 2));
    return;
  } catch (error) {
    return { error: "Error while adding State", message: error.message };
  }
}

async function viewStates() {
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

    console.log("List States Successfully\n",JSON.stringify(stateData, null, 2));
    return;
  } catch (error) {
    return { error: "Error while fetching state data", message: error.message };
  }
}

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

// Helper function to generate a unique state ID
function generateStateId() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const stateId =
    characters.charAt(Math.floor(Math.random() * characters.length)) +
    characters.charAt(Math.floor(Math.random() * characters.length));
  return stateId;
}

module.exports = { addState, viewStates };
