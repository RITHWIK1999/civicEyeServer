const express = require("express");
const {
  complaintRegister,
  viewAllComplaints,
  viewUserComplaint,
  updateComplaintStatus,
  viewComplaintsByUser,
} = require("../controllers/complaintController");
const upload = require("../config/multer");

const route = express.Router();

route.post("/complaintRegister",upload.single("proof"), complaintRegister);
route.get("/viewAllComplaints", viewAllComplaints);
route.get("/viewUserComplaint/:id", viewUserComplaint);
route.put("/updateComplaintStatus/:id",updateComplaintStatus)
route.get("/viewComplaintsByUser/:id",viewComplaintsByUser)


module.exports = route;
