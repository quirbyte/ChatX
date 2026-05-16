import { createRequire } from "module";
const require = createRequire(import.meta.url);

const { PrismaClient } = require("../generated/prisma/index.js");

import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not defined in .env file");
}

const pool = new pg.Pool({ connectionString });
const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as any;
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;