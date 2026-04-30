interface barProps{
    title: string
}

export default function Groupbar(props:barProps){
    return <div className="bg-blue-200 w-[90%] p-3 rounded-full">
        <div className="font-bold text-blue-400 text-center">{props.title}</div>
    </div>
}