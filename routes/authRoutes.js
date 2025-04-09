const express = require("express");

const {
  registration,
  loginUser,
  viewAllUser,
  viewUser,
  updateUser,
} = require("../controllers/authController");

const route = express.Router();

route.post("/registration", registration);
route.post("/login", loginUser);
route.get("/viewAllUser", viewAllUser);
route.get("/viewUser/:id", viewUser);
route.put("/updateUser/:id", updateUser);

module.exports = route;
