export default function Filters({
  sentimentFilter,
  setSentimentFilter,
}) {

  return (
    <div className="flex gap-4 mb-6">

      <select
        value={sentimentFilter}
        onChange={(e) =>
          setSentimentFilter(
            e.target.value
          )
        }
        className="px-4 py-3 rounded-xl border border-gray-300 bg-white"
      >

        <option value="all">
          All Reviews
        </option>

        <option value="positive">
          Positive
        </option>

        <option value="neutral">
          Neutral
        </option>

        <option value="negative">
          Negative
        </option>

      </select>

    </div>
  );
}