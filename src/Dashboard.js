import React from "react";

function Dashboard() {
  const data = JSON.parse(localStorage.getItem("progress")) || {};

  // 🔥 Clear all progress
  const clearData = () => {
    const confirmDelete = window.confirm("Are you sure you want to clear all progress?");
    if (confirmDelete) {
      localStorage.removeItem("progress");
      window.location.reload();
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-3">Progress Dashboard</h2>

      {/* 🔴 Clear Button */}
      <button
        onClick={clearData}
        className="mb-4 w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
      >
        Clear Progress
      </button>

      {/* ❌ No Data */}
      {Object.keys(data).length === 0 && (
        <p className="text-gray-500 text-sm">No progress yet</p>
      )}

      {/* 📊 Data Cards */}
      <div className="space-y-4">
        {Object.keys(data).map((topic) => {
          const attempts = data[topic].attempts;
          const weak = data[topic].weak;

          // 🧠 Strength calculation
          const strength = Math.max(0, 100 - weak * 20);

          return (
            <div
              key={topic}
              className="p-4 bg-gray-50 rounded-xl shadow-md"
            >
              <p className="font-semibold text-gray-800">{topic}</p>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 h-2 rounded mt-2">
                <div
                  className="bg-green-500 h-2 rounded"
                  style={{ width: `${strength}%` }}
                />
              </div>

              <div className="flex justify-between mt-2 text-sm">
                <span className="text-gray-600">
                  Attempts: {attempts}
                </span>
                <span className="text-red-500">
                  Weak: {weak}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Dashboard;