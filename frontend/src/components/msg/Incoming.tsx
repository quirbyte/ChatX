import { User } from "lucide-react";

export interface IncomingProps{
    content: string;
    sender:string;
    time:string;
}

export const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
};

export default function Incoming({content,sender,time}:IncomingProps) {
    return (
        <div className="flex gap-2 sm:gap-3 items-start group mt-2 max-w-[90%] sm:max-w-[75%]">
            <div className="h-7 w-7 sm:h-9 sm:w-9 rounded-full bg-zinc-900 border border-zinc-800 shrink-0 flex items-center justify-center mt-1">
                <User size={14} color="white" className="sm:size-5" />
            </div>

            <div className="flex flex-col space-y-1">
                <div className="flex items-baseline gap-2 px-1">
                    <span className="text-[10px] font-bold text-zinc-400">{sender}</span>
                    <span className="text-[8px] font-medium text-zinc-600 uppercase">{formatTime(time)}</span>
                </div>
                <div className="bg-zinc-900/80 border border-zinc-800 p-2.5 sm:p-3 rounded-2xl rounded-tl-none text-[13px] sm:text-sm text-zinc-300 leading-snug shadow-sm">
                    {content}
                </div>
            </div>
        </div>
    );
}