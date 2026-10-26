import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Brain,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

import axios from "axios";
import { API_BASE_URL } from "../services/api";


function Register() {

  const navigate = useNavigate();


  // ==========================================
  // FORM STATE
  // ==========================================

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");


  // ==========================================
  // REGISTER
  // ==========================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);


    try {

      const response = await axios.post(
        `${API_BASE_URL}/api/auth/register`,
        {
          name,
          email,
          password,
        }
      );


      // ========================================
      // IF BACKEND RETURNS TOKEN
      // ========================================

      if (response.data.token) {

        localStorage.setItem(
          "token",
          response.data.token
        );

        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );


        // Tell Navbar
        window.dispatchEvent(
          new Event("authChanged")
        );


        setMessage(
          response.data.message ||
          "Registration successful!"
        );


        setTimeout(() => {
          navigate("/dashboard");
        }, 500);

      } else {

        // ======================================
        // IF REGISTER API DOES NOT AUTO LOGIN
        // ======================================

        setMessage(
          response.data.message ||
          "Registration successful! Please login."
        );


        setTimeout(() => {
          navigate("/login");
        }, 1000);

      }

    } catch (error) {

      console.error(
        "Register error:",
        error
      );


      setError(
        error.response?.data?.message ||
        "Unable to create account. Please try again."
      );

    } finally {

      setLoading(false);

    }
  };


  return (

    <div className="min-h-screen bg-slate-50 px-4 py-10">

      <div className="mx-auto max-w-md">

        {/* ======================================
            LOGO
        ====================================== */}

        <div className="mb-8 text-center">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-blue-600">

            <Brain
              size={28}
              className="text-white"
            />

          </div>


          <h1 className="mt-4 text-3xl font-bold text-slate-900">
            Create Account
          </h1>


          <p className="mt-2 text-slate-500">
            Create your InterviewAI account.
          </p>

        </div>


        {/* ======================================
            REGISTER CARD
        ====================================== */}

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* NAME */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Full Name
              </label>


              <div className="relative">

                <User
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />


                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Enter your full name"
                  required
                  className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

            </div>


            {/* EMAIL */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </label>


              <div className="relative">

                <Mail
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />


                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Enter your email"
                  required
                  className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

              </div>

            </div>


            {/* PASSWORD */}

            <div>

              <label className="mb-2 block text-sm font-medium text-slate-700">
                Password
              </label>


              <div className="relative">

                <Lock
                  size={19}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />


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
                  placeholder="Create a password"
                  required
                  className="w-full rounded-lg border border-slate-300 py-3 pl-10 pr-12 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />


                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >

                  {showPassword ? (
                    <EyeOff size={19} />
                  ) : (
                    <Eye size={19} />
                  )}

                </button>

              </div>

            </div>


            {/* ERROR */}

            {error && (

              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>

            )}


            {/* SUCCESS */}

            {message && (

              <div className="rounded-lg bg-green-50 p-3 text-sm text-green-600">
                {message}
              </div>

            )}


            {/* REGISTER BUTTON */}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >

              {loading
                ? "Creating Account..."
                : "Create Account"}

            </button>

          </form>


          {/* LOGIN */}

          <p className="mt-6 text-center text-sm text-slate-500">

            Already have an account?{" "}

            <Link
              to="/login"
              className="font-semibold text-blue-600 hover:text-blue-700"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>

  );
}

export default Register;