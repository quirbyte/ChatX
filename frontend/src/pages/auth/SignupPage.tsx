import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import QrCard from "../../components/QrLoginCard";

export default function SignupPage() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [usernameError, setUsernameError] = useState(false);
    const [email, setEmail] = useState("");
    const [isVerified, setIsVerified] = useState(false);
    const [qrcode, setQrcode] = useState("");
    const [otp, setOtp] = useState("");
    const [otpError, setOtpError] = useState(false);

    const handleSignup = async () => {
        if (!username || !email) {
            setErrorMsg("Fill in all fields");
            setUsernameError(true);
            return;
        }
        setLoading(true);
        setErrorMsg("");
        setUsernameError(false);
        try {
            const response = await axios.post("http://localhost:3000/auth/signup", { username, email });
            setQrcode(response.data.qrCode);
            setIsVerified(true);
            setDialogOpen(true);
        } catch (err: any) {
            const error = err?.response?.data?.error || "Connection Error";
            setErrorMsg(error);
            setUsernameError(true);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setOtpError(false);
        try {
            const response = await axios.post("http://localhost:3000/auth/verify", { email, token: otp });
            if (response.data.token) {
                localStorage.setItem("chatx_token", response.data.token);
                localStorage.setItem("chatx_user", JSON.stringify(response.data.user));
                navigate("/chat");
            }
        } catch (err: any) {
            const error = err?.response?.data?.error || "Connection Error";
            setErrorMsg(error);
            setOtpError(true);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-zinc-900/40 w-[90%] max-w-md text-zinc-200 rounded-2xl p-6 border border-zinc-800 backdrop-blur-md shadow-2xl">
            <header className="mb-6 text-center">
                <h1 className="text-2xl font-bold tracking-tighter text-white">
                    Join ChatX
                </h1>
                <p className="text-zinc-500 text-xs mt-1">Start chatting in seconds</p>
            </header>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 ml-3">
                        Username
                    </label>
                    <input
                        className="bg-zinc-950/50 p-3 rounded-xl border-2 border-zinc-800 focus:outline-none focus:border-zinc-500 text-sm placeholder:text-zinc-700"
                        type="text"
                        disabled={isVerified}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="username"
                    />
                    {usernameError && <p className="text-[10px] ml-3 text-red-700">{errorMsg}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 ml-3">
                        Email
                    </label>

                    <div className="flex gap-2">
                        <input
                            className="bg-zinc-950/50 p-3 rounded-xl border-2 border-zinc-800 focus:outline-none focus:border-zinc-500 text-sm placeholder:text-zinc-700 flex-1"
                            type="email"
                            value={email}
                            disabled={isVerified}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="email@domain.com"
                        />
                        <button
                            type="button"
                            onClick={handleSignup}
                            disabled={loading}
                            className="px-4 bg-zinc-100 rounded-xl text-black text-xs font-bold hover:bg-white hover:opacity-90 active:scale-95 transition-all"
                        >
                            {loading ? "..." : "Verify"}
                        </button>
                    </div>
                </div>

                <div className={`flex flex-col gap-1.5 ${isVerified ? "opacity-100" : "opacity-40"}`}>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 ml-3">
                        OTP
                    </label>
                    <input
                        className="bg-zinc-950/50 p-3 rounded-xl border-2 border-zinc-800 text-center tracking-[0.3em] text-sm focus:outline-none"
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        placeholder="••••••"
                        disabled={!isVerified}
                    />
                    {otpError && <p className="text-[10px] ml-3 text-red-700">{errorMsg}</p>}
                </div>

                <button type="submit" className="w-full mt-2 p-3 bg-zinc-100 text-black text-sm font-bold rounded-xl hover:opacity-90 active:scale-95 transition-all disabled:opacity-50" disabled={!isVerified || loading}>
                    Continue
                </button>

                <footer className="mt-2 text-center">
                    <p className="text-zinc-600 text-[10px]">
                        By continuing, you agree to our <span className="text-zinc-400 cursor-pointer hover:underline">Terms</span>
                    </p>
                    <p className="text-zinc-600 text-[10px]">
                        Already have an account? <Link to="/signin" className="text-zinc-400 cursor-pointer hover:underline">Sign in</Link>
                    </p>
                </footer>

                {qrcode && dialogOpen && (
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
                        <div className="relative p-2 bg-zinc-800 rounded-2xl border border-zinc-700 shadow-2xl animate-in fade-in zoom-in duration-300">
                            <QrCard qrcode={qrcode} />
                            <button
                                onClick={() => setDialogOpen(false)}
                                className="absolute -top-3 -right-3 h-8 w-8 rounded-full bg-zinc-100 hover:bg-white text-black font-bold shadow-lg transition-transform active:scale-90"
                            >
                                ✕
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
}