import { useState } from "react";

export default function ChatArea() {
  const [message, setMessage] = useState("");

  const handleSend = async () =>{
    
  }

  return (
    <div>
      <div className="w-full text-center font-bold text-3xl text-white tracking-wide mb-4">
        ChatX
      </div>

      <div className="relative bg-zinc-900/60 backdrop-blur-lg border border-white/10 overflow-y-scroll scrollbar-hide h-125 w-62.5 md:h-125 md:w-150 lg:h-125 lg:w-225 rounded-2xl text-white shadow-2xl">
        <div className="sticky top-0 z-10 flex justify-between items-center px-6 py-3 bg-black/20 border-b border-white/5 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-sm font-medium text-zinc-400">Room ID:</span>
            <span className="text-sm font-mono font-bold text-white tracking-widest">
              123456
            </span>
          </div>
          <button className="text-xs text-zinc-500 hover:text-white transition-colors">
            Copy Link
          </button>
        </div>

        <div className="p-4 h-[calc(100%-110px)]">
          {/* Messages will go here */}
        </div>

        <div className="absolute bottom-0 left-0 right-0 flex items-end gap-2 px-3 py-3 bg-black/40 backdrop-blur-md border-t border-white/10 rounded-b-2xl">
          <textarea
            value={message}
            className="flex-1 min-w-0 resize-none h-10 scrollbar-hide bg-zinc-800/80 text-white px-4 py-2 rounded-3xl focus:outline-none focus:ring-2 focus:ring-green-500/70"
            placeholder="Enter message..."
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={handleSend} className="shrink-0 h-10 bg-green-500 text-black font-semibold px-4 py-2 rounded-full cursor-pointer hover:bg-green-600 active:scale-95 transition-all">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
