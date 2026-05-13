
export default function Incoming() {
    return <div className="flex gap-4 group">
        <div className="h-10 w-10 rounded-2xl bg-zinc-900 border border-zinc-800 shrink-0" />
        <div className="space-y-2">
            <div className="flex items-center gap-3">
                <span className="text-[11px] font-black uppercase tracking-tighter text-zinc-400">Soumyadip</span>
                <span className="text-[9px] font-medium text-zinc-700 uppercase">12:45 PM</span>
            </div>
            <div className="bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm p-4 rounded-3xl rounded-tl-none max-w-md text-sm text-zinc-300 leading-relaxed shadow-sm">
                The single biggest problem in communication is the illusion that it has taken place.
            </div>
        </div>
    </div>
}