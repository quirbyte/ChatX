import { Request, Response, Router } from "express";
import { prisma } from "../../lib/prisma.js";
import { UserMiddleware } from "../middleware/userMiddleware.js";
import { createUniqueRoomCode } from "../utils/codeChecker.js";

export const roomRouter = Router();

roomRouter.get("/", UserMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { rooms: true },
    });
    return res.json({
      userRooms: user?.rooms || [],
    });
  } catch {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

roomRouter.post(
  "/create",
  UserMiddleware,
  async (req: Request, res: Response) => {
    try {
      const userId = req.userId;
      const roomCode = await createUniqueRoomCode();
      const password = req.body.password;
      const name = req.body.name;
      if (!name || !password) {
        return res.status(400).json({
          error: "Name or password not given",
        });
      }
      const room = await prisma.room.create({
        data: {
          code: roomCode,
          name,
          password,
          users: {
            connect: { id: userId },
          },
        },
      });
      return res.json({
        roomId: room.id,
        code: room.code,
      });
    } catch {
      return res.status(500).json({
        error: "Internal server error",
      });
    }
  },
);

roomRouter.put("/join", UserMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const roomCode = req.body.code;
    const password = req.body.password;
    if (!roomCode || !password) {
      return res.status(404).json({
        error: "Room code or password missing",
      });
    }
    const room = await prisma.room.findUnique({
      where: {
        code: roomCode,
      },
    });
    if (room?.password !== password) {
      return res.status(401).json({
        error: "Incorrect Password..",
      });
    }
    await prisma.room.update({
      where: {
        code: roomCode,
      },
      data: {
        users: {
          connect: { id: userId },
        },
      },
    });
    return res.json({
      msg: "Joined room successfully",
    });
  } catch (err: any) {
    if (err.code === "P2025") {
      return res.status(404).json({ error: "Room not found" });
    }
    return res.status(500).json({
      error: "Internal server error",
    });
  }
});

roomRouter.delete("/leave", UserMiddleware, async (req: Request, res: Response) => {
  try {
    const userId = req.userId;
    const { code } = req.body;

    const updatedRoom = await prisma.room.update({
      where: { code },
      data: {
        users: { disconnect: { id: userId } }
      },
      include: { _count: { select: { users: true } } }
    });

    if (updatedRoom._count.users === 0) {
      await prisma.room.delete({ where: { id: updatedRoom.id } });
    }

    return res.json({ msg: "Left room" });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: "Transaction failed or Room not found" });
  }
});