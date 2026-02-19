const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

let data = { yes: 0, no: 0 };

io.on("connection", (socket) => {
  console.log("User connected");

  socket.emit("update", data);

  socket.on("vote", (type) => {
    if (type === "yes") data.yes++;
    if (type === "no") data.no++;

    io.emit("update", data);
  });
});

server.listen(5000, () => {
  console.log("Server running on 5000");
});
