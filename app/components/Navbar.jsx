export default function Navbar({
  search,
  setSearch,
}) {

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-50">

      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          AI Reputation Dashboard
        </h1>
      </div>

      <div className="flex items-center gap-4">

        <input
          type="text"
          placeholder="Search reviews..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-72 px-4 py-2 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
          A
        </div>

      </div>

    </div>
  );
}