import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import z from "zod";
import { prisma } from "@/lib/prisma";

const signupBody = z.object({
  username: z.string().min(6),
  email: z.string().email().min(10),
  password: z.string().min(6),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { success, error } = signupBody.safeParse(body);
  if (!success) {
    return NextResponse.json(
      {
        msg: "Failed to signup",
        error,
      },
      {
        status: 400,
      },
    );
  }
  const { username, email, password } = body;
  try {
    const existing_user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (existing_user) {
      return NextResponse.json(
        {
          msg: "User already exists!",
        },
        {
          status: 409,
        },
      );
    }
    const hashed_password = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        username,
        email,
        password: hashed_password,
      },
    });
    return NextResponse.json({
      msg: "Successfully signed up",
    });
  } catch (err) {
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
