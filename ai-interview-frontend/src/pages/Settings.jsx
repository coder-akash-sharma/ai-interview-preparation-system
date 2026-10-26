
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Settings as SettingsIcon,
  Bell,
  Lock,
  Moon,
  Sun,
  LogOut,
  User,
  ChevronRight,
} from "lucide-react";

function Settings() {
  const navigate = useNavigate();

  // Load saved preferences
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  const [notifications, setNotifications] = useState(
    () => localStorage.getItem("notifications") !== "false"
  );

  const [showSecurityInfo, setShowSecurityInfo] = useState(false);

  // Apply dark mode only inside this Settings page
  useEffect(() => {
    const page = document.getElementById("settings-page");

    if (page) {
      page.classList.toggle("dark", darkMode);
    }

    localStorage.setItem("darkMode", String(darkMode));
  }, [darkMode]);

  // Save notification preference
  const toggleNotifications = () => {
    setNotifications((previous) => {
      const next = !previous;
      localStorage.setItem("notifications", String(next));
      return next;
    });
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("authChanged"));
    navigate("/");
  };

  // Read logged-in user
  const getUserName = () => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      return user.name || "Your Account";
    } catch {
      return "Your Account";
    }
  };

  const settingsItems = [
    {
      title: "General Settings",
      description: "Manage your basic application preferences.",
      icon: <SettingsIcon size={21} />,
    },
    {
      title: "Notifications",
      description: "Receive interview reminders and updates.",
      icon: <Bell size={21} />,
      action: (
        <Toggle
          enabled={notifications}
          onClick={toggleNotifications}
          label="Toggle notifications"
        />
      ),
    },
    {
      title: "Security",
      description: "View your account security information.",
      icon: <Lock size={21} />,
      action: (
        <button
          type="button"
          onClick={() => setShowSecurityInfo((previous) => !previous)}
          aria-label="View security information"
          aria-expanded={showSecurityInfo}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <ChevronRight
            size={20}
            className={`transition-transform ${
              showSecurityInfo ? "rotate-90" : ""
            }`}
          />
        </button>
      ),
    },
    {
      title: "Appearance",
      description: darkMode
        ? "Dark mode is enabled for Settings."
        : "Light mode is enabled for Settings.",
      icon: darkMode ? <Moon size={21} /> : <Sun size={21} />,
      action: (
        <Toggle
          enabled={darkMode}
          onClick={() => setDarkMode((previous) => !previous)}
          label="Toggle dark mode"
        />
      ),
    },
  ];

  return (
    <div
      id="settings-page"
      className={`min-h-screen px-4 py-8 transition-colors duration-300 sm:px-6 md:py-12 ${
        darkMode
          ? "dark bg-slate-950 text-white"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="mx-auto max-w-4xl">
        {/* HEADER */}
        <div className="mb-8">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
            <SettingsIcon size={25} />
          </div>

          <h1 className="text-3xl font-bold">Settings</h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Manage your InterviewAI account and preferences.
          </p>
        </div>

        {/* ACCOUNT CARD */}
        <div className="mb-6 flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
            <User size={23} />
          </div>

          <div className="min-w-0">
            <h2 className="font-semibold">{getUserName()}</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Account preferences and security
            </p>
          </div>
        </div>

        {/* SETTINGS OPTIONS */}
        <div className="space-y-4">
          {settingsItems.map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 sm:p-6"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
                {item.icon}
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="font-semibold text-slate-900 dark:text-white">
                  {item.title}
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {item.description}
                </p>
              </div>

              {item.action && (
                <div className="shrink-0">{item.action}</div>
              )}
            </div>
          ))}

          {/* SECURITY DETAILS */}
          {showSecurityInfo && (
            <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 dark:border-blue-900 dark:bg-slate-900">
              <h3 className="font-semibold text-slate-900 dark:text-white">
                Account Security
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Keep your password private and log out when using a shared
                device. Password changes must be connected to your backend
                before they can be performed here.
              </p>
            </div>
          )}

          {/* LOGOUT CARD */}
          <div className="rounded-2xl border border-red-200 bg-white p-5 transition-colors dark:border-red-900 dark:bg-slate-900 sm:p-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="font-semibold text-slate-900 dark:text-white">
                  Log out
                </h2>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Sign out of your InterviewAI account on this device.
                </p>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-slate-400 dark:text-slate-500">
          InterviewAI · Account Settings
        </p>
      </div>
    </div>
  );
}

// Reusable toggle switch
function Toggle({ enabled, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={enabled}
      className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${
        enabled ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-700"
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all duration-200 ${
          enabled ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

export default Settings;
