interface bubbleProps{
    sender: string;
    msg: string;
    time: string;
}

interface MyChatProps{
    msg:string;
    time:string;
}

export default function ChatBubble(props: bubbleProps){
    return <div className="">
        <div className="pl-1">{props.sender}</div>
        <div className="bg-blue-400 p-2 max-w-80 min-w-60 rounded-t-2xl rounded-br-2xl relative">
            <div className="text-white">{props.msg}</div>
            <div className="absolute bottom-0 right-3 text-[10px] text-white">
                {props.time}
            </div>
        </div>
    </div>
}

export function MyChatBubble(props:MyChatProps){
    return <div className="flex justify-end">
        <div className="bg-blue-100 max-w-80 min-w-60 text-blue-700 rounded-t-2xl rounded-bl-2xl p-2 mt-3 relative">
            <div className="">{props.msg}</div>
            <div className="absolute bottom-0 right-3 text-[10px] ">
                {props.time}
            </div>
        </div>
    </div>
}