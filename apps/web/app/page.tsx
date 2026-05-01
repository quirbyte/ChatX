"use client";
import { useState } from "react";
import { TextInput } from "@repo/ui/text-input";
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";
export default function Home() {
  const [input, setInput] = useState("");
  const router = useRouter();
  return (
    <div style={{
      height: "100vh",
      width: "100vw",
      background: "black",
      display: "flex",
      justifyContent: "center",
      justifyItems: "center"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column"
      }}>
        <TextInput onChange={(e) => setInput(e.target.value)} size="small" placeholder="Room name"></TextInput>
        <Button onClick={()=>{
          router.push(`/chat/${input}`)
        }} children={"Join Room"} />
      </div>
    </div>
  );
} 