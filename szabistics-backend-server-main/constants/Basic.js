const roles = ["DRIVER", "OWNER", "SUPER_ADMIN"];

const paymentStatusTypes = {
  NOT_PAID: "NOT-PAID",
  PAID: "PAID",
  UPLOADED: "UPLOADED",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
};

const orderStatusTypes = {
  PLACED: "PLACED",
  IN_PROCESS: "IN_PROCESS",
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
};

const bidStatusTypes = {
  PLACED: "PLACED",
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
};

const bidStatusTypesEnum = ["PLACED", "ACCEPTED", "REJECTED"];

var orderStatusTypesArray = [
  {
    title: "Placed",
    value: orderStatusTypes.PLACED,
  },
  {
    title: "Pending",
    value: orderStatusTypes.PENDING,
  },
  {
    title: "In Process",
    value: orderStatusTypes.IN_PROCESS,
  },
  {
    title: "Completed",
    value: orderStatusTypes.COMPLETED,
  },
];

var paymentStatusTypesArray = [
  {
    title: "Paid",
    value: paymentStatusTypes.PAID,
  },
  {
    title: "Not Paid",
    value: paymentStatusTypes.NOT_PAID,
  },
];

const folderNames = {
  PROFILES: "profiles",
  CNIC: "cnic-images",
  PACKAGE: "packages",
  PAYMENT_EVIDENCES: "payment-evidences",
};

const bankingDetails = {
  accountNo: "1234567890123456",
  accountTitle: "Szabistics",
  iban: "GB33BUKB20201555555555",
  bankName: "United Bank Ltd",
};

module.exports = {
  bidStatusTypes,
  orderStatusTypes,
  orderStatusTypesArray,
  paymentStatusTypes,
  paymentStatusTypesArray,
  roles,
  folderNames,
  bidStatusTypesEnum,
  bankingDetails,
};
