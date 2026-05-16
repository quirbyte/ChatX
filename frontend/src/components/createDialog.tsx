import axios from "axios";
import { useState } from "react";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function CreateDialog({ handleClose,refreshData }: { handleClose: () => void,refreshData:()=>void }) {
    const [loading, setLoading] = useState(false);
    const [roomname, setRoomname] = useState("");
    const [password, setPassword] = useState("");
    const [nameError, setNameError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [passwordError, setPasswordError] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setNameError(false);
        setPasswordError(false);
        if (!roomname || !password) {
            if (!roomname) setNameError(true);
            if (!password) setPasswordError(true);
            setErrorMsg("Fill all fields");
            return;
        }
        setLoading(true);
        try {
            await axios.post(`${BACKEND_URL}/room/create`,
                {
                    name: roomname,
                    password: password
                }, {
                headers: {
                    authorization: localStorage.getItem("chatx_token")
                },
            }
            )
            refreshData();
            handleClose();
        } catch (err: any) {
            const error = err?.response?.data?.error || "Connection Error";
            setNameError(true);
            setErrorMsg(error);
        } finally {
            setLoading(false);
        }
    }

    const handleDiscard = () => {
        setRoomname("");
        setPassword("");
        setErrorMsg("");
        setNameError(false);
        setPasswordError(false);
    }

    return <div className="relative bg-zinc-950 border border-zinc-800 h-115 w-100 rounded-2xl p-4 flex flex-col items-center">
        <div onClick={handleClose} className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-red-700 flex justify-center items-center text-white font-semibold cursor-default">
            ✕
        </div>
        <h1 className="text-white text-3xl text-center font-extrabold tracking-wide">
            CREATE ROOM
        </h1>
        <form className="w-full mt-6 text-white flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="flex flex-col">
                <label className="ml-3 font-semibold">Room Name :</label>
                <input
                    className="mt-2.5 bg-zinc-900 p-3 rounded-xl border-2 border-zinc-800 focus:outline-none focus:border-zinc-500 text-left tracking-wide text-sm"
                    type="text"
                    value={roomname}
                    disabled={loading}
                    onChange={(e) => setRoomname(e.target.value)}
                    placeholder="Eg: My Group"
                />
                {nameError && <p className="ml-3 text-[10px] text-red-800">{errorMsg}</p>}
            </div>
            <div className="flex flex-col">
                <label className="ml-3 font-semibold">Password :</label>
                <input
                    className="mt-2.5 bg-zinc-900 p-3 rounded-xl border-2 border-zinc-800 focus:outline-none focus:border-zinc-500 text-center tracking-[0.3em] text-sm"
                    type="password"
                    maxLength={6}
                    value={password}
                    disabled={loading}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••"
                />
                {passwordError && <p className="ml-3 text-[10px] text-red-800">{errorMsg}</p>}
            </div>
            <button type="submit" disabled={loading} className="mt-4 bg-white text-black font-semibold w-full p-3 rounded-xl tracking-wider hover:opacity-90 disabled:opacity-50">Create Room</button>
            <button type="button" onClick={handleDiscard} disabled={loading} className="bg-zinc-700 text-white font-semibold w-full p-3 rounded-xl tracking-wider hover:opacity-90 disabled:opacity-50">Discard Changes</button>
        </form>
    </div>
}