const Review = require("../models/reviewModel");
const User = require("../models/authModels")

exports.reviewSubmission = async (req, res) => {
  try {
    const {
      review,
      createdBy,
    } = req.body;

    console.log(
      review,createdBy
    );

    if (
      !review || !createdBy
    ) {
      return res.status(400).json({ message: "Some fields are missing" });
    }
    const reviewData = new Review({
      review,
      createdBy,
    });

    await reviewData.save();

    return res.status(200).json({ message: "review submitted" });
  } catch (error) {
    console.error("Error while submitting review :", error);
    return res.status(500).json({ message: "An error occurred", error: error.message });
  }
};


exports.viewAllReview = async (req, res) => {
  try {
    const reviewList = await Review.find();
    const userList = await User.find();

    if (!reviewList || reviewList.length === 0) {
      return res
        .status(404)
        .json({ message: "No reviews have been submitted" });
    }

    const updatedData = reviewList.map((item) => {
      const user = userList.find((user) => user._id.toString() === item.createdBy.toString());

      return {
        ...item.toObject(),
        createdBy: user ? user.fullName : "Unknown",
      };
    });

    return res.status(200).json({ message: "reviews fetched successfully", data: updatedData });
  } catch (error) {
    return res.status(500).json({ message: "Error occurred while fetching data" });
  }
};


exports.updateReviewStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ["Pending", "Accepted", "Rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status update" });
    }

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ message: "review not found" });
    }

    review.status = status;
    await review.save();

    return res.status(200).json({ message: "Status updated successfully", data: review });
  } catch (error) {
    console.error("Error updating review status:", error);
    return res.status(500).json({ message: "An error occurred", error: error.message });
  }
};