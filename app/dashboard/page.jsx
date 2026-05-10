"use client";

import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MetricCard from "../components/MetricCard";
import Filters from "../components/Filters";
import ReviewCard from "../components/ReviewCard";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function DashboardPage() {

  const [reviews, setReviews] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [
    sentimentFilter,
    setSentimentFilter,
  ] = useState("all");

  const [activeTab, setActiveTab] =
    useState("Dashboard");

  useEffect(() => {

    const fetchReviews =
      async () => {

        try {

          const res =
            await fetch(
              "http://127.0.0.1:8000/reviews"
            );

          const data =
            await res.json();

          setReviews(data);

        } catch (error) {

          console.log(error);

        } finally {

          setLoading(false);

        }
      };

    fetchReviews();

  }, []);

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  const filteredReviews =
    reviews.filter((review) => {

      const searchMatch =
        review.review
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const sentimentMatch =
        sentimentFilter === "all"
          ? true
          : review.sentiment ===
            sentimentFilter;

      return (
        searchMatch &&
        sentimentMatch
      );
    });

  const positive =
    reviews.filter(
      (r) =>
        r.sentiment ===
        "positive"
    ).length;

  const neutral =
    reviews.filter(
      (r) =>
        r.sentiment ===
        "neutral"
    ).length;

  const negative =
    reviews.filter(
      (r) =>
        r.sentiment ===
        "negative"
    ).length;

  const chartData = [
    {
      name: "Positive",
      value: positive,
    },
    {
      name: "Neutral",
      value: neutral,
    },
    {
      name: "Negative",
      value: negative,
    },
  ];

  const COLORS = [
    "#22c55e",
    "#facc15",
    "#ef4444",
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="flex-1">

        <Navbar
          search={search}
          setSearch={setSearch}
        />

        <div className="p-6">

          {activeTab ===
            "Dashboard" && (
            <>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                <MetricCard
                  title="Total Reviews"
                  value={
                    reviews.length
                  }
                  color="text-blue-600"
                />

                <MetricCard
                  title="Positive Reviews"
                  value={positive}
                  color="text-green-600"
                />

                <MetricCard
                  title="Negative Reviews"
                  value={negative}
                  color="text-red-600"
                />

              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                <div className="bg-white rounded-2xl shadow-sm p-6">

                  <h2 className="text-2xl font-bold mb-5">
                    Sentiment Overview
                  </h2>

                  <ResponsiveContainer
                    width="100%"
                    height={300}
                  >

                    <PieChart>

                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label
                      >

                        {chartData.map(
                          (
                            entry,
                            index
                          ) => (
                            <Cell
                              key={index}
                              fill={
                                COLORS[
                                  index
                                ]
                              }
                            />
                          )
                        )}

                      </Pie>

                      <Tooltip />

                    </PieChart>

                  </ResponsiveContainer>

                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6">

                  <h2 className="text-2xl font-bold mb-5">
                    AI Insights
                  </h2>

                  <div className="space-y-4">

                    <div className="bg-blue-50 p-4 rounded-xl">
                      Customers highly praise ambience and food quality.
                    </div>

                    <div className="bg-red-50 p-4 rounded-xl">
                      Most complaints relate to slow service.
                    </div>

                    <div className="bg-green-50 p-4 rounded-xl">
                      Positive reviews strongly mention staff behavior.
                    </div>

                  </div>

                </div>

              </div>

            </>
          )}

          {activeTab ===
            "Reviews" && (
            <div className="mt-4">

              <Filters
                sentimentFilter={
                  sentimentFilter
                }
                setSentimentFilter={
                  setSentimentFilter
                }
              />

              <div className="space-y-5">

                {filteredReviews.map(
                  (
                    review,
                    index
                  ) => (
                    <ReviewCard
                      key={index}
                      review={review}
                    />
                  )
                )}

              </div>

            </div>
          )}

          {activeTab ===
            "Analytics" && (
            <div className="bg-white rounded-2xl p-6">

              <h2 className="text-3xl font-bold mb-6">
                Analytics
              </h2>

              <div className="space-y-4">

                <div className="bg-green-50 p-5 rounded-xl">
                  Positive Reviews: {positive}
                </div>

                <div className="bg-yellow-50 p-5 rounded-xl">
                  Neutral Reviews: {neutral}
                </div>

                <div className="bg-red-50 p-5 rounded-xl">
                  Negative Reviews: {negative}
                </div>

              </div>

            </div>
          )}

          {activeTab ===
            "Settings" && (
            <div className="bg-white rounded-2xl p-6">

              <h2 className="text-3xl font-bold mb-6">
                Settings
              </h2>

              <p>
                AI Reputation Dashboard Settings Panel
              </p>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}