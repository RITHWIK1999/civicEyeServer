const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema({
  fullName: {
    type: String,
    require: true,
  },
  nickName: {
    type: String,
    require: false,
  },
  mobileNumber: {
    type: Number,
    require: true,
  },
  dateOfBirth: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  job: {
    type: String,
    require: false,
  },
  address: {
    type: String,
    require: false,
  },
  district: {
    type: String,
    require: false,
  },
  state: {
    type: String,
    require: false,
  },
  idProof: {
    type: String,
    require: false,
  },
  idProofNumber: {
    type: String,
    require: false,
  },
  role: {
    type: String,
    default: "user",
  },
});
module.exports = mongoose.model("user", dataSchema);
