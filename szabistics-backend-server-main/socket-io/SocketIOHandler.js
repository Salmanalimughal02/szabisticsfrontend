const connectSocketIo = (io) => {
  try {
    io.on("connection", (socket) => {
      console.log("A user connected", socket.id);

      socket.on("disconnect", () => {
        console.log("User disconnected");
      });
    });
  } catch (error) {
    console.log("error in starting socket: ", error);
  }
};

module.exports = {
  connectSocketIo,
};
