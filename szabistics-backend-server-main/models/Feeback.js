const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: false,
      default: "",
    },
    rating: {
      type: Number,
      required: false,
      min: 1,
      max: 5,
      default: 1,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
      default: null,
    },
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
