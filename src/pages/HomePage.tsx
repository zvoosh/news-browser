export default function HomePage() {
  return (
    <div className="w-full h-full pt-10">
      {/* title section */}
      <div className="max-w-[800px]">
        <h1 className="text-5xl font-medium leading-17">
          <span className="font-bold">Upgrade</span> your tech life with how-to{" "}
          <span className="font-bold">advice</span>,{" "}
          <span className="font-bold">news</span> and{" "}
          <span className="font-bold">tips</span>.
        </h1>
      </div>
      <div className="h-0.5 w-screen absolute left-0 mt-10 bg-white"></div>
      {/* Latest News */}
      <div className=" flex gap-5 mt-20">
        <div className="w-1/2 bg-amber-300">1</div>
        <div className="w-1/2 flex flex-col gap-5">
          <div className="w-full h-1/2 bg-green-200">2</div>
          <div className="w-full h-1/2 bg-red-500">3</div>
        </div>
      </div>
    </div>
  );
}
