import { useNavigate } from "react-router-dom";

export default function LandingPage() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-zinc-950 text-white selection:bg-green-500/30 overflow-x-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 md:w-150 md:h-150 bg-green-500/10 blur-[80px] md:blur-[120px] -z-10 rounded-full" />

            <nav className="flex flex-col sm:flex-row justify-between items-center px-6 py-6 max-w-7xl mx-auto gap-6 sm:gap-0">
                <div className="font-black tracking-tighter text-green-500">
                    <div className="flex gap-2 items-center">
                        <h1 className="text-4xl md:text-7xl text-white font-extrabold tracking-tighter">ChatX</h1>
                        <img className="h-8 w-8 md:h-18 md:w-18" src="/icon.svg" alt="logo" />
                    </div>
                </div>
                <div className="flex gap-6 items-center">
                    <a href="/signin" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">Sign In</a>
                    <button onClick={() => { navigate("/signup") }} className="bg-white text-black px-5 py-2 rounded-full font-bold text-sm hover:bg-zinc-200 transition-all">
                        Get Started
                    </button>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6">
                <section className="pt-12 md:pt-20 pb-20 md:pb-32 text-center">
                    <div className="inline-block px-4 py-1.5 mb-6 border border-green-500/20 bg-green-500/5 rounded-full text-green-500 text-[9px] md:text-[10px] font-bold tracking-[0.2em] uppercase">
                        Built for Speed • Powered by WebSockets
                    </div>

                    <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight mb-8 bg-linear-to-b from-white to-zinc-500 bg-clip-text text-transparent leading-tight">
                        Legendary chats. <br /> Zero footprints.
                    </h1>

                    <p className="text-zinc-400 max-w-2xl mx-auto text-base md:text-xl mb-12 leading-relaxed">
                        Create ephemeral rooms in seconds. Share a code. Chat in real-time.
                        Everything disappears when the room dies.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button onClick={()=>{navigate("/chat")}} className="w-full sm:w-auto bg-green-600 hover:bg-green-500 text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-[0_0_30px_rgba(22,163,74,0.3)] hover:scale-105 active:scale-95">
                            Start Chatting Now
                        </button>
                        <button onClick={()=>{
                            location.href="#Features"
                        }} className="w-full sm:w-auto border border-zinc-800 hover:bg-zinc-900 px-10 py-4 rounded-2xl font-bold transition-all">
                            How it works
                        </button>
                    </div>
                </section>

                <section id="Features" className="relative group px-2 md:px-0">
                    <div className="absolute -inset-1 bg-linear-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
                    <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl aspect-video overflow-hidden shadow-2xl">
                        <div className="w-full h-6 md:h-8 bg-zinc-800/50 border-b border-zinc-700 flex items-center gap-1.5 px-4">
                            <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-red-500/50" />
                            <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-yellow-500/50" />
                            <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-green-500/50" />
                        </div>
                        <div className="flex justify-center items-center h-full">
                            <img src="/preview.png" alt="Preview" className="w-full h-full" />
                        </div>
                    </div>
                </section>
            </main>

            <footer className="mt-20 border-t border-zinc-900 pt-12 pb-8 px-6">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-10 md:gap-0 text-center md:text-left">
                    <div className="space-y-4">
                        <div className="flex items-center justify-center md:justify-start gap-2 group">
                            <h2 className="text-2xl font-black text-white group-hover:text-green-500 transition-colors">ChatX</h2>
                            <img className="h-6 w-6 grayscale group-hover:grayscale-0 transition-all" src="/icon.svg" alt="logo" />
                        </div>
                        <p className="text-zinc-500 text-sm max-w-xs leading-relaxed">
                            Ephemeral messaging for the modern web. Built with the PERN stack and real-time WebSockets.
                        </p>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-2">
                        <div className="flex items-center gap-2 px-3 py-1 bg-green-500/5 border border-green-500/20 rounded-full">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-bold text-green-500 uppercase tracking-tight">Systems Operational</span>
                        </div>
                        <p className="text-zinc-600 text-[11px] mt-4">
                            © 2026 ChatX. No messages stored beyond 15 limit.
                        </p>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-zinc-900/50 flex justify-center">
                    <p className="text-zinc-500 text-xs font-medium italic">
                        Handcrafted by <span className="text-zinc-300 font-bold not-italic hover:text-green-500 cursor-pointer transition-colors">quirbyte</span>
                    </p>
                </div>
            </footer>
        </div>
    );
}