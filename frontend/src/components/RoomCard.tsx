import type { RoomInterface } from "../pages/chat";

interface RoomCardProps {
    room: RoomInterface;
    handleActiveRoom: (room: RoomInterface) => void;
    isActive: boolean
}

export default function RoomCard({ room, isActive, handleActiveRoom }: RoomCardProps) {
    return <div onClick={() => handleActiveRoom(room)} className={`h-10 w-full cursor-default transition-all border border-zinc-800 rounded-xl p-3 flex items-center justify-center text-lg font-bold uppercase ${isActive ? "bg-white text-black scale-97" : "bg-zinc-900 text-white hover:bg-zinc-800"}`}>
        {room.name}
    </div>
}