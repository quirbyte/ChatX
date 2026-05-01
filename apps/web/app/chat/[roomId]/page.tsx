"use client";
import { TextInput } from "@repo/ui/text-input";
import {useState} from "react";

export default function () {
    const [input,setInput]=useState("");
    return <div style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column"
    }}>
        <div>
            Chat Room
        </div>
        <div>
            <TextInput onChange={(e)=>setInput(e.target.value)} size="big" placeholder="Chat Here" />
        </div>
    </div>
}