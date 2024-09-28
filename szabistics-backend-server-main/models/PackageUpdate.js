const mongoose = require("mongoose");

const packageUpdateSchema = new mongoose.Schema(
  {
    location: { type: String, required: false, default: "" },

    title: {
      type: String,
      required: false,
      default: "",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      required: false,
    },
    url: {
      type: String,
      required: false,
      default: "",
    },
    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      default: null,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const packageUpdateModel = mongoose.model("PackageUpdate", packageUpdateSchema);
module.exports = packageUpdateModel;
