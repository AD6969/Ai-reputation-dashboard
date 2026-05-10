export default function SentimentBar({ label, value, total, color }) {
  const percentage = ((value / total) * 100).toFixed(0);

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span>{label}</span>
        <span>{percentage}%</span>
      </div>

      <div className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden">
        <div
          className={`h-3 rounded-full ${color}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}