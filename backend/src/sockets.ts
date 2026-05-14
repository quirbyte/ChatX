import WebSocket, { WebSocketServer } from "ws";
import { Server } from "http";

export function initSocketServer(httpserver: Server) {
  const wss = new WebSocketServer({ server: httpserver });

  wss.on("connection", (socket: WebSocket) => {
    console.log("Client connected");
    socket.on("message", async (data) => {
      console.log(JSON.parse(data.toString()));
    });

    socket.on("close", () => {
      console.log("Client disconnected");
    });
  });
}
