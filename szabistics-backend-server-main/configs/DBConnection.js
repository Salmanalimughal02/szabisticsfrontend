const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    mongoose
      .connect(process.env.MONGO_DB_URI)
      .then((onConnect) => {
        console.log("Szabistics Database Connection Established.");
      })
      .catch((onConnectError) => {
        console.log(
          "Szabistics Database Connection NOT Established. ",
          onConnectError
        );
      });
  } catch (error) {
    console.log("Error while connecting to Szabistics database: ", error);
  }
};

module.exports = {
  connectDB,
};
