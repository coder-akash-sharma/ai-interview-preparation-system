import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_BASE_URL } from "../services/api";
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Loader2,
  AlertCircle,
  Briefcase,
  BarChart3,
} from "lucide-react";

function InterviewDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchInterviewDetails();
  }, [id]);

  const fetchInterviewDetails = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first.");
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/interview/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch interview details."
        );
      }

      setInterview(data.interview);
    } catch (error) {
      console.error("Interview details error:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="flex items-center gap-3 text-gray-600">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading interview details...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <button
            onClick={() => navigate("/interview-history")}
            className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Interview History
          </button>

          <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-600" />

              <p className="text-red-700">
                {error}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!interview) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 md:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Back Button */}
        <button
          onClick={() => navigate("/interview-history")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Interview History
        </button>

        {/* Header */}
        <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">

            <div>
              <div className="mb-2 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-indigo-600" />

                <span className="text-sm font-medium text-indigo-600">
                  Mock Interview
                </span>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                {interview.role}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-3">

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    interview.difficulty === "Easy"
                      ? "bg-green-100 text-green-700"
                      : interview.difficulty === "Medium"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {interview.difficulty}
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                  <CheckCircle className="h-3.5 w-3.5" />
                  {interview.status}
                </span>

              </div>
            </div>

            {/* Date */}
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />

              {formatDate(interview.createdAt)}
            </div>

          </div>
        </div>

        {/* Score */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
                <BarChart3 className="h-5 w-5 text-indigo-600" />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Interview Score
                </p>

                <p className="text-xl font-bold text-gray-900">
                  {interview.score !== null &&
                  interview.score !== undefined
                    ? `${interview.score}%`
                    : "Not evaluated"}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5 shadow-sm">
            <p className="text-sm text-gray-500">
              Questions Answered
            </p>

            <p className="mt-1 text-xl font-bold text-gray-900">
              {interview.answers?.length || 0}
            </p>
          </div>

        </div>

        {/* Questions and Answers */}
        <div className="space-y-5">

          {interview.answers?.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >

              {/* Question */}
              <div className="mb-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-indigo-100 text-sm font-semibold text-indigo-600">
                    {index + 1}
                  </span>

                  <span className="text-sm font-medium text-gray-500">
                    Question {index + 1}
                  </span>
                </div>

                <h2 className="text-lg font-semibold leading-relaxed text-gray-900">
                  {item.question}
                </h2>
              </div>

              {/* Answer */}
              <div className="rounded-xl bg-gray-50 p-5">
                <p className="mb-2 text-sm font-semibold text-gray-700">
                  Your Answer
                </p>

                <p className="whitespace-pre-wrap text-sm leading-7 text-gray-600">
                  {item.answer || "No answer provided."}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default InterviewDetails;