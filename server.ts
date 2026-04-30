import { WebSocketServer, WebSocket, RawData } from "ws";

interface CustomSocket extends WebSocket {
  roomId?: string;
  userName?: string;
}

interface Room {
  sockets: Set<CustomSocket>;
  users: string[];
}

const wss = new WebSocketServer({ port: 8080 });
const roomMap = new Map<string, Room>();

wss.on("connection", (socket: CustomSocket) => {
  socket.on("message", (data: RawData) => {
    try {
      const messageString = data.toString();
      const parsed = JSON.parse(messageString);
      const { type, payload } = parsed;

      if (type === "join") {
        const { roomId, name } = payload;
        socket.roomId = roomId;
        socket.userName = name;

        if (!roomMap.has(roomId)) {
          roomMap.set(roomId, {
            sockets: new Set(),
            users: []
          });
        }

        const room = roomMap.get(roomId)!;
        room.sockets.add(socket);
        
        if (!room.users.includes(name)) {
          room.users.push(name);
        }

        broadcastToRoom(roomId, {
          type: "system",
          payload: {
            message: `${name} joined the protocol`,
            count: room.sockets.size,
            users: room.users
          }
        });
      }

      if (type === "chat") {
        const roomId = socket.roomId;
        if (roomId) {
          broadcastToRoom(roomId, {
            type: "chat",
            payload: {
              name: socket.userName,
              message: payload.message,
              time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
          });
        }
      }
    } catch (err) {
      console.error(err);
    }
  });

  socket.on("close", () => {
    const { roomId, userName } = socket;

    if (roomId && roomMap.has(roomId)) {
      const room = roomMap.get(roomId)!;
      room.sockets.delete(socket);
      room.users = room.users.filter(u => u !== userName);

      if (room.sockets.size === 0) {
        roomMap.delete(roomId);
      } else {
        broadcastToRoom(roomId, {
          type: "system",
          payload: {
            message: `${userName} left the protocol`,
            count: room.sockets.size,
            users: room.users
          }
        });
      }
    }
  });
});

function broadcastToRoom(roomId: string, data: object) {
  const room = roomMap.get(roomId);
  if (!room) return;

  const serializedData = JSON.stringify(data);
  room.sockets.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(serializedData);
    }
  });
}