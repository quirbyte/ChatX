import { Request, Response, Router } from "express";
import { authenticator } from "@otplib/preset-default";
import QRCode from "qrcode";
import { prisma } from "../../lib/prisma.js";

export const authRouter = Router();

authRouter.post("/verify", async (req: Request, res: Response) => {
  const { email, username } = req.body;
  try {
    const secret = authenticator.generateSecret();
    const otpauth = authenticator.keyuri(email, "ChatX", secret);
    const qrCodeUrl = await QRCode.toDataURL(otpauth);

    await prisma.user.upsert({
      where: { email },
      update: { otpSecret: secret, username },
      create: { email, username, otpSecret: secret },
    });

    res.json({ qrCode: qrCodeUrl });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

authRouter.post("/verify", async (req: Request, res: Response) => {
  const { email, token } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.otpSecret) {
      return res
        .status(404)
        .json({ error: "User not found or 2FA not set up" });
    }

    const isValid = authenticator.verify({
      token,
      secret: user.otpSecret,
    });

    if (!isValid) {
      return res.status(401).json({ error: "Invalid OTP" });
    }

    await prisma.user.update({
      where: { email },
      data: { verified: true },
    });

    res.json({ message: "Verification successful", verified: true });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});