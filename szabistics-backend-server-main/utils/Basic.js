const { orderStatusTypes, paymentStatusTypes } = require("../constants/Basic");

const generateRandomUsername = () => {
  const charset =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";

  let length = 10;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }

  return password;
};

const removePassword = (data) => {
  var updatedData = { ...data };
  delete data["password"];
  return updatedData;
};

const generateOtp = () => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  return otp;
};

function comparePrices(currentPrice, givenPrice) {
  const result = {
    success: false,
    update: "",
  };

  if (currentPrice === givenPrice) {
    result.success = false;
    result.update = "NEUTRAL";
  } else if (currentPrice > givenPrice) {
    result.success = true;
    result.update = "INCREMENTED";
  } else {
    result.success = true;
    result.update = "DECREMENTED";
  }

  return result;
}

function checkOrderType(inputString) {
  for (const key in orderStatusTypes) {
    if (orderStatusTypes[key] === inputString) {
      return orderStatusTypes[key];
    }
  }

  return inputString;
}

function checkPaymentType(inputString) {
  for (const key in paymentStatusTypes) {
    if (paymentStatusTypes[key] === inputString) {
      return paymentStatusTypes[key];
    }
  }

  return inputString;
}
function isSellerIdAvailable(arr, sellerId) {
  for (let i = 0; i < arr.length; i++) {
    console.log("vendor function: ", arr[i].seller.toString(), sellerId);

    if (arr[i].seller.toString() !== sellerId.toString()) {
      console.log("here");
      return true; // Vendor ID found
    }
  }
  return false; // Vendor ID not found
}

module.exports = {
  generateRandomUsername,
  removePassword,
  generateOtp,
  comparePrices,
  checkPaymentType,
  checkOrderType,
  isSellerIdAvailable,
};
