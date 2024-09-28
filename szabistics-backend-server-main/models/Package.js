const mongoose = require("mongoose");

const { roles } = require("../constants/Basic");
const { ERROR_MESSAGES } = require("../constants/Errors");

const packageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    distance: {
      type: Number,
      default: 0,
      required: false,
    },
    modelNo: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      required: false,
      default: "",
    },
    dimensions: {
      height: {
        type: String,
        required: false,
        default: "",
      },
      width: {
        type: String,
        required: false,
        default: "",
      },
      weight: {
        type: String,
        required: false,
        default: "",
      },
      length: {
        type: String,
        required: false,
        default: "",
      },
    },

    packagePic: {
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
      isUploaded: {
        type: Boolean,
        required: false,
        default: false,
      },
    },

    releaseDocument1: {
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
      isUploaded: {
        type: Boolean,
        required: false,
        default: false,
      },
    },

    releaseDocument2: {
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
      isUploaded: {
        type: Boolean,
        required: false,
        default: false,
      },
    },

    location: {
      pickup: {
        type: String,
        required: false,
        default: "",
      },

      pickupContactNo: {
        type: String,
        required: false,
        default: "",
      },

      pickupAvailableTimings: {
        type: String,
        required: false,
        default: "",
      },

      dropoff: {
        type: String,
        required: false,
        default: "",
      },

      dropoffContactNo: {
        type: String,
        required: false,
        default: "",
      },
    },

    instructionsOrNotes: {
      type: String,
      required: false,
      default: "",
    },

    isLoadingDockAvailable: {
      type: Boolean,
      required: false,
      default: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
      default: null,
    },

    milestones: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PackageUpdate",
        required: false,
        default: [],
      },
    ],

    feedBack: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Feedback",
      required: false,
      default: null,
    },

    hasUserAgreedWithContract: {
      type: Boolean,
      required: false,
      default: false,
    },

    acceptedOffer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bid",
      required: false,
      default: null,
    },

    paymentEvidence: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PaymentEvidence",
      required: false,
      default: null,
    },

    OfferAcceptionTimestamp: {
      type: Date,
      required: false,
      default: null,
    },

    offers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Bid",
        required: false,
      },
    ],

    isCompleted: {
      type: Boolean,
      required: false,
      default: false,
    },

    liveLocationUrl: {
      type: String,
      default: "",
      required: false,
    },

    isActive: {
      type: Boolean,
      required: false,
      default: true,
    },

    conversation: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PackageMessage",
        required: false,
      },
    ],

    status: {
      type: String,
      default: "New",
      required: false,
    },

    message: {
      type: String,
      default: "N/A",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const packageModel = mongoose.model("Package", packageSchema);

module.exports = packageModel;
