import React, { useState } from "react";
import Quiz from "./Quiz";
import Dashboard from "./Dashboard";

function App() {
  const [topic, setTopic] = useState("");
  const [start, setStart] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-[400px]">
        <h1 className="text-2xl font-bold text-center mb-6">
          Adaptive Quiz App
        </h1>

        {!start ? (
          <>
            <input
              className="w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter topic (Java, Math...)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            />

            <button
              className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition"
              onClick={() => setStart(true)}
            >
              Start Quiz
            </button>

            <div className="mt-6">
              <Dashboard />
            </div>
          </>
        ) : (
          <Quiz topic={topic} />
        )}
      </div>
    </div>
  );
}

export default App;