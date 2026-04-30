"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      alert("Signed up successfuly!!");
      router.push("/login");
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col">
      <h5 className="font-bold text-5xl tracking-tight text-center">Signup</h5>
      <p className="text-[14px] text-foregrounddark text-center mt-1.5">
        Signup to ChatX
      </p>
      <form
        onSubmit={handleSubmit}
        className="relative h-100 w-100 bg-backgroundlight rounded-xl mt-1 p-4"
      >
        <div className="flex flex-col gap-1 mt-4">
          <label>Username:</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-background rounded-full focus:outline-none py-2 px-4"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-1 mt-6">
          <label>Email:</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-background rounded-full focus:outline-none py-2 px-4"
            type="email"
          />
        </div>
        <div className="flex flex-col gap-1 mt-6">
          <label>Password:</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-background rounded-full focus:outline-none py-2 px-4"
            type="password"
          />
        </div>
        <div className="absolute bottom-2 flex flex-col items-center justify-center">
          <button
            type="submit"
            className="px-40 rounded-full text-center bg-zinc-300 text-black font-bold hover:bg-zinc-400 py-3"
          >
            Submit
          </button>
          <Link className="text-sm hover:underline" href="/login">
            Already have an account? Login here.
          </Link>
        </div>
      </form>
    </div>
  );
}
