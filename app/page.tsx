import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full h-full">
      <nav className="flex justify-between px-4 py-2 w-full h-full items-center">
        <div className="font-extrabold tracking-tighter text-3xl flex">
          <div><img className="h-8 w-8 text-foreground" src="/logo.svg" alt="logo" /></div>
          ChatX
        </div>
        <div className="flex gap-5">
          <Link href="/signup">
            <button className="bg-zinc-300 py-1 px-3 font-bold text-background rounded-xl hover:bg-zinc-400">
              Signup
            </button>
          </Link>
          <Link href="/login">
            <button className="bg-backgroundlight py-1 px-4 font-bold text-foreground rounded-xl hover:bg-background">
              Login
            </button>
          </Link>
        </div>
      </nav>
      <hr className="border border-foreground/20 mt-1" />
      <section className="flex flex-col items-center justify-center text-center px-4 py-32 gap-6">
        <h2 className="text-5xl font-bold tracking-tight">Real-time chat.</h2>
        <p className="text-lg opacity-60 max-w-md italic">
          Create rooms, invite friends, and chat instantly. Built with Next.js,
          Prisma, and WebSockets.
        </p>
        <button className="bg-foreground text-background px-6 py-3 rounded-xl font-semibold hover:bg-foregrounddark">
          Get Started
        </button>
      </section>
      <hr className="border border-foreground/20 mt-1" />
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 px-16 pb-10 w-full flex flex-col justify-center items-center mt-6">
        {[
          { icon: "⚡", title: "Instant", desc: "WebSocket powered messaging" },
          { icon: "🏠", title: "Rooms", desc: "Create and join chat rooms" },
          { icon: "🔐", title: "Secure", desc: "Auth protected routes" },
        ].map((f) => (
          <div key={f.title} className="border border-white/10 rounded-xl p-6">
            <div className="text-2xl mb-3">{f.icon}</div>
            <h3 className="font-semibold mb-1">{f.title}</h3>
            <p className="text-sm opacity-50">{f.desc}</p>
          </div>
        ))}
      </section>
      <div className="w-full text-sm italic flex justify-center pb-10">
        ✨ Created by quirbyte ✨
      </div>
    </main>
  );
}
