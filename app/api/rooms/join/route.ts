import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { roomCode } = await req.json();
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
    const room = await prisma.room.findUnique({
      where: {
        id: roomCode,
      },
    });
    if (!room) {
      return NextResponse.json(
        {
          msg: "Room Not Found",
        },
        {
          status: 404,
        },
      );
    }
    const userId = req.headers.get("x-user-id");
    if(!userId){
        return NextResponse.json({
            msg : "User not Found"
        },{
            status : 404
        })
    }
    await prisma.room.update({
        data : {
            members : {
                connect : {
                    id : userId
                }
            }
        },
        where : {
            id : roomCode
        }
    })
    return NextResponse.json({
        msg : "Joined Room Successfully!!"
    })
  } catch {
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
