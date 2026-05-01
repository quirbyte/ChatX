import express from "express";

const app=express();

app.get("/signup",(req,res)=>{
    return res.send("Hi There");
})

app.get("/sigin",(req,res)=>{
    return res.send("Hi There");
})

app.get("/chat",(req,res)=>{
    return res.send("Hi There");
})

app.listen(3001);