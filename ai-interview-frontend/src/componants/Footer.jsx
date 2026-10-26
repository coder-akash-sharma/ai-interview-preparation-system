import { Brain, BriefcaseBusiness, GitBranch } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-950 text-white">

      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="flex flex-col justify-between gap-8 md:flex-row">

          {/* Logo */}
          <div className="max-w-sm">

            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-blue-600 p-2">
                <Brain size={20} />
              </div>

              <span className="text-xl font-bold">
                Interview<span className="text-blue-400">AI</span>
              </span>
            </div>

            <p className="mt-4 leading-7 text-slate-400">
              An AI-powered platform designed to help students and job
              seekers prepare smarter for technical interviews.
            </p>

          </div>

          {/* Links */}
          <div className="flex gap-16">

            <div>
              <h3 className="font-semibold">
                Platform
              </h3>

              <div className="mt-4 space-y-3 text-sm text-slate-400">
                <p>Resume Analysis</p>
                <p>AI Interview</p>
                <p>Coding Practice</p>
                <p>Performance</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold">
                Resources
              </h3>

              <div className="mt-4 space-y-3 text-sm text-slate-400">
                <p>About</p>
                <p>How It Works</p>
                <p>Contact</p>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-slate-800 pt-6 text-sm text-slate-500 md:flex-row">

          <p>
            © 2026 InterviewAI. All rights reserved.
          </p>

          <div className="flex gap-4">
            <a href="#" aria-label="GitHub">
              <GitBranch size={19} className="hover:text-white" />
            </a>

            <a href="#" aria-label="LinkedIn">
              <BriefcaseBusiness size={19} className="hover:text-white" />
            </a>
          </div>

        </div>

      </div>

    </footer>
  );
}

export default Footer;