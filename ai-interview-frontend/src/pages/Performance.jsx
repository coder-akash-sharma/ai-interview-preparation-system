import {
  BarChart3,
  TrendingUp,
  Award,
  Target,
  CheckCircle2,
  AlertCircle,
  History,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";


// =====================================================
// PERFORMANCE DATA
// =====================================================

const performanceData = [
  { name: "Technical", score: 82 },
  { name: "Communication", score: 76 },
  { name: "Problem Solving", score: 88 },
  { name: "Confidence", score: 72 },
];


// =====================================================
// WEEKLY PROGRESS
// =====================================================

const progressData = [
  { name: "Week 1", score: 55 },
  { name: "Week 2", score: 63 },
  { name: "Week 3", score: 71 },
  { name: "Week 4", score: 82 },
];


// =====================================================
// PERFORMANCE PAGE
// =====================================================

function Performance() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">

      <div className="mx-auto max-w-6xl">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-blue-600 p-3">
              <BarChart3 size={24} className="text-white" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                Performance
              </h1>

              <p className="mt-1 text-slate-500">
                Track your interview preparation and improvement.
              </p>
            </div>

          </div>


          {/* HEADER ACTIONS */}

          <div className="flex flex-wrap items-center gap-3">

            {/* Improving Badge */}

            <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">

              <TrendingUp
                size={18}
                className="text-green-600"
              />

              Improving

            </div>


            {/* Interview History */}

            <button
              onClick={() => navigate("/interview-history")}
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
            >
              <History size={18} />

              Interview History
            </button>

          </div>

        </div>


        {/* =====================================================
            SCORE CARDS
        ===================================================== */}

        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {/* Overall Score */}

          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <div className="mb-4 flex items-center justify-between">

              <div className="rounded-lg bg-blue-100 p-2">
                <Award
                  size={20}
                  className="text-blue-600"
                />
              </div>

              <span className="text-sm font-medium text-green-600">
                +8%
              </span>

            </div>

            <p className="text-sm text-slate-500">
              Overall Score
            </p>

            <h2 className="mt-1 text-3xl font-bold text-slate-900">
              82%
            </h2>

          </div>


          {/* Technical */}

          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <div className="mb-4 flex items-center justify-between">

              <div className="rounded-lg bg-purple-100 p-2">
                <Target
                  size={20}
                  className="text-purple-600"
                />
              </div>

              <span className="text-sm font-medium text-green-600">
                +5%
              </span>

            </div>

            <p className="text-sm text-slate-500">
              Technical
            </p>

            <h2 className="mt-1 text-3xl font-bold text-slate-900">
              82%
            </h2>

          </div>


          {/* Problem Solving */}

          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <div className="mb-4 flex items-center justify-between">

              <div className="rounded-lg bg-green-100 p-2">
                <CheckCircle2
                  size={20}
                  className="text-green-600"
                />
              </div>

              <span className="text-sm font-medium text-green-600">
                +12%
              </span>

            </div>

            <p className="text-sm text-slate-500">
              Problem Solving
            </p>

            <h2 className="mt-1 text-3xl font-bold text-slate-900">
              88%
            </h2>

          </div>


          {/* Confidence */}

          <div className="rounded-2xl bg-white p-5 shadow-sm">

            <div className="mb-4 flex items-center justify-between">

              <div className="rounded-lg bg-orange-100 p-2">
                <TrendingUp
                  size={20}
                  className="text-orange-600"
                />
              </div>

              <span className="text-sm font-medium text-green-600">
                +6%
              </span>

            </div>

            <p className="text-sm text-slate-500">
              Confidence
            </p>

            <h2 className="mt-1 text-3xl font-bold text-slate-900">
              72%
            </h2>

          </div>

        </div>


        {/* =====================================================
            CHARTS
        ===================================================== */}

        <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">


          {/* =====================================================
              RADAR CHART
          ===================================================== */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <div className="mb-4">

              <h2 className="text-xl font-bold text-slate-900">
                Performance Overview
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your performance across key interview skills.
              </p>

            </div>


            <div className="h-[350px] w-full">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="75%"
                  data={performanceData}
                >

                  <PolarGrid />

                  <PolarAngleAxis
                    dataKey="name"
                    tick={{
                      fill: "#475569",
                      fontSize: 13,
                    }}
                  />

                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 100]}
                    tick={{
                      fill: "#94a3b8",
                      fontSize: 11,
                    }}
                  />

                  <Radar
                    name="Score"
                    dataKey="score"
                    stroke="#2563eb"
                    fill="#2563eb"
                    fillOpacity={0.25}
                    strokeWidth={2}
                  />

                  <Tooltip />

                </RadarChart>

              </ResponsiveContainer>

            </div>

          </div>


          {/* =====================================================
              LINE CHART
          ===================================================== */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <div className="mb-4">

              <h2 className="text-xl font-bold text-slate-900">
                Weekly Progress
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your interview preparation improvement over time.
              </p>

            </div>


            <div className="h-[350px] w-full">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <LineChart
                  data={progressData}
                  margin={{
                    top: 10,
                    right: 20,
                    left: 0,
                    bottom: 10,
                  }}
                >

                  <CartesianGrid
                    strokeDasharray="3 3"
                  />

                  <XAxis
                    dataKey="name"
                  />

                  <YAxis
                    domain={[0, 100]}
                  />

                  <Tooltip />

                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{
                      r: 5,
                    }}
                    activeDot={{
                      r: 7,
                    }}
                  />

                </LineChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>


        {/* =====================================================
            STRENGTHS & WEAKNESSES
        ===================================================== */}

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">


          {/* Strengths */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center gap-3">

              <div className="rounded-lg bg-green-100 p-2">
                <CheckCircle2
                  size={20}
                  className="text-green-600"
                />
              </div>

              <h2 className="text-xl font-bold text-slate-900">
                Strengths
              </h2>

            </div>


            <div className="space-y-4">

              <div>
                <div className="mb-2 flex justify-between">

                  <span className="text-sm font-medium text-slate-700">
                    Problem Solving
                  </span>

                  <span className="text-sm font-semibold text-green-600">
                    88%
                  </span>

                </div>

                <div className="h-2 rounded-full bg-slate-100">

                  <div
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: "88%" }}
                  />

                </div>
              </div>


              <div>
                <div className="mb-2 flex justify-between">

                  <span className="text-sm font-medium text-slate-700">
                    Technical Knowledge
                  </span>

                  <span className="text-sm font-semibold text-green-600">
                    82%
                  </span>

                </div>

                <div className="h-2 rounded-full bg-slate-100">

                  <div
                    className="h-2 rounded-full bg-green-500"
                    style={{ width: "82%" }}
                  />

                </div>
              </div>

            </div>

          </div>


          {/* Weaknesses */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <div className="mb-5 flex items-center gap-3">

              <div className="rounded-lg bg-orange-100 p-2">
                <AlertCircle
                  size={20}
                  className="text-orange-600"
                />
              </div>

              <h2 className="text-xl font-bold text-slate-900">
                Areas to Improve
              </h2>

            </div>


            <div className="space-y-4">

              <div>
                <div className="mb-2 flex justify-between">

                  <span className="text-sm font-medium text-slate-700">
                    Confidence
                  </span>

                  <span className="text-sm font-semibold text-orange-600">
                    72%
                  </span>

                </div>

                <div className="h-2 rounded-full bg-slate-100">

                  <div
                    className="h-2 rounded-full bg-orange-500"
                    style={{ width: "72%" }}
                  />

                </div>
              </div>


              <div>
                <div className="mb-2 flex justify-between">

                  <span className="text-sm font-medium text-slate-700">
                    Communication
                  </span>

                  <span className="text-sm font-semibold text-orange-600">
                    76%
                  </span>

                </div>

                <div className="h-2 rounded-full bg-slate-100">

                  <div
                    className="h-2 rounded-full bg-orange-500"
                    style={{ width: "76%" }}
                  />

                </div>
              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            AI RECOMMENDATION
        ===================================================== */}

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-4 md:flex-row md:items-start">

            <div className="rounded-xl bg-blue-100 p-3">

              <Target
                size={24}
                className="text-blue-600"
              />

            </div>


            <div>

              <h2 className="text-xl font-bold text-slate-900">
                AI Recommendation
              </h2>

              <p className="mt-2 leading-7 text-slate-600">

                Your problem-solving and technical skills are strong.
                Focus more on improving communication and confidence
                during interviews. Practice explaining your solutions
                clearly and participate in more mock interviews.

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}


export default Performance;