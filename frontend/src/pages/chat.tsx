import { useState } from "react"
import Sidebar from "../components/Sidebar"
import Navbar from "../components/Navbar";
import { ChevronLeft, ChevronRight } from "lucide-react"
import JoinDialog from "../components/JoinDialog";
import CreateDialog from "../components/createDialog";
import ChatArea from "../components/ChatArea";

export default function ChatPage() {
    const [isOpen, setIsOpen] = useState(true);
    const [joinDialogOpen, setJoinDialogOpen] = useState(false);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);

    return (
        <div className="bg-zinc-950 h-screen w-screen flex relative overflow-hidden">
            <div className={`relative z-20 h-full bg-zinc-900 border-r border-zinc-800 transition-all duration-300 ease-in-out 
                ${isOpen ? "w-80" : "w-0"}`}
            >
                <div className={`w-80 h-full transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                    <Sidebar />
                </div>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="absolute top-1/2 -right-4 -translate-y-1/2 bg-zinc-800 border border-zinc-700 text-white p-1 rounded-full hover:bg-zinc-700 transition-colors shadow-lg z-30"
                >
                    {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
                </button>
            </div>
            <div className="flex-1 flex flex-col min-w-0 h-full">
                <Navbar
                    displaySidebar={isOpen}
                    joinDialog={() => setJoinDialogOpen(true)}
                    createDialog={() => setCreateDialogOpen(true)}
                />
                <main className="flex-1 overflow-hidden w-full">
                    <ChatArea />
                </main>
            </div>
            {joinDialogOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <JoinDialog handleClose={() => setJoinDialogOpen(false)} />
                </div>
            )}
            {createDialogOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <CreateDialog handleClose={() => setCreateDialogOpen(false)} />
                </div>
            )}
        </div>
    );
}