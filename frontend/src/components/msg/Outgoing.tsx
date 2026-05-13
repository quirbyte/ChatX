
export default function Outgoing() {
    return <div className="flex gap-4 flex-row-reverse group">
        <div className="h-10 w-10 rounded-2xl bg-zinc-100 shrink-0" />
        <div className="space-y-2 text-right">
            <div className="flex items-center gap-3 justify-end">
                <span className="text-[9px] font-medium text-zinc-700 uppercase">12:46 PM</span>
                <span className="text-[11px] font-black uppercase tracking-tighter text-white">Me</span>
            </div>
            <div className="bg-zinc-100 p-4 rounded-3xl rounded-tr-none max-w-md text-sm font-medium text-black leading-relaxed shadow-[0_10px_40px_rgba(255,255,255,0.05)]">
                Words are, of course, the most powerful drug used by mankind.
            </div>
        </div>
    </div>
}