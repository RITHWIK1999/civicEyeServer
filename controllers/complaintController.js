const Complaint = require("../models/complaintModel");
const User = require('../models/authModels')

exports.complaintRegister = async (req, res) => {
  try {
    const {
      complaintName,
      type,
      description,
      district,
      location,
      landmark,
      date,
      time,
      period,
      createdBy,
    } = req.body;

    console.log(
      complaintName, type, description, district, location,
      landmark, date, time, period, createdBy
    );

    // Check for missing fields
    if (
      !complaintName || !type || !description || !district || !location ||
      !landmark || !date || !time || !period || !createdBy
    ) {
      return res.status(400).json({ message: "Some fields are missing" });
    }

    // Ensure a file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "Uploaded file not found" });
    }

    // Create and save the complaint
    const complaintData = new Complaint({
      complaintName,
      type,
      description,
      district,
      location,
      landmark,
      date,
      time,
      period,
      createdBy,
      proof: `/uploads/${req.file.filename}`,
    });

    await complaintData.save();

    return res.status(201).json({ message: "Complaint successfully registered" });
  } catch (error) {
    console.error("Error registering complaint:", error);
    return res.status(500).json({ message: "An error occurred", error: error.message });
  }
};


exports.viewAllComplaints = async (req, res) => {
  try {
    const complaintList = await Complaint.find();
    const userList = await User.find();

    if (!complaintList || complaintList.length === 0) {
      return res
        .status(404)
        .json({ message: "No Complaints have been registered" });
    }

    const updatedData = complaintList.map((item) => {
      const user = userList.find((user) => user._id.toString() === item.createdBy.toString());

      return {
        ...item.toObject(), // Convert Mongoose document to plain object
        createdBy: user ? user.fullName : "Unknown",
      };
    });

    return res.status(200).json({ message: "Complaints fetched successfully", data: updatedData });
  } catch (error) {
    return res.status(500).json({ message: "Error occurred while fetching data" });
  }
};

exports.viewUserComplaint = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Complaint ID is required" });
    }

    const userData = await Complaint.findById(id);
    if (!userData) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    const user = await User.findById(userData.createdBy);
    const updatedData = {
      ...userData.toObject(), // Convert to plain object
      createdBy: user ? user.fullName : "Unknown",
      email:user.email,
      address:user.address,
      mobileNumber:user.mobileNumber
    };

    return res.status(200).json({ message: "Success", data: updatedData });
  } catch (error) {
    console.error("Error fetching complaint:", error);
    return res.status(500).json({ message: "An error occurred", error: error.message });
  }
};


exports.updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["Pending", "Under Investigation", "Rejected", "Complaint Solved"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status update" });
    }

    const complaint = await Complaint.findById(id);
    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.status = status;
    await complaint.save();

    return res.status(200).json({ message: "Status updated successfully", data: complaint });
  } catch (error) {
    console.error("Error updating complaint status:", error);
    return res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

exports.viewComplaintsByUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const complaints = await Complaint.find({ createdBy: id });

    if (!complaints || complaints.length === 0) {
      return res.status(404).json({ message: "No complaints found for this user" });
    }

    const user = await User.findById(id);
    const userName = user ? user.fullName : "Unknown";

    const updatedComplaints = complaints.map((complaint) => ({
      ...complaint.toObject(),
      createdBy: userName,
      email: user ? user.email : "Unknown",
    }));

    return res.status(200).json({ message: "Complaints fetched successfully", data: updatedComplaints });
  } catch (error) {
    console.error("Error fetching user complaints:", error);
    return res.status(500).json({ message: "An error occurred", error: error.message });
  }
};
