import { generateRoomCode } from "./codeGenerator.js";
import { prisma } from "../../lib/prisma.js";

export async function createUniqueRoomCode() {
  let isUnique = false;
  let code = "";

  while (!isUnique) {
    code = generateRoomCode(6);
    const existingRoom = await prisma.room.findUnique({
      where: { code: code }
    });

    if (!existingRoom) {
      isUnique = true;
    }
  }
  return code;
}