import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignupPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [otp,setOtp]=useState("");
    return (
        <div className="bg-zinc-900/40 w-[90%] max-w-md text-zinc-200 rounded-2xl p-6 border border-zinc-800 backdrop-blur-md shadow-2xl">
            <header className="mb-6 text-center">
                <h1 className="text-2xl font-bold tracking-tighter text-white">
                    Join ChatX
                </h1>
                <p className="text-zinc-500 text-xs mt-1">Start chatting in seconds</p>
            </header>

            <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 ml-3">
                        Username
                    </label>
                    <input
                        className="bg-zinc-950/50 p-3 rounded-xl border border-zinc-800 focus:outline-none focus:border-zinc-500 text-sm placeholder:text-zinc-700"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="username"
                    />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 ml-3">
                        Email
                    </label>

                    <div className="flex gap-2">
                        <input
                            className="bg-zinc-950/50 p-3 rounded-xl border border-zinc-800 focus:outline-none focus:border-zinc-500 text-sm placeholder:text-zinc-700 flex-1"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email@domain.com"
                        />
                        <button
                            type="button"
                            className="px-4 bg-zinc-100 rounded-xl text-black text-xs font-bold hover:bg-white hover:opacity-90 active:scale-95 transition-all"
                        >
                            Verify
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-1.5 opacity-40">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 ml-3">
                        OTP
                    </label>
                    <input
                        className="bg-zinc-950/50 p-3 rounded-xl border border-zinc-800 text-center tracking-[0.3em] text-sm focus:outline-none"
                        type="text"
                        value={otp}
                        onChange={(e)=>setOtp(e.target.value)}
                        maxLength={6}
                        placeholder="••••••"
                        disabled={!isVerified}
                    />
                </div>

                <button className="w-full mt-2 p-3 bg-zinc-100 text-black text-sm font-bold rounded-xl hover:opacity-90 active:scale-95 transition-all disabled:opacity-50" disabled={!isVerified}>
                    Continue
                </button>

                <footer className="mt-4 text-center">
                    <p className="text-zinc-600 text-[10px]">
                        By continuing, you agree to our <span className="text-zinc-400 cursor-pointer hover:underline">Terms</span>
                    </p>
                    <p className="text-zinc-600 text-[10px]">
                        Already have an account? <Link to="/signin" className="text-zinc-400 cursor-pointer hover:underline">Sign in</Link>
                    </p>
                </footer>
            </form>
        </div>
    );
}