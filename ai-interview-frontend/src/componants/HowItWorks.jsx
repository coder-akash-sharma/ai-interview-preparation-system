import {
  Upload,
  Brain,
  MessageSquare,
  TrendingUp,
} from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Upload,
    title: "Upload Your Resume",
    description:
      "Upload your resume and let our system understand your skills, education, and experience.",
  },
  {
    number: "02",
    icon: Brain,
    title: "AI Creates Questions",
    description:
      "Our AI generates personalized interview questions based on your resume and selected role.",
  },
  {
    number: "03",
    icon: MessageSquare,
    title: "Practice Interview",
    description:
      "Answer technical and behavioral questions in a realistic interview environment.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Get AI Feedback",
    description:
      "Receive detailed feedback, scores, and recommendations to improve your performance.",
  },
];

function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="w-full overflow-hidden bg-slate-50 py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">

          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 sm:text-sm">
            How It Works
          </p>

          <h2 className="mt-3 break-words text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Your interview preparation journey
          </h2>

          <p className="mx-auto mt-4 max-w-2xl break-words text-sm leading-6 text-slate-600 sm:mt-5 sm:text-base sm:leading-7 lg:text-lg">
            Follow four simple steps and prepare yourself for your next
            interview with the help of AI.
          </p>

        </div>


        {/* Steps */}
        <div className="mt-10 grid w-full grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:mt-16 lg:grid-cols-4">

          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.number}
                className="relative min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6 lg:p-7"
              >

                {/* Number + Icon */}
                <div className="flex items-center justify-between gap-3">

                  <span className="text-3xl font-extrabold text-blue-100 sm:text-4xl">
                    {step.number}
                  </span>

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white sm:h-12 sm:w-12">
                    <Icon size={22} />
                  </div>

                </div>


                {/* Title */}
                <h3 className="mt-5 break-words text-lg font-bold leading-snug text-slate-900 sm:mt-7 sm:text-xl">
                  {step.title}
                </h3>


                {/* Description */}
                <p className="mt-2 break-words text-sm leading-6 text-slate-600 sm:mt-3 sm:text-base sm:leading-7">
                  {step.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;