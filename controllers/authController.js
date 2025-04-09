const user = require("../models/authModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registration = async (req, res) => {
  try {
    const { fullName, mobileNumber, dateOfBirth, email, password } = req.body;

    if (!fullName || !mobileNumber || !dateOfBirth || !email || !password) {
      return res.status(400).json({ message: "Some fields are missing" });
    }

    const existingUser = await user.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    const role = email === "rithwik@gmail.com" ? "admin" : "user";

    const newUser = new user({
      fullName,
      mobileNumber,
      dateOfBirth,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Some fields are missing" });
    }

    const existingUser = await user.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({ message: "You are not registered" });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    if (!process.env.SECRET_KEY || !process.env.EXPIRING) {
      return res.status(500).json({ message: "Server configuration error" });
    }

    const token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email,role: existingUser.role },
      process.env.SECRET_KEY,
      { expiresIn: process.env.EXPIRING }
    );

    return res.status(200).json({
      message: "Login successful",
      name: existingUser.fullName,
      token,
      role: existingUser.role,
      id: existingUser._id,
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.viewAllUser = async (req, res) => {
  try {
    const userList = await user.find();

    if (!userList) {
      return res.status(404).json({ message: "no data's found" });
    }

    return res
      .status(200)
      .json({ message: "all data viewed", data: userList });
  } catch (error) {
    return res.status(500).json({ message: "error occurred" });
  }
};

exports.viewUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "no id found" });
    }

    const userData = await user.findById(id);

    if (!userData) {
      return res.status(404).json({ message: "no user found" });
    }

    return res.status(200).json({ message: "success", data: userData });
  } catch (error) {
    return res.status(500).json({ message: "error occurred" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, nickName, mobileNumber,dateOfBirth,email,job,address,district,state,idProof,idProofNumber } = req.body;
    if ( !fullName || !nickName || !mobileNumber || !dateOfBirth || !email  || !job || !address || !district || !state || !idProof || !idProofNumber ) {
      return res.status(400).json({ message: "some data's not available" });
    }
    if (!id) {
      return res.status(200).json({ message: "no id found" });
    }

    const updateData = await user.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updateData) {
      return res.status(404).json({ message: "no data found to update" });
    }
    return res.status(200).json({ message: "success", data: updateData });
  } catch (error) {
    return res.status(500).json({ message: "error occurred" });
  }
};
