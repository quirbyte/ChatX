interface ChatBubbleProps {
  sender: string;
  message: string;
  time: string;
  isSelf: boolean;
}

export default function ChatBubble({
  sender,
  message,
  time,
  isSelf,
}: ChatBubbleProps) {
  return (
    <div
      className={`flex flex-col ${isSelf ? "items-end ml-auto" : "items-start"} max-w-xl gap-2`}
    >
      <div className={`flex items-center gap-2 ${isSelf ? "mr-1" : "ml-1"}`}>
        {!isSelf && (
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
            {sender}
          </span>
        )}
        <span className="text-[10px] text-zinc-700">{time}</span>
        {isSelf && (
          <span className="text-[10px] font-bold text-green-500 uppercase tracking-wider">
            You
          </span>
        )}
      </div>
      <div
        className={`p-4 rounded-2xl text-sm leading-relaxed shadow-lg transition-all ${
          isSelf
            ? "bg-green-600 text-black font-medium rounded-tr-none shadow-[0_10px_30px_rgba(34,197,94,0.15)]"
            : "bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-tl-none"
        }`}
      >
        {message}
      </div>
    </div>
  );
}
