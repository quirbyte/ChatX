import { XIcon } from "lucide-react";

interface DialogProps {
  setRoomName: (value: string) => void;
  setJoinRoomCode: (value: string) => void;
  joinRoom: () => void;
  createRoom: () => void;
  closeDialog: () => void;
}

export default function JoinDialog(props: DialogProps) {
  const { closeDialog, createRoom, setRoomName, joinRoom, setJoinRoomCode } =
    props;
  return (
    <div className="relative h-100 w-100 bg-backgroundlight rounded-2xl flex flex-col text-white items-center p-7 gap-5">
      <div
        className="absolute top-2 right-2 cursor-default"
        onClick={closeDialog}
      >
        <XIcon size={30} />
      </div>
      <div className="flex flex-col gap-2.5 w-full">
        <label>ROOM CODE:</label>
        <input
          type="text"
          onChange={(e) => setJoinRoomCode(e.target.value)}
          placeholder="Enter Room Code"
          className="bg-blue-900 w-full focus:outline-0 p-3 rounded-full"
        />
        <button
          onClick={joinRoom}
          className="w-full p-3 bg-white text-black font-bold text-xl mt-2 rounded-full"
        >
          JOIN ROOM
        </button>
      </div>
      <hr className="border border-blue-100 h-1[2px] w-full " />
      <input
        onChange={(e) => setRoomName(e.target.value)}
        type="text"
        placeholder="Enter Room Name"
        className="bg-blue-900 w-full focus:outline-0 p-3 rounded-full"
      />
      <button
        onClick={createRoom}
        className="w-full p-3 bg-white text-black font-bold text-xl mt-2 rounded-full"
      >
        CREATE ROOM
      </button>
    </div>
  );
}
