const mongoose = require("mongoose");

const warehouseSchema = new mongoose.Schema({
  warehouseNumber: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function (value) {
        return /^[A-Z]{2}\d{4}$/.test(value);
      },
      message:
        "Warehouse number must be a unique 2 Uppercase character and 4 -digit string",
    },
  },
  warehouseName: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  stockLimit: {
    type: Number,
    min: 0,
  },
});

warehouseSchema.index({ location: "2dsphere" });

const Warehouse = mongoose.model("Warehouse", warehouseSchema);

module.exports = Warehouse;
