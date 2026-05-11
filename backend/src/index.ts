import express from "express";
import cors from "cors";
import { authRouter } from "./routes/authRoutes.js";

const app=express();

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

app.use("/auth",authRouter);

app.listen(3000);