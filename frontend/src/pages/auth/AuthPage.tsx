import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function AuthPage() {
    const [index, setIndex] = useState(0);
    const chatQuotes = [
        {
            quote: "The single biggest problem in communication is the illusion that it has taken place.",
            author: "George Bernard Shaw"
        },
        {
            quote: "Conversation is a meeting of minds with different memories and habits.",
            author: "Ralph Waldo Emerson"
        },
        {
            quote: "Words are, of course, the most powerful drug used by mankind.",
            author: "Rudyard Kipling"
        },
        {
            quote: "Kind words can be short and easy to speak, but their echoes are truly endless.",
            author: "Mother Teresa"
        },
        {
            quote: "The art of conversation is the art of hearing as well as of being heard.",
            author: "William Hazlitt"
        },
        {
            quote: "Speech is silver, silence is golden.",
            author: "Thomas Carlyle"
        },
        {
            quote: "Wise men speak because they have something to say; Fools because they have to say something.",
            author: "Plato"
        },
    ];

    useEffect(() => {
        setInterval(() => {
           setIndex((i) => (i + 1) % chatQuotes.length);
        }, 4000);
    }, []);

    return (
        <div className="relative h-screen w-screen bg-zinc-950 flex">
            <div className="absolute top-3 left-3">
                <h1 className="text-4xl flex gap-2 items-center">
                    <h1 className="text-4xl text-white font-extrabold tracking-tighter">ChatX</h1>
                    <img className="h-8 w-8" src="/icon.svg" alt="logo" />
                </h1>
                <p className="text-[10px] text-zinc-700">Trusted by millions of users worldwide</p>
            </div>
            <div className="h-full lg:w-1/2 w-full flex items-center justify-center">
                <Outlet />
            </div>

            <div className="relative lg:block hidden h-full w-1/2">
                <img
                    className="h-full w-full object-cover"
                    src="/cat.jpg"
                    alt="cat"
                />
                <div className="absolute bottom-2 p-3 flex justify-center w-full">
                    <div className="absolute bottom-0 p-3 flex justify-center w-full">
                        <div className="relative bg-white/10 backdrop-blur-lg w-full h-30 rounded-3xl p-8 border border-white/20 transition-all duration-700 ease-in-out flex flex-col justify-center">

                            <h1 className="text-xl md:text-2xl italic text-white leading-relaxed font-light">
                                "{chatQuotes[index].quote}"
                            </h1>

                            <p className=" absolute bottom-4 right-5 mt-4 text-right italic font-bold text-amber-200 text-lg tracking-tight">
                                — {chatQuotes[index].author}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}