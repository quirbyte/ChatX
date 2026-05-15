import { Request, Response, Router } from "express";
import { authenticator } from "@otplib/preset-default";
import QRCode from "qrcode";
import jwt from "jsonwebtoken";
import { prisma } from "../../lib/prisma.js";

export const authRouter = Router();

authRouter.post("/signup", async (req: Request, res: Response) => {
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

authRouter.post("/signin", async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(404).json({
        error: "User with given email does not exist",
      });
    }

    if (!user.otpSecret) {
      return res
        .status(400)
        .json({
          error: "2FA not configured for this account. Please sign up again.",
        });
    }

    const otpauth = authenticator.keyuri(user.email, "ChatX", user.otpSecret);
    const qrCodeUrl = await QRCode.toDataURL(otpauth);

    return res.json({
      qrCode: qrCodeUrl,
    });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

authRouter.post("/verify", async (req: Request, res: Response) => {
  const { email, token } = req.body;
  const JWT_SECRET = process.env.JWT_SECRET || "your_super_secret_key";

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

    const authToken = jwt.sign(
      {
        userId: user.id,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      message: "Verification successful",
      token: authToken,
      user: { username: user.username, email: user.email, id: user.id },
    });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
