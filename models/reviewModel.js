const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        default: "Pending",
      },
  },
  { timestamps: true }
);

module.exports = mongoose.model("review", dataSchema);
