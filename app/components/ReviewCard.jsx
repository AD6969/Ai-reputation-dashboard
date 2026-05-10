export default function ReviewCard({
  review,
}) {

  return (
    <div className="card p-6 mb-5 hover:shadow-md transition-all">

      <div className="flex justify-between items-start">

        <div>

          <div className="flex gap-3 mb-3 flex-wrap">

            <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm">
              ⭐ {review.rating}
            </span>

            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
              {review.source}
            </span>

          </div>

          <p className="text-lg text-gray-700">
            {review.review}
          </p>

        </div>

        <span
          className={`px-3 py-1 rounded-full text-sm
          ${
            review.sentiment ===
            "positive"
              ? "bg-green-100 text-green-700"
              : review.sentiment ===
                "negative"
              ? "bg-red-100 text-red-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {review.sentiment}
        </span>

      </div>

      <div className="flex gap-3 mt-4 flex-wrap">

        <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
          Emotion: {review.emotion}
        </span>

        <span className="bg-gray-100 px-3 py-1 rounded-full text-sm">
          Priority: {review.priority}
        </span>

        {review.topics?.map(
          (topic) => (
            <span
              key={topic}
              className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
            >
              {topic}
            </span>
          )
        )}

      </div>

      <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl mt-5">

        <p className="text-gray-500 text-sm mb-2">
          AI Reply
        </p>

        <p className="text-gray-700">
          {review.reply}
        </p>

      </div>

    </div>
  );
}