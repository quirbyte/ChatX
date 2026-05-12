import { useNavigate } from "react-router-dom";

export interface NavbarProps {
    displaySidebar: boolean
    joinDialog: () => void;
    createDialog: () => void;
}

export default function Navbar({displaySidebar,joinDialog,createDialog}:NavbarProps) {
    const navigate = useNavigate();
    const handleHome = () => {
        navigate("/");
    }

    return (
        <nav className="w-full h-16 border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-md flex items-center justify-between px-3 md:px-7 lg:px-10">
                <div className="flex items-center">
                <img
                    onClick={handleHome}
                    className={`hover:opacity-80 h-10 w-10 cursor-pointer transition-opacity ${displaySidebar?"hidden":""}`}
                    src="/icon.svg"
                    alt="ChatX Logo"
                />
            </div>
            <div className="flex gap-4">
                <button onClick={joinDialog} className="bg-zinc-900 border border-zinc-800 px-4 py-1.5 cursor-pointer hover:bg-zinc-800 rounded-lg text-zinc-300 uppercase text-xs font-bold tracking-wider transition-all">
                    Join Room
                </button>
                <button onClick={createDialog} className="bg-zinc-100 px-4 py-1.5 cursor-pointer hover:bg-zinc-300 rounded-lg text-black uppercase text-xs font-bold tracking-wider transition-all">
                    Create Room
                </button>
            </div>
        </nav>
    );
}