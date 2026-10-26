import { useState } from "react";
import {
  Brain,
  Code2,
  Briefcase,
  ChevronRight,
  Sparkles,
  CheckCircle,
  Trophy,
} from "lucide-react";
import { API_BASE_URL } from "../services/api";

const roles = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Java Developer",
  "Python Developer",
  "AI/ML Engineer",
];

const difficulties = ["Easy", "Medium", "Hard"];

const questionBank = {
  "Frontend Developer": {
    Easy: [
      "What is the difference between HTML and CSS?",
      "What is the purpose of JavaScript in a web application?",
      "What is the difference between let and const in JavaScript?",
      "What is a component in React?",
      "What is responsive web design?",
    ],
    Medium: [
      "Explain the difference between let, const, and var in JavaScript.",
      "What is the Virtual DOM in React and why is it useful?",
      "Explain the difference between state and props in React.",
      "What is event delegation in JavaScript?",
      "How would you improve the performance of a React application?",
    ],
    Hard: [
      "Explain React reconciliation and how the Virtual DOM works internally.",
      "What are React hooks and how would you create a custom hook?",
      "Explain closures in JavaScript with a practical example.",
      "How would you optimize a large-scale React application?",
      "Explain different strategies for managing state in a complex React application.",
    ],
  },

  "Backend Developer": {
    Easy: [
      "What is an API?",
      "What is the difference between HTTP and HTTPS?",
      "What is REST API?",
      "What is a database?",
      "What is authentication?",
    ],
    Medium: [
      "Explain the difference between authentication and authorization.",
      "What are HTTP status codes and why are they important?",
      "What is middleware in Node.js?",
      "Explain how JWT authentication works.",
      "What is the difference between SQL and NoSQL databases?",
    ],
    Hard: [
      "How would you design a scalable REST API?",
      "Explain database indexing and when you would use it.",
      "How would you handle millions of API requests?",
      "Explain caching strategies for a backend application.",
      "How would you secure a production REST API?",
    ],
  },

  "Full Stack Developer": {
    Easy: [
      "What is the role of a frontend in a web application?",
      "What is the role of a backend?",
      "What is an API?",
      "What is a database?",
      "What is the purpose of Git?",
    ],
    Medium: [
      "Explain how a frontend communicates with a backend.",
      "What is CORS and why does it occur?",
      "Explain the role of Node.js in a full-stack application.",
      "How does authentication work in a full-stack application?",
      "Explain the difference between SQL and NoSQL databases.",
    ],
    Hard: [
      "How would you design a scalable full-stack application?",
      "Explain how you would implement secure authentication.",
      "How would you optimize a full-stack application for performance?",
      "How would you design an application for high availability?",
      "Explain how caching can improve a full-stack application.",
    ],
  },

  "Java Developer": {
    Easy: [
      "What is Java?",
      "What is the difference between JDK, JRE, and JVM?",
      "What is a class in Java?",
      "What is an object in Java?",
      "What is inheritance in Java?",
    ],
    Medium: [
      "Explain the four pillars of OOP.",
      "What is the difference between method overloading and overriding?",
      "What is the difference between ArrayList and LinkedList?",
      "What is exception handling in Java?",
      "Explain the difference between an interface and an abstract class.",
    ],
    Hard: [
      "Explain how JVM memory management works.",
      "What is multithreading in Java?",
      "Explain Java garbage collection.",
      "What is the difference between HashMap and ConcurrentHashMap?",
      "How would you improve the performance of a Java application?",
    ],
  },

  "Python Developer": {
    Easy: [
      "What is Python?",
      "What is the difference between a list and a tuple?",
      "What are Python dictionaries?",
      "What is a function in Python?",
      "What is a Python module?",
    ],
    Medium: [
      "Explain the difference between list, tuple, set, and dictionary.",
      "What are decorators in Python?",
      "What is exception handling in Python?",
      "Explain list comprehension with an example.",
      "What is the difference between shallow copy and deep copy?",
    ],
    Hard: [
      "Explain the Python Global Interpreter Lock.",
      "How does memory management work in Python?",
      "Explain generators and iterators in Python.",
      "How would you optimize a slow Python application?",
      "Explain asynchronous programming in Python.",
    ],
  },

  "AI/ML Engineer": {
    Easy: [
      "What is Artificial Intelligence?",
      "What is Machine Learning?",
      "What is the difference between AI and Machine Learning?",
      "What is supervised learning?",
      "What is a dataset?",
    ],
    Medium: [
      "Explain the difference between supervised and unsupervised learning.",
      "What is overfitting and how can you prevent it?",
      "Explain the difference between classification and regression.",
      "What is feature engineering?",
      "What is the purpose of train, validation, and test datasets?",
    ],
    Hard: [
      "Explain the bias-variance tradeoff.",
      "How would you handle class imbalance in a machine learning dataset?",
      "Explain gradient descent and its variants.",
      "How would you deploy a machine learning model in production?",
      "What problems can occur when a machine learning model performs well during training but poorly in production?",
    ],
  },
};


// =====================================================
// MAIN INTERVIEW PAGE
// =====================================================

function Interview() {
  const [role, setRole] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [started, setStarted] = useState(false);

  const startInterview = () => {
    if (!role || !difficulty) return;

    setStarted(true);
  };

  if (started) {
    return (
      <InterviewSession
        role={role}
        difficulty={difficulty}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div>
          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-blue-600 p-3">
              <Brain size={25} className="text-white" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                AI Interview
              </h1>

              <p className="mt-1 text-slate-500">
                Practice personalized interviews with your AI coach.
              </p>
            </div>

          </div>
        </div>


        {/* Setup Card */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">

          <div className="flex items-center gap-3">

            <Sparkles
              className="text-blue-600"
              size={22}
            />

            <h2 className="text-xl font-bold text-slate-900">
              Set Up Your Interview
            </h2>

          </div>

          <p className="mt-2 text-sm text-slate-500">
            Choose your role and difficulty level before starting.
          </p>


          {/* Job Role */}
          <div className="mt-8">

            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Select Job Role
            </label>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

              {roles.map((item) => (

                <button
                  key={item}
                  type="button"
                  onClick={() => setRole(item)}
                  className={`rounded-xl border p-5 text-left transition ${
                    role === item
                      ? "border-blue-500 bg-blue-50 ring-2 ring-blue-100"
                      : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                  }`}
                >

                  <div className="flex items-center gap-3">

                    <div className="rounded-lg bg-slate-100 p-2">
                      <Briefcase
                        size={20}
                        className="text-blue-600"
                      />
                    </div>

                    <span className="text-sm font-semibold text-slate-800">
                      {item}
                    </span>

                  </div>

                </button>

              ))}

            </div>

          </div>


          {/* Difficulty */}
          <div className="mt-8">

            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Difficulty Level
            </label>

            <div className="flex flex-wrap gap-3">

              {difficulties.map((item) => (

                <button
                  key={item}
                  type="button"
                  onClick={() => setDifficulty(item)}
                  className={`rounded-lg border px-6 py-3 text-sm font-semibold transition ${
                    difficulty === item
                      ? "border-blue-500 bg-blue-600 text-white"
                      : "border-slate-300 bg-white text-slate-600 hover:border-blue-300"
                  }`}
                >
                  {item}
                </button>

              ))}

            </div>

          </div>


          {/* Start */}
          <button
            type="button"
            onClick={startInterview}
            disabled={!role || !difficulty}
            className={`mt-10 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-semibold transition ${
              role && difficulty
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "cursor-not-allowed bg-slate-200 text-slate-400"
            }`}
          >

            Start AI Interview

            <ChevronRight size={19} />

          </button>

        </div>


        {/* Info Cards */}
        <div className="mt-6 grid gap-5 md:grid-cols-3">

          <InfoCard
            icon={<Brain size={21} />}
            title="AI Questions"
            text="Questions are personalized according to your selected role."
          />

          <InfoCard
            icon={<Code2 size={21} />}
            title="Technical Practice"
            text="Practice technical questions relevant to your technology stack."
          />

          <InfoCard
            icon={<Sparkles size={21} />}
            title="AI Feedback"
            text="Get feedback on your answers and improve your performance."
          />

        </div>

      </div>
    </div>
  );
}


// =====================================================
// INTERVIEW SESSION
// =====================================================

function InterviewSession({
  role,
  difficulty,
}) {

  const questions =
    questionBank[role]?.[difficulty] || [];

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [answer, setAnswer] =
    useState("");

  const [submittedAnswers, setSubmittedAnswers] =
    useState([]);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [finished, setFinished] =
    useState(false);


  // ===================================================
  // SUBMIT ANSWER
  // ===================================================

  const submitAnswer = async () => {

    if (!answer.trim()) return;

    setError("");

    const newAnswers = [
      ...submittedAnswers,
      {
        question: questions[currentQuestion],
        answer: answer.trim(),
      },
    ];

    // -----------------------------------------------
    // If this is NOT the last question
    // -----------------------------------------------

    if (currentQuestion < questions.length - 1) {

      setSubmittedAnswers(newAnswers);

      setAnswer("");

      setCurrentQuestion((prev) => prev + 1);

      return;
    }


    // -----------------------------------------------
    // Last question
    // Save interview to MongoDB
    // -----------------------------------------------

    try {

      setSaving(true);

      const token = localStorage.getItem("token");

      if (!token) {
        setError("You are not logged in. Please login again.");
        setSaving(false);
        return;
      }


      const response = await fetch(
        `${API_BASE_URL}/api/interview/save`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          body: JSON.stringify({
            role,
            difficulty,
            answers: newAnswers,
          }),
        }
      );


      const data = await response.json();


      if (!response.ok) {

        throw new Error(
          data.message ||
          "Failed to save interview."
        );

      }


      console.log(
        "Interview saved successfully:",
        data
      );


      setSubmittedAnswers(newAnswers);

      setFinished(true);

    } catch (error) {

      console.error(
        "Save interview error:",
        error
      );

      setError(
        error.message ||
        "Something went wrong while saving the interview."
      );

    } finally {

      setSaving(false);

    }
  };


  // ===================================================
  // RESULT
  // ===================================================

  if (finished) {

    return (
      <InterviewResult
        role={role}
        difficulty={difficulty}
        answers={submittedAnswers}
      />
    );
  }


  const progress =
    ((currentQuestion + 1) / questions.length) * 100;


  return (

    <div className="min-h-screen bg-slate-50 p-6 md:p-8">

      <div className="mx-auto max-w-4xl">


        {/* Interview Header */}
        <div className="rounded-2xl bg-blue-600 p-6 text-white">

          <p className="text-sm text-blue-100">
            {role} • {difficulty}
          </p>

          <h1 className="mt-2 text-2xl font-bold">
            AI Interview Session
          </h1>


          {/* Progress */}
          <div className="mt-5 h-2 rounded-full bg-white/20">

            <div
              className="h-full rounded-full bg-white transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />

          </div>


          <p className="mt-2 text-sm text-blue-100">
            Question {currentQuestion + 1} of{" "}
            {questions.length}
          </p>

        </div>


        {/* Question Card */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 md:p-8">

          <div className="flex items-center gap-3">

            <div className="rounded-lg bg-blue-50 p-2">

              <Brain
                className="text-blue-600"
                size={20}
              />

            </div>

            <span className="text-sm font-semibold text-blue-600">
              AI Interviewer
            </span>

          </div>


          {/* Question */}
          <h2 className="mt-6 text-xl font-bold leading-8 text-slate-900">

            {questions[currentQuestion]}

          </h2>


          {/* Answer */}
          <textarea
            value={answer}
            onChange={(e) =>
              setAnswer(e.target.value)
            }
            placeholder="Type your answer here..."
            rows={8}
            disabled={saving}
            className="mt-6 w-full resize-none rounded-xl border border-slate-300 p-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
          />


          {/* Error */}
          {error && (

            <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>

          )}


          {/* Submit */}
          <div className="mt-5 flex justify-end">

            <button
              type="button"
              onClick={submitAnswer}
              disabled={
                !answer.trim() ||
                saving
              }
              className={`rounded-xl px-6 py-3 font-semibold transition ${
                answer.trim() && !saving
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "cursor-not-allowed bg-slate-200 text-slate-400"
              }`}
            >

              {saving
                ? "Saving Interview..."
                : currentQuestion === questions.length - 1
                ? "Finish Interview"
                : "Submit Answer →"}

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}


// =====================================================
// RESULT PAGE
// =====================================================

function InterviewResult({
  role,
  difficulty,
  answers,
}) {

  return (

    <div className="min-h-screen bg-slate-50 p-6 md:p-8">

      <div className="mx-auto max-w-4xl">


        {/* Result Header */}
        <div className="rounded-2xl bg-blue-600 p-8 text-center text-white">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20">

            <Trophy size={32} />

          </div>

          <h1 className="mt-4 text-3xl font-bold">
            Interview Completed!
          </h1>

          <p className="mt-2 text-blue-100">
            {role} • {difficulty}
          </p>

        </div>


        {/* Temporary Score */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-8 text-center">

          <p className="text-sm font-semibold text-slate-500">
            Interview Submitted
          </p>

          <div className="mt-3 text-4xl font-bold text-blue-600">
            5 / 5
          </div>

          <p className="mt-3 text-slate-500">
            Your answers have been saved successfully.
          </p>

          <p className="mt-2 text-xs text-slate-400">
            AI evaluation will be added later.
          </p>

        </div>


        {/* Answers */}
        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">

          <h2 className="text-xl font-bold text-slate-900">
            Your Answers
          </h2>


          <div className="mt-5 space-y-5">

            {answers.map((item, index) => (

              <div
                key={index}
                className="rounded-xl border border-slate-200 p-5"
              >

                <div className="flex items-start gap-3">

                  <CheckCircle
                    size={20}
                    className="mt-1 shrink-0 text-green-600"
                  />

                  <div>

                    <p className="font-semibold text-slate-900">
                      Question {index + 1}
                    </p>

                    <p className="mt-2 text-sm leading-6 text-slate-600">
                      {item.question}
                    </p>


                    <div className="mt-4 rounded-lg bg-slate-50 p-4">

                      <p className="text-xs font-semibold uppercase text-slate-400">
                        Your Answer
                      </p>

                      <p className="mt-2 text-sm leading-6 text-slate-700">
                        {item.answer}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
}


// =====================================================
// INFO CARD
// =====================================================

function InfoCard({
  icon,
  title,
  text,
}) {

  return (

    <div className="rounded-2xl border border-slate-200 bg-white p-5">

      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
        {icon}
      </div>

      <h3 className="mt-4 font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-500">
        {text}
      </p>

    </div>
  );
}


export default Interview;