import { WebSocketServer } from "ws";

const ws = new WebSocketServer({port:3002});

ws.on("connection",(socket)=>{
    socket.send("Hello");
})