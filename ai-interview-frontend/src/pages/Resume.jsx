import { useEffect, useState } from "react";
import {
  Upload,
  FileText,
  X,
  CheckCircle2,
  Sparkles,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { API_BASE_URL } from "../services/api";

function Resume() {
  const [file, setFile] = useState(null);
  const [uploadedResume, setUploadedResume] = useState(null);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ==========================================
  // GET LOGGED-IN USER'S RESUME
  // ==========================================

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      setFetching(true);

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first.");
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/resume/my-resume`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setUploadedResume(data.resume);
      }
    } catch (error) {
      console.error("Fetch resume error:", error);
      setError("Unable to load your resume.");
    } finally {
      setFetching(false);
    }
  };

  // ==========================================
  // SELECT FILE
  // ==========================================

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) return;

    setMessage("");
    setError("");

    // Check file size
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5 MB.");
      return;
    }

    // Check file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      setError("Only PDF, DOC and DOCX files are allowed.");
      return;
    }

    setFile(selectedFile);
  };

  // ==========================================
  // UPLOAD RESUME
  // ==========================================

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a resume first.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      setError("");

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first.");
        return;
      }

      const formData = new FormData();

      formData.append("resume", file);

      const response = await fetch(
        `${API_BASE_URL}/api/resume/upload`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Resume upload failed.");
        return;
      }

      setMessage("Resume uploaded successfully!");

      setUploadedResume(data.resume);

      // Clear selected file
      setFile(null);
    } catch (error) {
      console.error("Upload error:", error);
      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // DELETE RESUME
  // ==========================================

  const handleDelete = async () => {
    try {
      setLoading(true);
      setMessage("");
      setError("");

      const token = localStorage.getItem("token");

      const response = await fetch(
        `${API_BASE_URL}/api/resume/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Unable to delete resume.");
        return;
      }

      setUploadedResume(null);
      setAnalysis(null);
      setMessage("Resume deleted successfully.");
    } catch (error) {
      console.error("Delete error:", error);
      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // REMOVE SELECTED FILE
  // ==========================================

  const removeFile = () => {
    setFile(null);
    setError("");
    setMessage("");
  };

  // ==========================================
  // ANALYZE RESUME WITH AI
  // ==========================================

  const handleAnalyze = async () => {
    if (!uploadedResume) {
      setError("Please upload a resume first.");
      return;
    }

    try {
      setAnalyzing(true);
      setMessage("");
      setError("");
      setAnalysis(null);

      const token = localStorage.getItem("token");

      if (!token) {
        setError("Please login first.");
        return;
      }

      const response = await fetch(
        `${API_BASE_URL}/api/resume/analyze`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Resume analysis failed.");
        return;
      }

      setAnalysis(data.analysis);
      setMessage(data.message || "Resume analyzed successfully!");
    } catch (error) {
      console.error("Analyze error:", error);
      setError(
        "Unable to analyze resume. Make sure the AI service is running."
      );
    } finally {
      setAnalyzing(false);
    }
  };

  // ==========================================
  // VIEW RESUME
  // ==========================================

  const handleViewResume = () => {
    if (!uploadedResume) return;

    window.open(
      `${API_BASE_URL}/uploads/resumes/${uploadedResume.filePath}`,
      "_blank"
    );
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}

        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Resume Analysis
          </h1>

          <p className="mt-2 text-slate-500">
            Upload your resume and get personalized AI-powered feedback.
          </p>
        </div>

        {/* Messages */}

        {message && (
          <div className="mt-6 flex items-center gap-2 rounded-xl bg-green-50 p-4 text-sm font-medium text-green-700">
            <CheckCircle2 size={18} />
            {message}
          </div>
        )}

        {error && (
          <div className="mt-6 flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-600">
            <AlertCircle size={18} />
            {error}
          </div>
        )}

        {/* Main Grid */}

        <div className="mt-8 grid gap-6 lg:grid-cols-3">

          {/* Upload Section */}

          <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">

            <h2 className="text-xl font-bold text-slate-900">
              Upload Your Resume
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Supported formats: PDF, DOC, DOCX • Maximum size: 5 MB
            </p>

            {/* Loading */}

            {fetching ? (
              <div className="mt-8 flex items-center justify-center py-16 text-slate-500">
                <Loader2
                  className="mr-2 animate-spin"
                  size={22}
                />

                Loading your resume...
              </div>
            ) : (
              <>
                {/* File Selection */}

                {!file ? (
                  <label className="mt-6 flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-6 py-16 text-center transition hover:border-blue-400 hover:bg-blue-50">

                    <div className="rounded-full bg-blue-100 p-4">
                      <Upload
                        className="text-blue-600"
                        size={28}
                      />
                    </div>

                    <h3 className="mt-4 font-semibold text-slate-900">
                      Upload your resume
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      Click here to choose your file
                    </p>

                    <span className="mt-4 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white">
                      Choose File
                    </span>

                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                    />

                  </label>
                ) : (
                  <>
                    {/* Selected File */}

                    <div className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5">

                      <div className="flex items-center justify-between">

                        <div className="flex items-center gap-4">

                          <div className="rounded-xl bg-white p-3">
                            <FileText
                              className="text-blue-600"
                              size={24}
                            />
                          </div>

                          <div>

                            <p className="font-semibold text-slate-900">
                              {file.name}
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                              {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>

                          </div>

                        </div>

                        <button
                          type="button"
                          onClick={removeFile}
                          className="rounded-lg p-2 text-slate-500 hover:bg-white hover:text-red-500"
                        >
                          <X size={20} />
                        </button>

                      </div>

                    </div>

                    {/* Upload Button */}

                    <button
                      type="button"
                      onClick={handleUpload}
                      disabled={loading}
                      className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                    >

                      {loading ? (
                        <>
                          <Loader2
                            size={19}
                            className="animate-spin"
                          />

                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload size={19} />

                          Upload Resume
                        </>
                      )}

                    </button>

                  </>
                )}

                {/* Existing Resume */}

                {uploadedResume && !file && (
                  <div className="mt-6 rounded-2xl border border-green-100 bg-green-50 p-5">

                    <div className="flex items-center justify-between gap-4">

                      <div className="flex items-center gap-4">

                        <div className="rounded-xl bg-white p-3">
                          <FileText
                            className="text-green-600"
                            size={24}
                          />
                        </div>

                        <div>

                          <p className="font-semibold text-slate-900">
                            {uploadedResume.fileName}
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            Your uploaded resume
                          </p>

                        </div>

                      </div>

                      <CheckCircle2
                        className="text-green-600"
                        size={22}
                      />

                    </div>

                    {/* Resume Actions */}

                    <div className="mt-5 flex gap-3">

                      <button
                        type="button"
                        onClick={handleViewResume}
                        className="flex-1 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
                      >
                        View Resume
                      </button>

                      <button
                        type="button"
                        onClick={handleDelete}
                        disabled={loading}
                        className="flex-1 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                      >
                        Delete
                      </button>

                    </div>

                  </div>
                )}

              </>
            )}

            {/* Analyze Button */}

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={!uploadedResume || analyzing}
              className={`mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 font-semibold transition ${
                uploadedResume && !analyzing
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "cursor-not-allowed bg-slate-200 text-slate-400"
              }`}
            >

              {analyzing ? (
                <>
                  <Loader2
                    size={19}
                    className="animate-spin"
                  />

                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles size={19} />

                  Analyze Resume with AI
                </>
              )}

            </button>

          </div>

          {/* Tips */}

          <div className="rounded-2xl bg-blue-600 p-6 text-white">

            <div className="flex items-center gap-3">

              <div className="rounded-xl bg-white/15 p-3">
                <Sparkles size={22} />
              </div>

              <h2 className="font-bold">
                AI Resume Tips
              </h2>

            </div>

            <div className="mt-6 space-y-5">

              <Tip
                number="01"
                text="Keep your resume concise and easy to read."
              />

              <Tip
                number="02"
                text="Highlight relevant technical skills."
              />

              <Tip
                number="03"
                text="Add measurable achievements to your projects."
              />

              <Tip
                number="04"
                text="Use keywords related to your target job role."
              />

            </div>

          </div>

        </div>

        {/* AI ANALYSIS RESULT */}

        {analysis && (
          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">

            <h2 className="text-2xl font-bold text-slate-900">
              AI Resume Review
            </h2>

            {/* Scores */}

            <div className="mt-6 grid gap-6 md:grid-cols-2">

              <ScoreCard
                title="Resume Score"
                value={analysis.resume_score}
              />

              <ScoreCard
                title="ATS Score"
                value={analysis.ats_score}
              />

            </div>

            {/* Strengths */}

            <ResultCard
              title="Strengths"
              items={analysis.strengths}
              type="success"
            />

            {/* Mistakes */}

            <ResultCard
              title="Mistakes to Fix"
              items={analysis.mistakes}
              type="warning"
            />

            {/* Improvements */}

            <ResultCard
              title="Improvements"
              items={analysis.improvements}
              type="info"
            />

            {/* Missing Keywords */}

            <ResultCard
              title="Missing Keywords"
              items={analysis.missing_keywords}
              type="info"
            />

            {/* Suggestions */}

            <ResultCard
              title="Suggestions"
              items={analysis.suggestions}
              type="info"
            />

          </div>
        )}

        {/* What AI Will Analyze */}

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">

          <h2 className="text-xl font-bold text-slate-900">
            What our AI will analyze
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <AnalysisItem title="Skills" />

            <AnalysisItem title="Projects" />

            <AnalysisItem title="Experience" />

            <AnalysisItem title="ATS Score" />

          </div>

        </div>

      </div>
    </div>
  );
}

// ==========================================
// TIP COMPONENT
// ==========================================

function Tip({ number, text }) {
  return (
    <div className="flex gap-3">

      <span className="font-bold text-blue-200">
        {number}
      </span>

      <p className="text-sm leading-6 text-blue-100">
        {text}
      </p>

    </div>
  );
}

// ==========================================
// ANALYSIS ITEM
// ==========================================

function AnalysisItem({ title }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">

      <CheckCircle2
        size={19}
        className="text-blue-600"
      />

      <span className="font-medium text-slate-700">
        {title}
      </span>

    </div>
  );
}

// ==========================================
// SCORE CARD
// ==========================================

function ScoreCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="mt-2 text-4xl font-bold text-slate-900">

        {value ?? 0}

        <span className="ml-1 text-xl text-slate-400">
          /100
        </span>

      </p>

    </div>
  );
}

// ==========================================
// RESULT CARD
// ==========================================

function ResultCard({ title, items, type }) {
  const list = Array.isArray(items)
    ? items
    : items
      ? [items]
      : [];

  const styles = {
    success: "border-green-100 bg-green-50 text-green-700",
    warning: "border-yellow-100 bg-yellow-50 text-yellow-700",
    info: "border-blue-100 bg-blue-50 text-blue-700",
  };

  return (
    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">

      <h3 className="text-lg font-bold text-slate-900">
        {title}
      </h3>

      {list.length > 0 ? (
        <ul className="mt-4 space-y-3">

          {list.map((item, index) => (
            <li
              key={index}
              className="flex gap-3 text-sm leading-6 text-slate-600"
            >

              <span
                className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${
                  type === "success"
                    ? "bg-green-500"
                    : type === "warning"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                }`}
              />

              <span>{item}</span>

            </li>
          ))}

        </ul>
      ) : (
        <p className="mt-3 text-sm text-slate-500">
          No suggestions available.
        </p>
      )}

    </div>
  );
}

export default Resume;