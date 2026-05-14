import { User } from "lucide-react"
import { Power } from "lucide-react";
import { useNavigate } from "react-router-dom";
import RoomCard from "./RoomCard";

export default function Sidebar() {
    const user = JSON.parse(localStorage.getItem("chatx_user") as string);
    const name = user?.username;
    const email = user?.email;
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate("/signin", { replace: true });
    }

    const handleHome = () => {
        navigate("/");
    }

    return <div className="relative flex flex-col justify-center items-center h-full w-full">
        <div className="absolute top-3 left-3 hover:opacity-85 cursor-default" onClick={handleHome}>
            <div className="text-4xl flex gap-2 items-center">
                <h1 className="text-4xl text-white font-extrabold tracking-tighter">ChatX</h1>
                <img className="h-8 w-8" src="/icon.svg" alt="logo" />
            </div>
        </div>
        <h1 className="text-zinc-400 font-bold text-2xl text-center">ROOMS</h1>
        <div className="h-[65vh] overflow-y-scroll scrollbar-none w-full p-3 pt-0">  
            <div className="min-h-[90%] w-full bg-zinc-950/20 rounded-2xl mt-2 p-3 flex flex-col gap-2">
                <RoomCard />
                <RoomCard/>
                <RoomCard/>
                <RoomCard />
                <RoomCard/>
                <RoomCard/>
                <RoomCard />
                <RoomCard/>
                <RoomCard/>
                <RoomCard />
                <RoomCard/>
                <RoomCard/>
            </div>
        </div>
        <div className="absolute bottom-3 left-3">
            <div className="p-3 bg-zinc-900 border-2 hover:border-zinc-700 border-zinc-800 w-72.5 h-15 rounded-2xl text-white flex justify-between items-center gap-5">
                <div className="rounded-full h-8 w-8 flex justify-center items-center bg-green-800">
                    <User />
                </div>
                <div>
                    <div className="font-semibold text-zinc-300 tracking-wide text-sm">
                        {name}
                    </div>
                    <div className="font-extralight text-[11px] truncate tracking-wider text-zinc-500">
                        {email}
                    </div>
                </div>
                <div onClick={handleLogout} className="rounded-full h-8 w-8 flex justify-center items-center bg-red-800 hover:opacity-90 cursor-default">
                    <Power />
                </div>
            </div>
        </div>
    </div>
}
