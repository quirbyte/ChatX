import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3002 });

wss.on("connection", (socket) => {
  socket.send("Server Connected");
});
