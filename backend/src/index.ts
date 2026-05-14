import express from "express";
import cors from "cors";
import { initSocketServer } from "./sockets.js";
import { createServer } from "http";
import { authRouter } from "./routes/authRoutes.js";
import { roomRouter } from "./routes/roomRoutes.js";

const app=express();
const httpServer = createServer(app);

app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use(express.json());

app.use("/auth",authRouter);
app.use("/room",roomRouter);

initSocketServer(httpServer);

const PORT = 3000;
httpServer.listen(PORT,()=>{
    console.log("Express server listening at http://localhost:3000");
    console.log("Websockets server listening at ws://localhost:3000");
});