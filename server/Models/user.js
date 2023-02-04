const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  points: {
    type: Number,
    default: 0,
    required: true,
  },
  //   ethnicity: { type: String },
  //   nric: { type: String, required: true },
  //   id: { type: String, required: true },
  //   group: { type: String, required: true },
  //   medicalHist: { type: Array },
  //   ippt: { type: Object },
  //   leaves: { type: Array },
  //   loc: { type: Object },
  //   settings: {type:Object}
});

module.exports = mongoose.model("user", UserSchema);
