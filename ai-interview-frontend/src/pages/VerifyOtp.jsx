import { Link, useLocation, useNavigate } from "react-router-dom";
import { Brain, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { API_BASE_URL } from "../services/api";

function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    setError("");

    if (otp.length !== 6) {
      setError("Please enter a 6-digit OTP");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/auth/verify-otp`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
          }),
        }
      );

     const data = await response.json();

if (!response.ok) {
  setError(data.message || "Invalid OTP");
  return;
}

navigate("/reset-password", {
  state: {
    email,
    resetToken: data.resetToken,
  },
});
    } catch (error) {
      console.error("OTP verification error:", error);

      setError(
        "Unable to connect to server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 px-6 py-12">
      <div className="mx-auto max-w-md">

        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <div className="rounded-lg bg-blue-600 p-2">
              <Brain
                size={22}
                className="text-white"
              />
            </div>

            <span className="text-xl font-bold text-slate-900">
              Interview
              <span className="text-blue-600">
                AI
              </span>
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <ShieldCheck size={24} />
          </div>

          <h1 className="mt-6 text-2xl font-bold text-slate-900">
            Verify OTP
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Enter the 6-digit OTP sent to:
          </p>

          <p className="mt-1 break-all text-sm font-semibold text-slate-900">
            {email}
          </p>

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form
            onSubmit={handleVerifyOtp}
            className="mt-8 space-y-5"
          >

            {/* OTP */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                OTP
              </label>

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) =>
                  setOtp(
                    e.target.value.replace(/\D/g, "")
                  )
                }
                placeholder="Enter 6-digit OTP"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-center text-xl font-semibold tracking-[0.4em] outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Verifying..."
                : "Verify OTP"}
            </button>

          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Didn't receive the OTP?{" "}

            <Link
              to="/forgot-password"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Send again
            </Link>
          </p>

        </div>

      </div>
    </div>
  );
}

export default VerifyOtp;