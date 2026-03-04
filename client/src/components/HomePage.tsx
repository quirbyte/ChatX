import {
  DoorOpen,
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { useState } from "react";

const roomArray = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "J",
  "K",
  "M",
  "N",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
];

const getRoomCode = () => {
  let roomId = "";
  const randomValues = new Uint32Array(6);
  window.crypto.getRandomValues(randomValues);
  for (let i = 0; i < 6; i++) {
    roomId += roomArray[randomValues[i] % roomArray.length];
  }
  return roomId;
};

export default function HomePage({
  onJoin,
}: {
  onJoin: (id: string, name: string) => void;
}) {
  const [name, setName] = useState<string>("");
  const [roomId, setRoomId] = useState<string>("");
  const [toast, setToast] = useState<{
    message: string;
    show: boolean;
    type: "success" | "error";
  }>({
    message: "",
    show: false,
    type: "error",
  });

  const showToast = (msg: string, type: "success" | "error" = "error") => {
    setToast({ message: msg, show: true, type });
    setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 4000);
  };

  const handleCreateRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim())
      return showToast("Please enter a display name first.", "error");
    const generatedId = getRoomCode();
    setRoomId(generatedId);
    showToast("Secure room generated!", "success");
    setTimeout(() => onJoin(generatedId, name), 800);
  };

  const handleJoinRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !roomId.trim())
      return showToast("Name and Room ID required.", "error");
    onJoin(roomId, name);
  };

  return (
    <main className="min-h-screen w-full flex flex-col md:flex-row bg-black text-white relative overflow-hidden">
      <div
        className={`fixed bottom-8 right-8 z-50 transition-all duration-500 transform ${toast.show ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0 pointer-events-none"}`}
      >
        <div
          className={`bg-zinc-900 border ${toast.type === "success" ? "border-green-500/50" : "border-red-500/50"} p-4 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[320px]`}
        >
          <div
            className={`${toast.type === "success" ? "bg-green-500/20" : "bg-red-500/20"} p-2 rounded-xl`}
          >
            {toast.type === "success" ? (
              <CheckCircle2 className="w-5 h-5 text-green-500" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500" />
            )}
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">
              {toast.type === "success" ? "System Ready" : "System Halt"}
            </p>
            <p className="text-sm font-medium text-zinc-200">{toast.message}</p>
          </div>
        </div>
      </div>
      <section className="flex-1 flex flex-col justify-center px-8 md:px-20 py-12 z-10">
        <div className="max-w-md w-full mx-auto md:mx-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 mb-10">
            <Sparkles className="w-3.5 h-3.5 text-green-500" />
            <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">
              v1.0 Protocol
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">
            Chat <span className="text-green-500">X</span>
          </h1>
          <div className="space-y-5">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Display Name"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-5 px-6 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all"
            />
            <button
              className="w-full bg-white hover:bg-zinc-200 text-black font-black py-5 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-3"
              onClick={handleCreateRoom}
            >
              <DoorOpen className="w-6 h-6" /> CREATE SECURE ROOM
            </button>
            <div className="relative">
              <input
                type="text"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value.toUpperCase())}
                placeholder="Paste room code here..."
                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-2xl py-5 px-6 text-green-400 font-mono tracking-widest focus:outline-none focus:border-green-500/50"
              />
              <button
                onClick={handleJoinRoom}
                className="absolute right-3 top-3 bottom-3 bg-zinc-800 hover:bg-green-500 hover:text-black text-zinc-400 px-4 rounded-xl transition-all"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="hidden md:block flex-1 relative border-l border-zinc-900">
        <img
          src="/cat.jpg"
          alt="Workspace"
          className="h-full w-full object-cover grayscale-[0.2]"
        />
      </section>
    </main>
  );
}
