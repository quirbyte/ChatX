import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { prisma } from "@/lib/prisma";

const requiredRoom = z.object({
  name: z.string(),
});

export async function POST(req: NextRequest) {
  try {
    const userId = req.headers.get("x-user-id");

    if (!userId) {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    const result = requiredRoom.safeParse(body);
    if (!result.success) {
      return NextResponse.json({ msg: result.error }, { status: 400 });
    }

    const { name } = result.data;

    if (!name.trim()) {
      return NextResponse.json({ msg: "Invalid Room Name" }, { status: 400 });
    }

    const room = await prisma.room.create({
      data: {
        name,
        members: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return NextResponse.json({
      msg: "Room created",
      room,
    });

  } catch (e) {
    return NextResponse.json(
      { msg: "Internal Server Error!" },
      { status: 500 }
    );
  }
}