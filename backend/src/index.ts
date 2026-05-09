import express from "express";
import { authRouter } from "./routes/authRoutes.js";

const app=express();

app.use(express.json());

app.use("/auth",authRouter);

app.listen(3000);