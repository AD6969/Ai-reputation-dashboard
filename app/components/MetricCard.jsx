export default function MetricCard({
  title,
  value,
  color,
}) {

  return (
    <div className="metric-card">

      <p className="text-gray-500 text-sm">
        {title}
      </p>

      <h2
        className={`text-4xl font-bold mt-3 ${color}`}
      >
        {value}
      </h2>

    </div>
  );
}