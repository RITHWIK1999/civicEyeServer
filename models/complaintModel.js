const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    complaintName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    landmark: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    period: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    proof: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Pending", "Under Investigation", "Rejected", "Complaint Solved"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("complaint", dataSchema);
