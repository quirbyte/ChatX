"use client";
import ChatBubble from "@/components/chatbubble";
import { MyChatBubble } from "@/components/chatbubble";
import Groupbar from "@/components/groupbar";
import JoinDialog from "@/components/joinDialog";
import { CopyIcon } from "lucide-react";
import { SendIcon } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [joinRoomCode, setJoinRoomCode] = useState("");

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });
    alert("You have been logged out succesfully");
    window.location.href = "/login";
  };

  const handleCreateRoom = async () => {
    try {
      const res = await fetch("/api/rooms/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: roomName,
        }),
      });
      if (res.ok) {
        alert("Created Room successfully!");
        handleCloseDialog();
      } else {
        const data = await res.json();
        alert(data.msg);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleJoinRoom = async () => {
    try {
      const res = await fetch("/api/rooms/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomCode: joinRoomCode,
        }),
      });
      if (res.ok) {
        alert("Joined Room successfully");
        handleCloseDialog();
      } else {
        const data = await res.json();
        alert(data.msg);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="absolute h-screen w-screen flex items-center justify-center">
      <div className="bg-blue-200 h-[90%] w-[90%] rounded-2xl flex">
        <div className="relative bg-blue-400 w-[30%] overflow-y-auto no-scrollbar  h-full rounded-l-2xl pt-5 flex flex-col gap-4 items-center">
          <div className="relative bg-blue-400 w-full overflow-y-auto no-scrollbar  h-full rounded-l-2xl pt-5 flex flex-col gap-4 items-center">
            <Groupbar title="Group 1" />
            <Groupbar title="BEFGERF" />
            <Groupbar title="HJ5YGERFWEF" />
            <Groupbar title="TH4EGWFWEF" />
            <Groupbar title="HWFFWFFF" />
            <Groupbar title="HWFFWFFF" />
            <Groupbar title="HWFFWFFF" />
            <Groupbar title="HWFFWFFF" />
            <Groupbar title="HWFFWFFF" />
            <Groupbar title="HWFFWFFF" />
            <Groupbar title="HWFFWFFF" />
            <Groupbar title="HWFFWFFF" />
          </div>
          <div
            onClick={() => setDialogOpen(true)}
            className="sticky cursor-default bottom-2 bg-white text-black font-bold text-center py-2 px-7 rounded-full"
          >
            Create / Join Room
          </div>
        </div>
        <div className="w-[70%] h-full relative">
          <div className="flex justify-between px-4 bg-blue-800 text-white rounded-tr-2xl p-3">
            <div className="flex gap-3">
              <div className="font-extrabold underline">ROOM CODE :</div>
              <div className="flex gap-2 items-center justify-center">
                <div>ABCDEF</div>
                <div className="text-zinc-500">
                  <CopyIcon size={12} />
                </div>
              </div>
            </div>
            <div className="bg-white text-red-600 font-bold px-2 rounded-full cursor-default">
              Leave Room
            </div>
          </div>
          <div className="p-4 flex flex-col gap-2.5 h-[calc(100%-48px-52px)] w-full overflow-y-auto no-scrollbar">
            <ChatBubble sender="Ranjan" msg="Hi everyone!" time="9:05 PM" />
            <ChatBubble sender="Ranjan" msg="Hi everyone!" time="10:05 PM" />
            <ChatBubble sender="Ranjan" msg="Hi everyone!" time="9:05 PM" />
            <MyChatBubble msg="Hello everyone" time="9:32 PM" />
            <ChatBubble sender="Ranjan" msg="Hi everyone!" time="10:05 PM" />
            <ChatBubble sender="Ranjan" msg="Hi everyone!" time="9:05 PM" />
            <ChatBubble sender="Ranjan" msg="Hi everyone!" time="10:05 PM" />
            <MyChatBubble msg="Hello everyone" time="9:32 PM" />
            <ChatBubble sender="Ranjan" msg="Hi everyone!" time="9:05 PM" />
            <ChatBubble sender="Ranjan" msg="Hi everyone!" time="10:05 PM" />
            <ChatBubble sender="Ranjan" msg="Hi everyone!" time="9:05 PM" />
            <MyChatBubble msg="Hello everyone" time="9:32 PM" />
            <ChatBubble sender="Ranjan" msg="Hi everyone!" time="10:05 PM" />
            <ChatBubble sender="Ranjan" msg="Hi everyone!" time="9:05 PM" />
            <ChatBubble sender="Ranjan" msg="Hi everyone!" time="10:05 PM" />
            <ChatBubble sender="Ranjan" msg="Hi everyone!" time="9:05 PM" />
            <MyChatBubble msg="Hello everyone" time="9:32 PM" />
            <ChatBubble sender="Ranjan" msg="Hi everyone!" time="10:05 PM" />
            <ChatBubble sender="Ranjan" msg="Hi everyone!" time="9:05 PM" />
            <ChatBubble sender="Ranjan" msg="Hi everyone!" time="10:05 PM" />
            <MyChatBubble msg="Hello everyone" time="9:32 PM" />
            <MyChatBubble msg="Hello everyone" time="9:32 PM" />
          </div>
          <textarea
            placeholder="Send a message..."
            className="absolute bottom-0 resize-none rounded-br-2xl bg-white h-12 w-full focus:outline-0 p-2 text-md"
          ></textarea>
          <div className="absolute right-4 bottom-3">
            <SendIcon size={20} />
          </div>
        </div>
      </div>
      <div
        onClick={handleLogout}
        className="absolute bottom-2 left-[6%] text-red-600 hover:text-red-300 cursor-default"
      >
        Log out
      </div>
      {dialogOpen && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
          <JoinDialog
            closeDialog={handleCloseDialog}
            createRoom={handleCreateRoom}
            setRoomName={setRoomName}
            joinRoom={handleJoinRoom}
            setJoinRoomCode={setJoinRoomCode}
          />
        </div>
      )}
    </div>
  );
}
