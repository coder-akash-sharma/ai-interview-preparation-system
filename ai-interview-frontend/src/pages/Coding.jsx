import { useState } from "react";
import {
  Code2,
  CheckCircle2,
  Play,
  Send,
  Clock,
  ChevronDown,
} from "lucide-react";

const questions = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    description:
      "Given an array of integers and a target value, return the indices of the two numbers that add up to the target.",
  },
  {
    id: 2,
    title: "Reverse Linked List",
    difficulty: "Easy",
    description:
      "Given the head of a singly linked list, reverse the list and return its head.",
  },
  {
    id: 3,
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    description:
      "Given a string, find the length of the longest substring without repeating characters.",
  },
  {
    id: 4,
    title: "Merge Intervals",
    difficulty: "Medium",
    description:
      "Given a collection of intervals, merge all overlapping intervals.",
  },
];

function Coding() {
  const [selectedQuestion, setSelectedQuestion] = useState(questions[0]);
  const [language, setLanguage] = useState("JavaScript");
  const [code, setCode] = useState(
`function twoSum(nums, target) {
  // Write your solution here

}`
  );

  const handleQuestionChange = (question) => {
    setSelectedQuestion(question);

    if (question.id === 1) {
      setCode(
`function twoSum(nums, target) {
  // Write your solution here

}`
      );
    } else {
      setCode(
`function solution(input) {
  // Write your solution here

}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="border-b bg-white">
        <div className="flex flex-col gap-3 px-6 py-5 md:flex-row md:items-center md:justify-between">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-blue-600 p-3">
              <Code2 size={24} className="text-white" />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Coding Practice
              </h1>

              <p className="text-sm text-slate-500">
                Improve your problem-solving skills.
              </p>
            </div>

          </div>

          {/* Timer */}
          <div className="flex items-center gap-2 rounded-lg border bg-slate-50 px-4 py-2">
            <Clock size={18} className="text-slate-500" />
            <span className="text-sm font-semibold text-slate-700">
              30:00
            </span>
          </div>

        </div>
      </header>

      <div className="grid min-h-[calc(100vh-100px)] lg:grid-cols-[280px_1fr]">

        {/* ================= QUESTIONS SIDEBAR ================= */}

        <aside className="border-r bg-white p-4">

          <h2 className="mb-4 px-2 text-sm font-bold text-slate-900">
            Problems
          </h2>

          <div className="space-y-2">

            {questions.map((question) => (
              <button
                key={question.id}
                onClick={() => handleQuestionChange(question)}
                className={`w-full rounded-xl p-4 text-left transition ${
                  selectedQuestion.id === question.id
                    ? "bg-blue-50 text-blue-700"
                    : "hover:bg-slate-50"
                }`}
              >

                <div className="flex items-center justify-between">

                  <span className="text-sm font-semibold">
                    {question.id}. {question.title}
                  </span>

                  {selectedQuestion.id === question.id && (
                    <CheckCircle2 size={17} />
                  )}

                </div>

                <span
                  className={`mt-2 inline-block text-xs font-medium ${
                    question.difficulty === "Easy"
                      ? "text-green-600"
                      : "text-orange-600"
                  }`}
                >
                  {question.difficulty}
                </span>

              </button>
            ))}

          </div>

        </aside>

        {/* ================= MAIN ================= */}

        <main className="grid lg:grid-cols-2">

          {/* Problem */}
          <section className="border-b p-6 lg:border-b-0 lg:border-r md:p-8">

            <div className="flex flex-wrap items-start justify-between gap-3">

              <div className="min-w-0 flex-1">
                <span className="text-sm font-semibold text-blue-600">
                  Problem {selectedQuestion.id}
                </span>

                <h2 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
                  {selectedQuestion.title}
                </h2>
              </div>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  selectedQuestion.difficulty === "Easy"
                    ? "bg-green-50 text-green-600"
                    : "bg-orange-50 text-orange-600"
                }`}
              >
                {selectedQuestion.difficulty}
              </span>

            </div>

            <p className="mt-6 text-sm leading-7 text-slate-600">
              {selectedQuestion.description}
            </p>

            {/* Example */}
            <div className="mt-8">

              <h3 className="font-bold text-slate-900">
                Example
              </h3>

              <div className="mt-3 rounded-xl bg-slate-900 p-5 font-mono text-sm text-slate-200">

                <p>
                  Input: nums = [2, 7, 11, 15], target = 9
                </p>

                <p className="mt-2">
                  Output: [0, 1]
                </p>

                <p className="mt-3 text-slate-400">
                  Explanation: nums[0] + nums[1] = 9
                </p>

              </div>

            </div>

            {/* Test cases */}
            <div className="mt-8">

              <h3 className="font-bold text-slate-900">
                Test Cases
              </h3>

              <div className="mt-3 space-y-3">

                <TestCase
                  input="[2,7,11,15], 9"
                  output="[0,1]"
                />

                <TestCase
                  input="[3,2,4], 6"
                  output="[1,2]"
                />

              </div>

            </div>

          </section>

          {/* ================= CODE EDITOR ================= */}

          <section className="flex flex-col bg-slate-900">

            {/* Editor Header */}
            <div className="flex items-center justify-between border-b border-slate-700 px-5 py-3">

              <div className="flex items-center gap-2 text-white">
                <Code2 size={18} />
                <span className="text-sm font-semibold">
                  Code Editor
                </span>
              </div>

              <div className="relative">

                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="appearance-none rounded-lg bg-slate-800 py-2 pl-3 pr-8 text-sm text-white outline-none"
                >
                  <option>JavaScript</option>
                  <option>Java</option>
                  <option>Python</option>
                  <option>C++</option>
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400"
                />

              </div>

            </div>

            {/* Text Editor */}
            <div className="flex-1 p-5">

              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck="false"
                className="h-[450px] w-full resize-none bg-transparent font-mono text-sm leading-7 text-slate-200 outline-none"
              />

            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-3 border-t border-slate-700 p-4">

              <button
                type="button"
                className="flex items-center gap-2 rounded-lg border border-slate-600 px-4 py-2 text-sm font-semibold text-slate-200 hover:bg-slate-800"
              >
                <Play size={16} />
                Run
              </button>

              <button
                type="button"
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Send size={16} />
                Submit
              </button>

            </div>

          </section>

        </main>

      </div>

    </div>
  );
}


/* ================= TEST CASE ================= */

function TestCase({ input, output }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">

      <p className="text-xs font-semibold text-slate-500">
        Input
      </p>

      <p className="mt-1 font-mono text-sm text-slate-800">
        {input}
      </p>

      <p className="mt-3 text-xs font-semibold text-slate-500">
        Expected Output
      </p>

      <p className="mt-1 font-mono text-sm text-green-600">
        {output}
      </p>

    </div>
  );
}

export default Coding;