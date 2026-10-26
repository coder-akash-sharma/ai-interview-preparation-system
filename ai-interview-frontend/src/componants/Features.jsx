import {
  FileText,
  Brain,
  Code2,
  BarChart3,
  Mic,
  Target,
} from "lucide-react";

const features = [
  {
    icon: FileText,
    title: "Resume Analysis",
    description:
      "Upload your resume and get AI-powered suggestions to improve your skills and resume quality.",
  },
  {
    icon: Brain,
    title: "AI Interview",
    description:
      "Practice technical and behavioral interview questions generated according to your profile.",
  },
  {
    icon: Code2,
    title: "Coding Practice",
    description:
      "Solve coding problems and improve your problem-solving and programming skills.",
  },
  {
    icon: BarChart3,
    title: "Performance Analysis",
    description:
      "Get detailed insights about your interview performance and identify areas for improvement.",
  },
  {
    icon: Mic,
    title: "Mock Interview",
    description:
      "Experience a realistic interview environment and practice answering questions confidently.",
  },
  {
    icon: Target,
    title: "Personalized Learning",
    description:
      "Receive personalized recommendations based on your performance and weaknesses.",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="w-full overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">

          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 sm:text-sm">
            Powerful Features
          </p>

          <h2 className="mt-3 break-words text-3xl font-bold leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Everything you need to crack your interview
          </h2>

          <p className="mx-auto mt-4 max-w-2xl break-words text-sm leading-6 text-slate-600 sm:mt-5 sm:text-base sm:leading-7 lg:text-lg">
            One platform to prepare your resume, practice interviews,
            improve coding skills, and track your progress.
          </p>

        </div>


        {/* Feature Cards */}
        <div className="mt-10 grid w-full grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:mt-16 lg:grid-cols-3">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl sm:p-6 lg:p-7"
              >

                {/* Icon */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white sm:h-12 sm:w-12">
                  <Icon size={23} />
                </div>


                {/* Title */}
                <h3 className="mt-5 break-words text-lg font-bold leading-snug text-slate-900 sm:mt-6 sm:text-xl">
                  {feature.title}
                </h3>


                {/* Description */}
                <p className="mt-2 break-words text-sm leading-6 text-slate-600 sm:mt-3 sm:text-base sm:leading-7">
                  {feature.description}
                </p>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default Features;