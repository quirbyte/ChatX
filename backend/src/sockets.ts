import { WebSocketServer } from "ws";
import { prisma } from "../lib/prisma.js";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection",(socket:WebSocket)=>{
    socket.on("message", ()=>{
        
    })
})