import { User } from "lucide-react";

export default function Outgoing() {
    return (
        <div className="flex gap-2 sm:gap-3 flex-row-reverse items-start mt-2 ml-auto max-w-[90%] sm:max-w-[75%]">
            <div className="h-7 w-7 sm:h-9 sm:w-9 rounded-full bg-zinc-100 shrink-0 flex items-center justify-center mt-1">
                <User color="black" size={14} className="sm:size-5" />
            </div>

            <div className="flex flex-col items-end space-y-1">
                <div className="flex items-baseline gap-2 px-1">
                    <span className="text-[8px] font-medium text-zinc-600 uppercase">12:46 PM</span>
                    <span className="text-[10px] font-bold text-white">Me</span>
                </div>
                <div className="bg-zinc-100 p-2.5 sm:p-3 rounded-2xl rounded-tr-none text-[13px] sm:text-sm font-medium text-black leading-snug shadow-md">
                    Words are, of course, the most powerful drug used by mankind.
                </div>
            </div>
        </div>
    );
}