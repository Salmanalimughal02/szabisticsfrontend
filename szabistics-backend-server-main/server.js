const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cron = require("node-cron");
const dotenv = require("dotenv").config({
  path: "./configs/environments.env",
});

const app = express();

const ServerErrorResponse = require("./utils/classes/ServerErrorResponse");

const { connectDB } = require("./configs/DBConnection");
const { connectSocketIo } = require("./socket-io/SocketIOHandler");

const mongoose = require("mongoose");
const morgan = require("morgan");

const cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json({ limit: "50mb" }));

app.use(
  express.urlencoded({ extended: false, limit: "50mb", parameterLimit: 50000 })
);

app.use(morgan("dev"));

const allRoutes = require("./routes/AllRoutes");

app.use("/api", allRoutes);

const PORT = process.env.PORT || 8080;

app.all("*", (req, res, next) =>
  next(
    res.status(404).json(
      ServerErrorResponse.customError(
        "Failed",
        404,
        `can't find ${req.originalUrl} on this server`,
        {
          metadata: {
            method: req.method,
          },
        }
      )
    )
  )
);

const server = http.createServer(app);

// const io = socketIO(server);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

server.listen(PORT, (err) => {
  if (err) {
    console.log("Error While Starting Szabistics Server: ", err);
  } else {
    console.log(
      `Szabistics Server Is Listening on PORT: ${PORT} - Server ID: ${process.pid}`
    );

    connectDB();
    connectSocketIo(io);
  }
});
