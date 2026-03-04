import { useState } from "react";
import ChatArea from "./components/ChatArea";
import HomePage from "./components/HomePage";

export default function App() {
  const [roomId, setRoomId] = useState<string>(() => {
    return localStorage.getItem("chat_roomId") || "";
  });

  const [name, setName] = useState<string>(() => {
    return localStorage.getItem("chat_name") || "";
  });

  const [joined, setJoined] = useState<boolean>(() => {
    return !!(
      localStorage.getItem("chat_roomId") && localStorage.getItem("chat_name")
    );
  });

  const handleJoin = (id: string, user: string) => {
    localStorage.setItem("chat_roomId", id);
    localStorage.setItem("chat_name", user);
    setRoomId(id);
    setName(user);
    setJoined(true);
  };

  const handleLeave = () => {
    localStorage.removeItem("chat_roomId");
    localStorage.removeItem("chat_name");
    setJoined(false);
    setRoomId("");
    setName("");
  };

  return (
    <div className="bg-black text-white h-screen w-screen flex justify-center items-center">
      {joined ? (
        <ChatArea roomId={roomId} name={name} onLeave={handleLeave} />
      ) : (
        <HomePage onJoin={handleJoin} />
      )}
    </div>
  );
}
