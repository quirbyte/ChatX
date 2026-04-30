import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { roomCode } = body;
    if (!roomCode) {
      return NextResponse.json(
        {
          msg: "Room Code Not Found",
        },
        {
          status: 404,
        },
      );
    }
    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json(
        {
          msg: "User not Found",
        },
        {
          status: 404,
        },
      );
    }
    const res = await prisma.room.update({
      data: {
        members: {
          disconnect: {
            id: userId,
          },
        },
      },
      where: {
        id: roomCode,
      },
    });
    return NextResponse.json({
      msg: "Left Room successfully!",
    });
  } catch (e) {
    return NextResponse.json(
      {
        msg: "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}
