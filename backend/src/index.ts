import express, { Request, Response } from "express";

const app = express();

app.get("/",(req:Request,res:Response)=>{
    res.end("Hello");
})

app.listen(3000);