export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full bg-background text-foreground flex">
      <div className="w-full lg:w-[49.75%] h-full py-2 px-4">
        <div className="relative w-full h-full flex justify-center items-center">
          <h1 className="absolute top-2 left-3 tracking-tighter text-3xl font-extrabold flex">
            <div><img className="h-8 w-8" src="/logo.svg" alt="logo" /></div>
            ChatX
          </h1>
          {children}
        </div>
      </div>
      <hr className="hidden lg:block h-full border border-foreground/20" />
      <div className="hidden lg:block w-[49.75%] h-full">
        <img className="object-cover w-full h-full" src="/wolf.jpg" alt="" />
      </div>
    </div>
  );
}