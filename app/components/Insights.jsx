export default function Insights({ insights }) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">
        AI Insights
      </h2>

      <div className="space-y-3">
        {insights.map((item, index) => (
          <div
            key={index}
            className="bg-zinc-800 rounded-xl p-4"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}