import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginBody = z.object({
  email: z.string().email().min(10),
  password: z.string().min(6),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { success, error } = loginBody.safeParse(body);
    if (!success) {
      return NextResponse.json(
        {
          msg: "Failed to login",
        },
        {
          status: 400,
        },
      );
    }
    const { email, password } = body;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return NextResponse.json(
        {
          msg: "User not found!!",
        },
        {
          status: 404,
        },
      );
    }
    const passwordMatched = await bcrypt.compare(password, user?.password);
    if (!passwordMatched) {
      return NextResponse.json(
        {
          msg: "Unauthorized Access!!",
        },
        {
          status: 401,
        },
      );
    }
    const token = jwt.sign(
      {
        id: user?.id,
        email,
      },
      `${process.env.JWT_SECRET}`,
    );
    const response = NextResponse.json({
      msg: "Logged in successfully",
    });
    response.cookies.set("token", token, {
        httpOnly: true
    });
    return response;
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
