import { useState } from "react";

export default function TempPage() {
    const [activeRoom, setActiveRoom] = useState("General");

    return (
        <div className="flex h-screen w-screen bg-zinc-950 text-zinc-200 overflow-hidden font-sans">

            <aside className="w-72 flex-shrink-0 border-r border-zinc-900 bg-zinc-950 flex flex-col">
                <header className="h-20 flex items-center px-8">
                    <h1 className="text-3xl font-black tracking-tighter text-white">ChatX</h1>
                </header>

                <div className="flex-1 overflow-y-auto px-4 py-2 space-y-8">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600 mb-4 ml-4">
                            Channels
                        </p>
                        <nav className="space-y-1">
                            {["General", "Developers", "Designers", "Announcements"].map((room) => (
                                <button
                                    key={room}
                                    onClick={() => setActiveRoom(room)}
                                    className={`w-full text-left px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200 group flex items-center gap-3 ${activeRoom === room
                                        ? "bg-zinc-900 text-white shadow-lg border border-zinc-800"
                                        : "text-zinc-500 hover:bg-zinc-900/50 hover:text-zinc-300"
                                        }`}
                                >
                                    <span className={`text-lg ${activeRoom === room ? "text-amber-200" : "text-zinc-700"}`}>#</span>
                                    {room}
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* User Profile Section */}
                <footer className="p-4 m-4 rounded-3xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-md">
                    <div className="flex items-center gap-3 px-2">
                        <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-zinc-700 to-zinc-900 border border-zinc-700 flex items-center justify-center text-white font-bold">
                            R
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-bold text-white truncate uppercase tracking-tight">Rahul</p>
                            <div className="flex items-center gap-1.5">
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
                                <p className="text-[10px] font-medium text-zinc-500">Online</p>
                            </div>
                        </div>
                    </div>
                </footer>
            </aside>

            {/* RIGHT SIDE: Chat Area */}
            <main className="flex-1 flex flex-col min-w-0 bg-zinc-950 relative">

                {/* Chat Header */}
                <header className="h-20 flex items-center justify-between px-10 border-b border-zinc-900 bg-zinc-950/50 backdrop-blur-xl z-10">
                    <div className="flex items-center gap-3">
                        <span className="text-amber-200 text-2xl font-light">#</span>
                        <h2 className="font-bold text-xl tracking-tight text-white">{activeRoom}</h2>
                    </div>
                    <button className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 border border-zinc-800 px-4 py-2 rounded-full hover:bg-zinc-900 hover:text-white transition-all">
                        Settings
                    </button>
                </header>

                {/* Messages List */}
                <div className="flex-1 overflow-y-auto p-10 space-y-8 scrollbar-hide">
                    {/* Incoming Message */}
                    <div className="flex gap-4 group">
                        <div className="h-10 w-10 rounded-2xl bg-zinc-900 border border-zinc-800 flex-shrink-0" />
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

                    {/* Outgoing Message (Matches your Zinc Cards) */}
                    <div className="flex gap-4 flex-row-reverse group">
                        <div className="h-10 w-10 rounded-2xl bg-zinc-100 flex-shrink-0" />
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
                </div>

                {/* Message Input Container */}
                <footer className="p-8">
                    <div className="max-w-4xl mx-auto relative group">
                        <input
                            type="text"
                            placeholder={`Message #${activeRoom}`}
                            className="w-full bg-zinc-900/40 border-2 border-zinc-800 p-5 pr-20 rounded-3xl focus:outline-none focus:border-zinc-700 focus:bg-zinc-900/60 transition-all text-sm placeholder:text-zinc-700 text-zinc-200 backdrop-blur-md"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
                            <button
                                type="button"
                                className="p-3 bg-zinc-100 rounded-2xl text-black hover:bg-white transition-all active:scale-90 shadow-xl"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                            </button>
                        </div>
                    </div>
                    <p className="text-center text-[10px] text-zinc-700 mt-4 tracking-tighter uppercase font-bold">
                        End-to-end encrypted • ChatX Protocol v1.0
                    </p>
                </footer>

                {/* Subtle Decorative Gradient */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 blur-[120px] pointer-events-none" />
            </main>
        </div>
    );
}