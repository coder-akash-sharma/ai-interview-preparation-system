

import { Link, useNavigate } from "react-router-dom";
import {
  Brain,
  User,
  LogOut,
  Settings as SettingsIcon,
  ChevronDown,
} from "lucide-react";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Load logged-in user
  useEffect(() => {
    const loadUser = () => {
      const token = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (token && storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("User data error:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    loadUser();

    window.addEventListener("authChanged", loadUser);
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener("authChanged", loadUser);
      window.removeEventListener("storage", loadUser);
    };
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setSettingsOpen(false);

    window.dispatchEvent(new Event("authChanged"));
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* LOGO */}
        <Link
          to={user ? "/dashboard" : "/"}
          className="flex items-center gap-2"
        >
          <div className="rounded-lg bg-blue-600 p-2">
            <Brain size={20} className="text-white" />
          </div>

          <span className="text-lg font-bold text-slate-900">
            Interview<span className="text-blue-600">AI</span>
          </span>
        </Link>

        {/* USER NOT LOGGED IN */}
        {!user && (
          <div className="flex items-center gap-3 sm:gap-6">
            <Link
              to="/#features"
              className="hidden text-sm font-medium text-slate-600 hover:text-blue-600 sm:block"
            >
              Features
            </Link>

            <Link
              to="/#how-it-works"
              className="hidden text-sm font-medium text-slate-600 hover:text-blue-600 sm:block"
            >
              How It Works
            </Link>

            <Link
              to="/login"
              className="text-sm font-medium text-slate-600 hover:text-blue-600"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 sm:px-4"
            >
              Get Started
            </Link>
          </div>
        )}

        {/* USER LOGGED IN */}
        {user && (
          <div className="flex items-center gap-3">
            {/* USER ICON */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <User size={20} />
            </div>

            {/* NAME AND EMAIL */}
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-900">
                {user.name || "User"}
              </p>

              <p className="max-w-48 truncate text-xs text-slate-500">
                {user.email || ""}
              </p>
            </div>

            {/* SETTINGS DROPDOWN */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setSettingsOpen((open) => !open)}
                className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 px-3 text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                aria-label="Open settings menu"
                aria-expanded={settingsOpen}
              >
                <SettingsIcon size={20} />
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    settingsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {settingsOpen && (
                <>
                  {/* Click outside to close */}
                  <button
                    type="button"
                    aria-label="Close settings menu"
                    className="fixed inset-0 z-40 cursor-default"
                    onClick={() => setSettingsOpen(false)}
                  />

                  <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-slate-200 bg-white p-2 shadow-lg">
                    <Link
                      to="/settings"
                      onClick={() => setSettingsOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-700 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                      <SettingsIcon size={18} />
                      Settings
                    </Link>

                    <div className="my-1 border-t border-slate-100" />

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-600 transition hover:bg-red-50"
                    >
                      <LogOut size={18} />
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
