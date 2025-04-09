const express = require("express");

const { reviewSubmission, viewAllReview, updateReviewStatus } = require("../controllers/reviewController");

const route = express.Router();

route.post("/reviewSubmission",reviewSubmission)
route.get("/viewAllReview",viewAllReview)
route.put("/updateReviewStatus/:id",updateReviewStatus)


module.exports = route;
