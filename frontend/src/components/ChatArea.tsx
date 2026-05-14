import { LogOut, Send, CopyIcon } from "lucide-react"
import { useState } from "react";
import LeaveDialog from "./LeaveRoomDialog";
import Incoming from "./msg/Incoming";
import Outgoing from "./msg/Outgoing";
import type { RoomInterface } from "../pages/chat";
import axios from "axios";

interface ChatAreaProps {
    activeRoom: RoomInterface | null;
    handleActiveRoom: (room: RoomInterface | null) => void;
    refreshData: () => void;
}

export default function ChatArea({ activeRoom, handleActiveRoom, refreshData }: ChatAreaProps) {
    const [loading, setLoading] = useState(false);
    const [leaveDialogOpen, setLeaveDialogOpen] = useState(false);

    const handleLeaveRoom = async () => {
        setLoading(true);
        try {
            await axios.delete("http://localhost:3000/room/leave", {
                headers: {
                    authorization: localStorage.getItem("chatx_token")
                },
                data: {
                    code: activeRoom?.code
                }
            })
            handleActiveRoom(null);
            refreshData();
            setLeaveDialogOpen(false);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {
                activeRoom ? <div className="flex flex-col h-full w-full text-white overflow-hidden bg-zinc-950">
                    <div className="flex justify-between items-center px-4 py-3 border-b border-zinc-900 bg-zinc-950/50 backdrop-blur-md">
                        <div className="flex gap-3 items-center ">
                            <h1 className="uppercase text-lg sm:text-xl font-bold tracking-wider text-zinc-300"># {activeRoom?.name}</h1>
                            <div
                                onClick={() => setLeaveDialogOpen(true)}
                                className="text-zinc-300 h-6 w-6 bg-red-950/30 hover:bg-red-900 border border-red-900/50 rounded-full flex justify-center items-center cursor-pointer transition-all"
                            >
                                <LogOut size={12} />
                            </div>
                        </div>
                        <div className="uppercase text-[11px] py-1.5 px-3 border border-zinc-800 rounded-2xl bg-zinc-900/40 font-semibold flex gap-2">
                            <div>Room code: {activeRoom?.code} </div>
                            <div className="cursor-default hover:opacity-70">
                                <CopyIcon size={10} color="grey" />
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-4 scrollbar-none space-y-1">
                        <p className="italic text-center text-[10px] sm:text-xs text-zinc-600 mb-8">
                            Beginning of a legendary conversation.
                        </p>
                        <Incoming />
                        <Outgoing />
                        <Incoming />
                        <Outgoing />
                        <Incoming />
                        <Outgoing />
                        <Incoming />
                        <Incoming />
                        <Outgoing />
                    </div>

                    <div className="p-3 sm:p-4 bg-zinc-950 border-t border-zinc-900">
                        <div className="relative flex items-end bg-zinc-900 border border-zinc-800 rounded-2xl focus-within:border-zinc-600 transition-all p-2">
                            <textarea
                                className="flex-1 bg-transparent border-none outline-none p-2 text-[13px] sm:text-sm resize-none scrollbar-none min-h-11 max-h-32 text-zinc-200"
                                placeholder="Send a message..."
                                rows={1}
                                onInput={(e) => {
                                    const target = e.target as HTMLTextAreaElement;
                                    target.style.height = 'inherit';
                                    target.style.height = `${target.scrollHeight}px`;
                                }}
                            />
                            <button className="mb-1 mr-1 p-2 bg-inherit rounded-xl hover:bg-green-800/20 text-green-500 transition-all active:scale-95">
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div> : <div className="flex justify-center items-center italic text-zinc-800">
                    Select a Room to start chatting
                </div>
            }
            {leaveDialogOpen && (
                <div className="fixed inset-0 z-50 flex justify-center items-center bg-zinc-950/60 backdrop-blur-sm p-4">
                    <LeaveDialog handleLeaveRoom={handleLeaveRoom} handleClose={() => setLeaveDialogOpen(false)} loading={loading} />
                </div>
            )}
        </>
    )
}