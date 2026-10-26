import { Link, useLocation, useNavigate } from "react-router-dom";
import { Brain, Lock, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { API_BASE_URL } from "../services/api";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email || "";
  const resetToken = location.state?.resetToken || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Check reset token
    if (!resetToken) {
      setError(
        "Reset session expired. Please request a new OTP."
      );
      return;
    }

    // Check password length
    if (password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    // Check passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/auth/reset-password`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            resetToken,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.message || "Unable to reset password."
        );
        return;
      }

      setSuccess(
        "Password reset successfully! Redirecting to login..."
      );

      // Go to login after 2 seconds
      setTimeout(() => {
        navigate("/login");
      }, 2000);

    } catch (error) {
      console.error(
        "Reset password error:",
        error
      );

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

        {/* ================= LOGO ================= */}

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


        {/* ================= CARD ================= */}

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

          {/* Back to Login */}

          <Link
            to="/login"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600"
          >

            <ArrowLeft size={16} />

            Back to Login

          </Link>


          {/* Icon */}

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">

            <Lock size={24} />

          </div>


          {/* Heading */}

          <h1 className="mt-6 text-2xl font-bold text-slate-900">

            Reset Password

          </h1>


          <p className="mt-2 text-sm leading-6 text-slate-500">

            Create a new password for your account.

          </p>


          {/* Email */}

          {email && (

            <p className="mt-2 break-all text-sm font-medium text-slate-700">

              {email}

            </p>

          )}


          {/* ================= ERROR ================= */}

          {error && (

            <div className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">

              {error}

            </div>

          )}


          {/* ================= SUCCESS ================= */}

          {success && (

            <div className="mt-5 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">

              {success}

            </div>

          )}


          {/* ================= FORM ================= */}

          <form
            onSubmit={handleResetPassword}
            className="mt-8 space-y-5"
          >


            {/* ================= NEW PASSWORD ================= */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">

                New Password

              </label>


              <div className="relative">

                {/* Lock Icon */}

                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />


                {/* Password Input */}

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }

                  value={password}

                  onChange={(e) =>
                    setPassword(e.target.value)
                  }

                  placeholder="Enter new password"

                  required

                  className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-12 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />


                {/* Show / Hide */}

                <button
                  type="button"

                  onClick={() =>
                    setShowPassword(!showPassword)
                  }

                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >

                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}

                </button>

              </div>

            </div>


            {/* ================= CONFIRM PASSWORD ================= */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">

                Confirm Password

              </label>


              <div className="relative">

                {/* Lock Icon */}

                <Lock
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />


                {/* Confirm Password Input */}

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }

                  value={confirmPassword}

                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }

                  placeholder="Confirm new password"

                  required

                  className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-12 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />


                {/* Show / Hide */}

                <button
                  type="button"

                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }

                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >

                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}

                </button>

              </div>

            </div>


            {/* ================= RESET BUTTON ================= */}

            <button
              type="submit"

              disabled={loading}

              className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading
                ? "Resetting Password..."
                : "Reset Password"}

            </button>

          </form>

        </div>

      </div>

    </div>
  );
}

export default ResetPassword;