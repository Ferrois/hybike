const mongoose = require("mongoose");

const StationSchema = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
    required: true,
  },
  capacity: {
    type: Number,
    default: 0,
    required: true,
  }
});

module.exports = mongoose.model("stations", StationSchema);