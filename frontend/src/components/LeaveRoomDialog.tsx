
export interface LeaveCardProps{
    handleClose : () => void;

}

export default function LeaveDialog({handleClose}:LeaveCardProps){
    return <div className="relative h-60 w-60 bg-zinc-900 text-white rounded-xl flex justify-center items-center">
        <h1 className="absolute top-1 text-3xl font-bold text-center">Confirm Leave</h1>
        <p>Do yo want to leave the room?</p>
        <div className="flex absolute bottom-0 w-full">
            <button onClick={handleClose} className="w-[50%] cursor-pointer hover:opacity-90 h-10 bg-zinc-700 rounded-bl-xl">No</button>
            <button className="w-[50%] h-10 bg-red-800 cursor-pointer hover:opacity-90 rounded-br-xl">Yes</button>
        </div>
    </div>
}