import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FileText,
  Mic,
  Code,
  BarChart3,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { API_BASE_URL } from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  // =====================================================
  // GET USER FROM LOCAL STORAGE
  // =====================================================

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch (error) {
      console.error("Invalid user data:", error);
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  // =====================================================
  // GET LOGGED-IN USER FROM BACKEND
  // =====================================================

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      // No token = not logged in
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/user/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        // =================================================
        // INVALID / EXPIRED TOKEN
        // =================================================

        if (!response.ok) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");

          navigate("/login");
          return;
        }

        // =================================================
        // SAVE USER
        // =================================================

        setUser(data.user);

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      } catch (error) {
        console.error("Fetch user error:", error);

        // Keep the user from localStorage if backend
        // is temporarily unavailable
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="flex items-center gap-2 text-blue-600">
          <Loader2
            size={22}
            className="animate-spin"
          />

          <span className="font-medium">
            Loading dashboard...
          </span>
        </div>
      </div>
    );
  }

  // =====================================================
  // DASHBOARD
  // =====================================================

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =================================================
          HEADER
      ================================================= */}

      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5">

          <h1 className="text-2xl font-bold text-slate-900">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Welcome back,{" "}
            <span className="font-semibold text-blue-600">
              {user?.name || "User"}
            </span>
          </p>

        </div>
      </div>

      {/* =================================================
          MAIN
      ================================================= */}

      <main className="mx-auto max-w-7xl px-6 py-10">

        {/* =================================================
            WELCOME
        ================================================= */}

        <div className="mb-8">

          <h2 className="text-3xl font-bold text-slate-900">
            Hello, {user?.name || "User"} 👋
          </h2>

          <p className="mt-2 text-slate-500">
            Continue your interview preparation and improve
            your skills.
          </p>

        </div>

        {/* =================================================
            FEATURES
        ================================================= */}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">

          {/* =================================================
              RESUME
          ================================================= */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FileText size={23} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              Resume
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Upload and manage your resume for interview
              preparation.
            </p>

            <button
              onClick={() => navigate("/resume")}
              className="mt-5 flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              Open Resume
              <ArrowRight size={16} />
            </button>

          </div>

          {/* =================================================
              MOCK INTERVIEW
          ================================================= */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Mic size={23} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              Mock Interview
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Practice real interview questions with AI.
            </p>

            <button
              onClick={() => navigate("/interview")}
              className="mt-5 flex items-center gap-2 text-sm font-semibold text-purple-600 hover:text-purple-700"
            >
              Start Interview
              <ArrowRight size={16} />
            </button>

          </div>

          {/* =================================================
              CODING
          ================================================= */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <Code size={23} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              Coding
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Practice coding problems and improve your
              problem-solving skills.
            </p>

            <button
              onClick={() => navigate("/coding")}
              className="mt-5 flex items-center gap-2 text-sm font-semibold text-green-600 hover:text-green-700"
            >
              Practice Coding
              <ArrowRight size={16} />
            </button>

          </div>

          {/* =================================================
              PERFORMANCE
          ================================================= */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
              <BarChart3 size={23} />
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-900">
              Performance
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Track your interview performance and progress.
            </p>

            <button
              onClick={() => navigate("/performance")}
              className="mt-5 flex items-center gap-2 text-sm font-semibold text-orange-600 hover:text-orange-700"
            >
              View Performance
              <ArrowRight size={16} />
            </button>

          </div>

        </div>

        {/* =================================================
            ACCOUNT INFORMATION
        ================================================= */}

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

          <h3 className="text-lg font-bold text-slate-900">
            Account Information
          </h3>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">

            {/* NAME */}

            <div>

              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Name
              </p>

              <p className="mt-1 font-semibold text-slate-800">
                {user?.name || "N/A"}
              </p>

            </div>

            {/* EMAIL */}

            <div>

              <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                Email
              </p>

              <p className="mt-1 break-all font-semibold text-slate-800">
                {user?.email || "N/A"}
              </p>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;