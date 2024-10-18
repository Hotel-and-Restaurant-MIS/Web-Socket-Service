import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  path: "/ws",
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("customerHelpAlert", (data) => {
    io.emit("readHelpRequest", data);
  });

  socket.on("newOrderAdded", (data) => {
    io.emit("readAddedNewOrder", data);
  });

});

server.listen(5500, () => {
  console.log("server running at port 5500");
});
