import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  roomId: string;
}

let allUsers: User[] = [];

wss.on("connection", (socket) => {
  socket.on("message", (message) => {
    try {
      const parsedMessage = JSON.parse(message as unknown as string);
      if (parsedMessage.type === "join") {
        allUsers.push({
          socket,
          roomId: parsedMessage.payload.roomId,
        });
      } else if (parsedMessage.type === "chat") {
        let currentUser = allUsers.find((x) => x.socket === socket);
        if (!currentUser) return;
        for (const user of allUsers) {
          if (user.roomId === currentUser.roomId) {
            user.socket.send(parsedMessage.payload.message);
          }
        }
      }
    } catch (e) {
      console.log("Invalid JSON");
    }
  });
  socket.on("close", () => {
    allUsers = allUsers.filter((x) => x.socket !== socket);
  });
});
