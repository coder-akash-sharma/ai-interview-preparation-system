import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

function CTA() {
  return (
    <section className="w-full bg-blue-600 px-4 py-16 sm:px-6 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-5xl text-center">

        <div className="mx-auto flex w-fit items-center gap-2 rounded-full bg-blue-500 px-4 py-2 text-sm font-medium text-white">
          <Sparkles size={16} />
          Start Your Preparation
        </div>

        <h2 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
          Ready to crack your next interview?
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-blue-100 sm:text-lg">
          Prepare with AI-powered tools, practice real interview questions,
          and improve your performance with personalized feedback.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

          <Link
            to="/register"
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-blue-600 transition hover:bg-blue-50 sm:w-auto"
          >
            Get Started

            <ArrowRight
              size={19}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>

          <Link
            to="/login"
            className="w-full rounded-xl border border-blue-400 px-6 py-3.5 font-semibold text-white transition hover:bg-blue-500 sm:w-auto"
          >
            Sign In
          </Link>

        </div>

      </div>
    </section>
  );
}

export default CTA;