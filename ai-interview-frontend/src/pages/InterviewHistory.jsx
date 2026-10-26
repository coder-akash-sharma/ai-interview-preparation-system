import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  History,
  Eye,
  Loader2,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { API_BASE_URL } from "../services/api";


function InterviewHistory() {

  const navigate = useNavigate();

  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // =====================================================
  // FETCH INTERVIEW HISTORY
  // =====================================================

  useEffect(() => {

    const fetchInterviewHistory = async () => {

      try {

        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");


        // Check login token

        if (!token) {
          navigate("/login");
          return;
        }


        const response = await fetch(
          `${API_BASE_URL}/api/interview/history`,
          {
            method: "GET",

            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );


        const data = await response.json();


        if (!response.ok) {

          throw new Error(
            data.message || "Failed to fetch interview history."
          );

        }


        setInterviews(data.interviews || []);

      } catch (error) {

        console.error(
          "Interview history error:",
          error
        );

        setError(
          error.message ||
          "Failed to fetch interview history."
        );

      } finally {

        setLoading(false);

      }

    };


    fetchInterviewHistory();

  }, [navigate]);


  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {

    return (

      <div className="min-h-screen bg-slate-50 p-6 md:p-8">

        <div className="mx-auto flex min-h-[500px] max-w-6xl items-center justify-center">

          <div className="flex flex-col items-center gap-3">

            <Loader2
              size={32}
              className="animate-spin text-blue-600"
            />

            <p className="text-sm text-slate-500">
              Loading interview history...
            </p>

          </div>

        </div>

      </div>

    );

  }


  // =====================================================
  // ERROR
  // =====================================================

  if (error) {

    return (

      <div className="min-h-screen bg-slate-50 p-6 md:p-8">

        <div className="mx-auto max-w-6xl">

          <button
            onClick={() => navigate("/performance")}
            className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
          >
            <ArrowLeft size={18} />

            Back
          </button>


          <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">

            <AlertCircle
              size={40}
              className="mx-auto mb-4 text-red-500"
            />

            <h2 className="text-xl font-bold text-red-700">
              Failed to load interview history
            </h2>

            <p className="mt-2 text-sm text-red-600">
              {error}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-5 rounded-lg bg-red-600 px-5 py-2 text-sm font-semibold text-white hover:bg-red-700"
            >
              Try Again
            </button>

          </div>

        </div>

      </div>

    );

  }


  // =====================================================
  // MAIN PAGE
  // =====================================================

  return (

    <div className="min-h-screen bg-slate-50 p-6 md:p-8">

      <div className="mx-auto max-w-6xl">


        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-blue-600 p-3">

              <History
                size={24}
                className="text-white"
              />

            </div>


            <div>

              <h1 className="text-3xl font-bold text-slate-900">
                Interview History
              </h1>

              <p className="mt-1 text-slate-500">
                View your previous mock interviews and answers.
              </p>

            </div>

          </div>


          <button
            onClick={() => navigate("/performance")}
            className="flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
          >

            <ArrowLeft size={18} />

            Back to Performance

          </button>

        </div>


        {/* =================================================
            NO INTERVIEWS
        ================================================= */}

        {interviews.length === 0 ? (

          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

            <History
              size={48}
              className="mx-auto mb-4 text-slate-300"
            />

            <h2 className="text-xl font-bold text-slate-800">
              No interviews yet
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Complete your first mock interview to see it here.
            </p>


            <button
              onClick={() => navigate("/interview")}
              className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Start Interview
            </button>

          </div>

        ) : (


          /* =================================================
             DESKTOP TABLE
          ================================================= */

          <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="border-b border-slate-200 bg-slate-50">

                  <tr>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                      Role
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                      Difficulty
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                      Questions
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                      Status
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-600">
                      Date
                    </th>

                    <th className="px-6 py-4 text-right text-sm font-semibold text-slate-600">
                      Action
                    </th>

                  </tr>

                </thead>


                <tbody className="divide-y divide-slate-100">

                  {interviews.map((interview) => (

                    <tr
                      key={interview._id}
                      className="transition hover:bg-slate-50"
                    >

                      {/* ROLE */}

                      <td className="px-6 py-4">

                        <span className="font-semibold text-slate-800">
                          {interview.role}
                        </span>

                      </td>


                      {/* DIFFICULTY */}

                      <td className="px-6 py-4">

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            interview.difficulty === "Easy"
                              ? "bg-green-100 text-green-700"
                              : interview.difficulty === "Medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {interview.difficulty}
                        </span>

                      </td>


                      {/* QUESTIONS */}

                      <td className="px-6 py-4 text-sm text-slate-600">

                        {interview.answers?.length || 0}

                      </td>


                      {/* STATUS */}

                      <td className="px-6 py-4">

                        <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          {interview.status || "completed"}
                        </span>

                      </td>


                      {/* DATE */}

                      <td className="px-6 py-4 text-sm text-slate-500">

                        {interview.createdAt
                          ? new Date(
                              interview.createdAt
                            ).toLocaleDateString()
                          : "N/A"}

                      </td>


                      {/* VIEW BUTTON */}

                      <td className="px-6 py-4 text-right">

                        <button
                          type="button"
                          onClick={() => {
                            console.log(
                              "Opening interview:",
                              interview._id
                            );

                            navigate(
                              `/interview-history/${interview._id}`
                            );
                          }}
                          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >

                          <Eye size={17} />

                          View

                        </button>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>


        )}


        {/* =================================================
            MOBILE CARDS
        ================================================= */}

        {interviews.length > 0 && (

          <div className="space-y-4 md:hidden">

            {interviews.map((interview) => (

              <div
                key={interview._id}
                className="rounded-2xl bg-white p-5 shadow-sm"
              >

                <div className="mb-4 flex items-start justify-between gap-3">

                  <div>

                    <h2 className="font-bold text-slate-900">
                      {interview.role}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {interview.createdAt
                        ? new Date(
                            interview.createdAt
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>

                  </div>


                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      interview.difficulty === "Easy"
                        ? "bg-green-100 text-green-700"
                        : interview.difficulty === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {interview.difficulty}

                  </span>

                </div>


                <div className="mb-4 grid grid-cols-2 gap-3">

                  <div className="rounded-lg bg-slate-50 p-3">

                    <p className="text-xs text-slate-500">
                      Questions
                    </p>

                    <p className="mt-1 font-bold text-slate-800">
                      {interview.answers?.length || 0}
                    </p>

                  </div>


                  <div className="rounded-lg bg-slate-50 p-3">

                    <p className="text-xs text-slate-500">
                      Status
                    </p>

                    <p className="mt-1 font-bold text-green-600">
                      {interview.status || "completed"}
                    </p>

                  </div>

                </div>


                <button
                  type="button"
                  onClick={() => {
                    console.log(
                      "Opening interview:",
                      interview._id
                    );

                    navigate(
                      `/interview-history/${interview._id}`
                    );
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                >

                  <Eye size={18} />

                  View Interview

                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>

  );
}


export default InterviewHistory;