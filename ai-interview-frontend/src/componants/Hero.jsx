import { Link } from "react-router-dom";
import {
  ArrowRight,
  Brain,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50">

      {/* Background decoration */}
      <div className="absolute -left-32 -top-32 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl" />

      <div className="absolute -bottom-32 -right-32 h-72 w-72 rounded-full bg-purple-200/30 blur-3xl" />

      <div className="relative mx-auto grid min-h-[680px] max-w-7xl items-center gap-10 px-4 py-16 sm:gap-14 sm:px-6 sm:py-20 lg:grid-cols-2">

        {/* ================= LEFT SIDE ================= */}
        <div>

          {/* Badge */}
          <div className="mb-6 inline-flex max-w-full flex-wrap items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">

            <Sparkles size={16} />

            AI-Powered Interview Preparation

          </div>


          {/* Heading */}
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl">

            Prepare Smarter.

            <span className="block text-blue-600">
              Interview Better.
            </span>

          </h1>


          {/* Description */}
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">

            Practice interviews, improve your coding skills, analyze your
            resume, and receive personalized AI feedback — all in one place.

          </p>


          {/* Buttons */}
          <div className="mt-8 flex flex-wrap gap-4">

            <Link
              to="/register"
              className="group flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
            >

              Start Preparing

              <ArrowRight
                size={19}
                className="transition-transform group-hover:translate-x-1"
              />

            </Link>


            <Link
              to="/#features"
              className="rounded-xl border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-700 transition hover:bg-slate-50"
            >

              Explore Features

            </Link>

          </div>


          {/* Trust Points */}
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-500">

            <div className="flex items-center gap-2">

              <CheckCircle2
                size={18}
                className="text-green-500"
              />

              AI-powered feedback

            </div>


            <div className="flex items-center gap-2">

              <CheckCircle2
                size={18}
                className="text-green-500"
              />

              Personalized practice

            </div>

          </div>

        </div>


        {/* ================= RIGHT SIDE ================= */}
        <div className="relative">

          {/* Main AI Card */}
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-blue-100">

            {/* Card Header */}
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                {/* AI Icon */}
                <div className="rounded-xl bg-blue-600 p-3">

                  <Brain
                    size={26}
                    className="text-white"
                  />

                </div>


                {/* Title */}
                <div>

                  <h2 className="font-bold text-slate-900">
                    AI Interview Coach
                  </h2>

                  <p className="text-sm text-slate-500">
                    Your personal interview assistant
                  </p>

                </div>

              </div>


              {/* Status */}
              <div className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-600">

                Active

              </div>

            </div>


            {/* Score Section */}
            <div className="mt-8 rounded-2xl bg-slate-50 p-5">

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-slate-500">
                    Interview Score
                  </p>

                  <p className="mt-1 text-4xl font-bold text-slate-900">
                    87%
                  </p>

                </div>


                {/* Score Circle */}
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-8 border-blue-100">

                  <span className="font-bold text-blue-600">
                    87
                  </span>

                </div>

              </div>


              {/* Progress Bar */}
              <div className="mt-5 h-2 overflow-hidden rounded-full bg-slate-200">

                <div className="h-full w-[87%] rounded-full bg-blue-600" />

              </div>

            </div>


            {/* Skills */}
            <div className="mt-5 space-y-3">

              <Skill
                title="Communication"
                score="92%"
              />

              <Skill
                title="Technical Skills"
                score="86%"
              />

              <Skill
                title="Problem Solving"
                score="83%"
              />

            </div>


            {/* AI Recommendation */}
            <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-4">

              <div className="flex gap-3">

                <Sparkles
                  size={20}
                  className="mt-0.5 text-blue-600"
                />

                <div>

                  <p className="font-semibold text-slate-900">
                    AI Recommendation
                  </p>

                  <p className="mt-1 text-sm leading-6 text-slate-600">

                    Practice more DSA problems to improve your technical
                    interview performance.

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}


/* ================= SKILL COMPONENT ================= */

function Skill({ title, score }) {

  return (

    <div className="flex items-center justify-between rounded-xl border border-slate-100 p-3">

      <div className="flex items-center gap-3">

        <CheckCircle2
          size={18}
          className="text-green-500"
        />

        <span className="text-sm font-medium text-slate-700">
          {title}
        </span>

      </div>


      <span className="text-sm font-bold text-slate-900">
        {score}
      </span>

    </div>

  );
}


export default Hero;