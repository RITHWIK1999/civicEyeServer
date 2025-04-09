const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());

const authRoute = require("./routes/authRoutes");
const complaintRoute = require("./routes/complaintRoutes");
const reviewRoute = require("./routes/reviewRoute");


app.use("/auth", authRoute);
app.use("/complaint", complaintRoute);
app.use("/review",reviewRoute);

app.use("/uploads", express.static("uploads"));


const mongourl = process.env.MONGO_URL;

mongoose
  .connect(mongourl)
  .then(() => {
    console.log("Mongodb Connected");
  })
  .catch((error) => {
    console.log("Error Occured", error);
  });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running ${PORT}`);
});
