import { LogOut,Send } from "lucide-react"

export default function ChatArea() {
    return <div className="flex flex-col h-full w-full text-white py-1 px-3">
        <div className="flex gap-3 items-center">
            <h1 className="uppercase text-xl font-bold tracking-wider text-zinc-300"># General</h1>
            <div className="text-zinc-300 h-6 w-6 bg-red-900 rounded-full flex justify-center items-center">
                <LogOut size={13} />
            </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 scrollbar-none">
            <p className="italic text-center text-sm mt-10">
                Beggining of a legendary conversation.
            </p>
        </div>

        <div className="py-2 px-0 bg-zinc-950">
                <div className="relative flex items-end bg-zinc-900 border border-zinc-800 rounded-2xl focus-within:border-zinc-600 transition-all p-2">
                    <textarea 
                        className="flex-1 bg-transparent border-none outline-none p-2 text-sm resize-none scrollbar-none min-h-11 max-h-32"
                        placeholder="Send a message..."
                        rows={1}
                        onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement;
                            target.style.height = 'inherit';
                            target.style.height = `${target.scrollHeight}px`;
                        }}
                    />
                    <button className="mb-1 mr-1 p-2 bg-inherit text-white rounded-xl hover:bg-zinc-800 transition-all active:scale-95">
                        <Send size={18} />
                    </button>
                </div>
            </div>
    </div>
}

