const SocketIO = require("socket.io");

module.exports = (server) => {
  const io = SocketIO(server, { path: "/socket.io" });

  io.on("connection", (socket) => {
    const req = socket.request;
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log("New client connected", ip, socket.id, req.id);
    socket.on("disconnect", () => {
      console.log("Disconnected the client", ip, socket.id);
      clearInterval(ws.interval);
    });
    socket.on("error", (error) => {
      console.error(error);
    });
    socket.on("reply", (data) => {
      console.log(data);
    });
  });
};
