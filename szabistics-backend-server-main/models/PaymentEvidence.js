const mongoose = require("mongoose");

const paymentEvidenceSchema = new mongoose.Schema(
  {
    transactionId: { type: String, required: false, default: "" },

    evidenceAttachment: {
      url: {
        type: String,
        required: false,
        default: "",
      },
      publicId: {
        type: String,
        required: false,
        default: "",
      },
    },

    status: {
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
const paymentEvidenceModel = mongoose.model(
  "PaymentEvidence",
  paymentEvidenceSchema
);

module.exports = paymentEvidenceModel;
