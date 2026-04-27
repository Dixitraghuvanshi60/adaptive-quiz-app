import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

function Quiz({ topic }) {
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const res = await fetch(
        "https://opentdb.com/api.php?amount=25&category=18&difficulty=medium&type=multiple"
      );
      const data = await res.json();

      const formatted = data.results.map((q) => {
        const options = [...q.incorrect_answers, q.correct_answer]
          .sort(() => Math.random() - 0.5);

        return {
          question: decodeHTML(q.question),
          options: options.map(decodeHTML),
          answer: decodeHTML(q.correct_answer),
        };
      });

      setQuestions(formatted);
      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Error loading questions");
    }
  };

  // Fix weird symbols like &quot;
  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const handleAnswer = (opt) => {
    setSelected(opt);

    if (opt === questions[index].answer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      setSelected(null);

      if (index + 1 < questions.length) {
        setIndex(index + 1);
      } else {
        finishQuiz();
      }
    }, 800);
  };

  const finishQuiz = () => {
    let data = JSON.parse(localStorage.getItem("progress")) || {};

    if (!data[topic]) {
      data[topic] = { attempts: 0, weak: 0 };
    }

    data[topic].attempts += 1;
    if (score < 3) data[topic].weak += 1;

    localStorage.setItem("progress", JSON.stringify(data));

    alert(`Score: ${score}/${questions.length}`);
    window.location.reload();
  };

  if (loading) {
    return <p className="text-center">Loading questions...</p>;
  }

  const q = questions[index];

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 h-2 rounded">
        <div
          className="bg-blue-500 h-2 rounded"
          style={{
            width: `${((index + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      <h2 className="text-lg font-semibold">{q.question}</h2>

      <div className="space-y-3">
        {q.options.map((opt, i) => {
          let color = "bg-gray-100";

          if (selected) {
            if (opt === q.answer) color = "bg-green-200";
            else if (opt === selected) color = "bg-red-200";
          }

          return (
            <button
              key={i}
              onClick={() => handleAnswer(opt)}
              className={`w-full p-3 rounded-lg transition ${color}`}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <p className="text-sm text-gray-500">
        Question {index + 1} / {questions.length}
      </p>
    </motion.div>
  );
}

export default Quiz;