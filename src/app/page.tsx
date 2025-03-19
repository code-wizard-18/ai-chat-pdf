export default function Home() {
  return (
    <div className="flex flex-row h-screen w-full">
      <div className="bg-red-500 h-full flex-1">
        <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">Section</div>
      </div>
      <div className="bg-blue-500 h-full flex-1">
        <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">Section</div>
      </div>
      <div className="bg-green-500 h-full flex-1">
        <div className="w-full h-full flex items-center justify-center text-white text-2xl font-bold">Section</div>
      </div>
    </div>
  );
}
