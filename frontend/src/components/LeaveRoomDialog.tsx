
export interface LeaveCardProps {
    handleClose: () => void;
    loading: boolean;
    handleLeaveRoom: () => void;
}

export default function LeaveDialog({ handleClose, handleLeaveRoom, loading }: LeaveCardProps) {
    return <div className="relative h-60 w-60 bg-zinc-900 text-white rounded-xl flex justify-center items-center">
        <h1 className="absolute top-1 text-3xl font-bold text-center mt-2">Confirm Leave</h1>
        <p>Do yo want to leave the room?</p>
        <div className="flex absolute bottom-0 w-full">
            <button onClick={handleClose} disabled={loading} className="w-[50%] cursor-pointer hover:opacity-90 h-10 bg-zinc-700 rounded-bl-xl disabled:opacity-50">No</button>
            <button onClick={handleLeaveRoom} disabled={loading} className="w-[50%] h-10 bg-red-800 cursor-pointer hover:opacity-90 rounded-br-xl disabled:opacity-50">Yes</button>
        </div>
    </div>
}