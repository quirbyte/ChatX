import { useState } from "react"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react"
import JoinDialog from "../components/JoinDialog";
import CreateDialog from "../components/createDialog";

export default function ChatPage() {
    const [isOpen, setIsOpen] = useState(true);
    const [joinDialogOpen, setJoinDialogOpen] = useState(false);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);

    return <div className="bg-zinc-950 h-screen w-screen relative overflow-hidden">
        <div className={`absolute top-0 left-0 z-10 h-full w-80 bg-zinc-900 border-r border-zinc-800 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
            <Sidebar />
            <button onClick={() => setIsOpen(!isOpen)} className="absolute top-1/2 -right-4 -translate-y-1/2 bg-zinc-800 border border-zinc-700 text-white p-1 rounded-full hover:bg-zinc-700 transition-colors shadow-lg z-30">
                {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
            </button>
        </div>
        <div>
            <div className="relative">
                <Navbar joinDialog={() => setJoinDialogOpen(true)} createDialog={() => setCreateDialogOpen(true)} />
            </div>
            {joinDialogOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-xs">
                <JoinDialog handleClose={()=>setJoinDialogOpen(false)} />
            </div>}
            {createDialogOpen && <div className="fixed inset-0 z-50 flex items-center justify-center bg-blac/40 backdrop-blur-xs">
                <CreateDialog handleClose={()=>setCreateDialogOpen(false)} />    
            </div>}
        </div>
    </div>
}