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

  socket.on("RequestCustomerHelp", (data) => {
    io.emit("readHelpRequest", data);
  });

  socket.on("newOrderAdded", (data) => {
    io.emit("readAddedNewOrder", data);
  });

  socket.on("orderStatusUpdated", (data) => {
    io.emit("readUpdatedOrderStatus", data);
  });

  socket.on("requestBill", (data) => {
    io.emit("readRequestBill", data);
  });

  socket.on("completeTablePayment", (data) => {
    io.emit("readPayment", data);
  });
});

server.listen(5500, () => {
  console.log("server running at port 5500");
});
