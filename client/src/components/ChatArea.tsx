import { Send, LogOut, Copy, Hash } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import ChatBubble from "./ChatBubble";

export default function ChatArea({
  roomId,
  name,
  onLeave,
}: {
  roomId: string;
  name: string;
  onLeave: () => void;
}) {
  const [currentActive, setCurrentActive] = useState(0);
  const [usersList, setUsersList] = useState<string[]>([]);
  const [userMessage, setUserMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const socketRef = useRef<WebSocket | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socketRef.current = socket;

    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          type: "join",
          payload: { roomId, name },
        })
      );
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "system") {
        setCurrentActive(data.payload.count);
        setUsersList(data.payload.users || []);
      }
      if (data.type === "chat") {
        setMessages((prev) => [...prev, data.payload]);
      }
    };

    return () => socket.close();
  }, [roomId, name]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userMessage.trim() || !socketRef.current) return;

    socketRef.current.send(
      JSON.stringify({
        type: "chat",
        payload: { message: userMessage },
      })
    );

    setUserMessage("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleInviteCopy = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      showToast("Code copied to clipboard", "success");
    } catch (err) {
      showToast("Failed to copy code", "error");
    }
  };

  return (
    <div className="flex h-screen w-full bg-black text-white font-sans overflow-hidden relative">
      <div
        className={`fixed bottom-8 right-8 z-50 transition-all duration-500 transform ${
          toast.show ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`bg-zinc-900 border ${
            toast.type === "success" ? "border-green-500/50" : "border-red-500/50"
          } p-4 rounded-2xl shadow-2xl flex items-center gap-3 min-w-[320px] backdrop-blur-xl`}
        >
          <div className="flex-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-0.5">
              {toast.type === "success" ? "System Ready" : "System Halt"}
            </p>
            <p className="text-sm font-medium text-zinc-200">{toast.message}</p>
          </div>
        </div>
      </div>

      <aside className="hidden md:flex w-72 flex-col border-r border-zinc-900 bg-zinc-950/50 backdrop-blur-xl">
        <div className="p-6 border-b border-zinc-900 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-500 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.3)]">
            <Hash className="w-6 h-6 text-black font-bold" />
          </div>
          <div>
            <h2 className="font-black tracking-tight text-sm">ROOM ID</h2>
            <p className="text-green-500 font-mono text-xs uppercase tracking-widest">
              {roomId}
            </p>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4 px-2">
            Active Now — {currentActive}
          </div>
          {usersList.map((user) => (
            <div
              key={user}
              className="flex items-center gap-3 p-3 rounded-2xl hover:bg-white/5 transition-colors group cursor-default"
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center text-[10px] font-bold">
                  {user[0].toUpperCase()}
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-black rounded-full" />
              </div>
              <span className={`text-sm font-medium ${user === name ? "text-green-500" : "text-zinc-300"}`}>
                {user} {user === name && "(You)"}
              </span>
            </div>
          ))}
        </div>

        <div className="p-4 border-t border-zinc-900">
          <button
            onClick={onLeave}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-500 text-xs font-bold transition-all uppercase tracking-widest"
          >
            <LogOut className="w-4 h-4" />
            Leave Room
          </button>
        </div>
      </aside>

      <section className="flex-1 flex flex-col relative">
        <header className="h-20 border-b border-zinc-900 flex items-center justify-between px-8 bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="md:hidden w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
              <Hash className="w-5 h-5 text-black" />
            </div>
            <h1 className="text-lg font-bold tracking-tight">Main Channel</h1>
          </div>
          <button
            onClick={handleInviteCopy}
            className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 px-4 py-2 rounded-xl text-xs font-bold transition-all active:scale-95"
          >
            <Copy className="w-3.5 h-3.5 text-green-500" />
            Invite Code
          </button>
        </header>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 scroll-smooth">
          {messages.map((msg, index) => (
            <ChatBubble
              key={index}
              sender={msg.name}
              message={msg.message}
              time={msg.time}
              isSelf={msg.name === name}
            />
          ))}
        </div>

        <footer className="p-6 md:p-10 bg-linear-to-t from-black to-transparent">
          <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto relative flex items-end gap-3">
            <textarea
              ref={textareaRef}
              rows={1}
              value={userMessage}
              onChange={(e) => {
                setUserMessage(e.target.value);
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage(e);
                }
              }}
              placeholder={`Message as ${name}...`}
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-2xl py-4 px-6 text-white placeholder:text-zinc-600 focus:outline-none focus:border-green-500/50 transition-all shadow-2xl resize-none overflow-hidden min-h-15 max-h-50"
            />
            <button
              type="submit"
              className="bg-white hover:bg-green-500 text-black p-4 rounded-2xl transition-all active:scale-95 group mb-1"
            >
              <Send className="w-6 h-6 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </form>
        </footer>
      </section>
    </div>
  );
}