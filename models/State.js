const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  stateId: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function (value) {
        return /^[A-Z]{2}$/.test(value);
      },
      message: "State ID must be a unique 2-character string in uppercase",
    },
  },
});

const State = mongoose.model("State", stateSchema);

module.exports = State;
