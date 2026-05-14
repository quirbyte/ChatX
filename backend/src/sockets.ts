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
            if (!roomMap.has(roomId)) roomMap.set(roomId, new Set());
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
          const result = await prisma.$transaction(async (tx) => {
            const newMessage = await tx.message.create({
              data: {
                msgType: type,
                content,
                roomId,
                senderId: userId,
              },
              include: {
                sender: { select: { username: true } },
              },
            });
            const roomMessages = await tx.message.findMany({
              where: { roomId },
              orderBy: { createdAt: "asc" },
              select: { id: true },
            });
            if (roomMessages.length > 15) {
              const messagesToDelete = roomMessages.slice(
                0,
                roomMessages.length - 15,
              );
              const idsToDelete = messagesToDelete.map((m) => m.id);
              await tx.message.deleteMany({
                where: {
                  id: { in: idsToDelete },
                },
              });
            }
            return newMessage;
          });
          const targets = roomMap.get(roomId);
          targets?.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(
                JSON.stringify({
                  type: "NEW_MESSAGE",
                  payload: result,
                }),
              );
            }
          });
        }
      } catch (err) {
        console.error("WS error:", err);
      }
    });

    socket.on("close", () => {
      roomMap.forEach((set) => set.delete(socket));
    });
  });
}
