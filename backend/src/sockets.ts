import WebSocket, { WebSocketServer } from "ws";
import { Server } from "http";
import { prisma } from "../lib/prisma.js";

const roomMap = new Map<string, Set<WebSocket>>();

export function initSocketServer(httpserver: Server) {
  const wss = new WebSocketServer({ server: httpserver });

  wss.on("connection", (socket: WebSocket) => {
    socket.on("message", async (data) => {
      try {
        const parsedData = JSON.parse(data.toString());
        const { type, roomId, userId, content } = parsedData;

        if (type === "JOIN") {
          const membership = await prisma.room.findFirst({
            where: { id: roomId, users: { some: { id: userId } } },
          });

          if (membership) {
            roomMap.forEach((set) => set.delete(socket));

            if (!roomMap.has(roomId)) {
              roomMap.set(roomId, new Set());
            }
            roomMap.get(roomId)?.add(socket);
          } else {
            socket.send(
              JSON.stringify({
                type: "ERROR",
                message: "Not a member of this room",
              }),
            );
          }
        } else if (type === "CHAT") {
          if (!userId || !roomId || !content) return;

          try {
            const newMessage = await prisma.message.create({
              data: {
                msgType: "CHAT",
                content,
                room: { connect: { id: roomId } },
                sender: { connect: { id: userId } },
              },
              include: {
                sender: { select: { username: true } },
              },
            });

            const targets = roomMap.get(roomId);
            targets?.forEach((client) => {
              if (client.readyState === WebSocket.OPEN) {
                client.send(
                  JSON.stringify({
                    type: "NEW_MESSAGE",
                    payload: newMessage,
                  }),
                );
              }
            });

            prisma.message
              .count({ where: { roomId } })
              .then(async (count) => {
                if (count > 15) {
                  const oldMessages = await prisma.message.findMany({
                    where: { roomId },
                    orderBy: { createdAt: "asc" },
                    take: count - 15,
                    select: { id: true },
                  });
                  await prisma.message.deleteMany({
                    where: { id: { in: oldMessages.map((m) => m.id) } },
                  });
                }
              })
              .catch((e) => console.error("Cleanup error:", e));
          } catch (err) {
            console.error("Database Error during CHAT:", err);
          }
        }
      } catch (err) {
        console.error("WS Parsing Error:", err);
      }
    });

    socket.on("close", () => {
      roomMap.forEach((set) => set.delete(socket));
    });
  });
}
