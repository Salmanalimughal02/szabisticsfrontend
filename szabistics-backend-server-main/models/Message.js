const mongoose = require("mongoose");

const packageMessageSchema = new mongoose.Schema(
  {
    messageText: {
      type: String,
      required: true,
      default: "",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
      default: null,
    },

    package: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: false,
      default: null,
    },
  },

  {
    timestamps: true,
  }
);

const packageMessageModel = mongoose.model(
  "PackageMessage",
  packageMessageSchema
);

module.exports = packageMessageModel;
