import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const response = NextResponse.json({ msg: "Logged out successfully" });
  response.cookies.delete("token");
  return response;
}
