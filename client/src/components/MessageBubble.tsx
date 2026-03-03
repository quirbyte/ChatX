interface bubbleProps{
    msg:string;
}

export default function MessageBubble({ msg }: bubbleProps) {
  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-[80%] px-4 py-2 rounded-2xl rounded-bl-none 
                      bg-zinc-800/80 border border-white/5 
                      text-zinc-100 shadow-md backdrop-blur-sm">
        <p className="text-sm leading-relaxed wrap-break-word">
          {msg}
        </p>
      </div>
    </div>
  );
}