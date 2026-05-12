import { useState } from "react"

export default function JoinDialog({ handleClose }: { handleClose: () => void }) {
    const [loading, setLoading] = useState(false);
    const [roomcode, setRoomcode] = useState("");
    const [password, setPassword] = useState("");
    const [codeError, setCodeError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setCodeError(false);
        setPasswordError(false);
        if (!roomcode || !password) {
            if (!roomcode) setCodeError(true);
            if (!password) setPasswordError(true);
            setErrorMsg("Fill all fields");
            return;
        }
        setLoading(true);
        try {
            //api call
            handleClose();
        } catch (err: any) {
            const error = err?.response?.data?.error || "Connection Error";
            setCodeError(true);
            setErrorMsg(error);
        } finally {
            setLoading(false);
        }
    }

    const handleDiscard = () => {
        setRoomcode("");
        setPassword("");
        setErrorMsg("");
        setCodeError(false);
        setPasswordError(false);
    }

    return <div className="relative bg-zinc-900 h-115 w-100 rounded-2xl p-4 flex flex-col items-center">
        <div onClick={handleClose} className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-red-700 flex justify-center items-center text-white font-semibold cursor-default">
            ✕
        </div>
        <h1 className="text-white text-3xl text-center font-extrabold tracking-wide">
            JOIN ROOM
        </h1>
        <div className="h-0.5 w-1/2 mt-1 bg-linear-to-r from-transparent via-[#ffffff9c] to-transparent mb-6" />
        <form className="w-full mt-1.5 text-white flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
                <label className="ml-3 font-semibold">Room Code :</label>
                <input
                    className="mt-2.5 bg-zinc-950/50 p-3 rounded-xl border-2 border-zinc-800 focus:outline-none focus:border-zinc-500 text-center tracking-[0.3em] text-sm"
                    type="text"
                    maxLength={6}
                    value={roomcode}
                    disabled={loading}
                    onChange={(e) => setRoomcode(e.target.value.toUpperCase())}
                    placeholder="AAAAAA"
                />
                {codeError && <p className="ml-3 text-[10px] text-red-800">{errorMsg}</p>}
            </div>
            <div className="flex flex-col">
                <label className="ml-3 font-semibold">Password :</label>
                <input
                    className="mt-2.5 bg-zinc-950/50 p-3 rounded-xl border-2 border-zinc-800 focus:outline-none focus:border-zinc-500 text-center tracking-[0.3em] text-sm"
                    type="password"
                    maxLength={6}
                    value={password}
                    disabled={loading}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••"
                />
                {passwordError && <p className="ml-3 text-[10px] text-red-800">{errorMsg}</p>}
            </div>
            <button type="submit" disabled={loading} className="mt-4 bg-white text-black font-semibold w-full p-3 rounded-xl tracking-wider hover:opacity-90 disabled:opacity-50">Join</button>
            <button type="button" onClick={handleDiscard} disabled={loading} className="bg-zinc-700 text-white font-semibold w-full p-3 rounded-xl tracking-wider hover:opacity-90 disabled:opacity-50">Discard Changes</button>
        </form>
    </div>
}