export const API_BASE_URL = (
  import.meta.env.VITE_API_URL ||
  (import.meta.env.PROD
    ? "https://ai-interview-backend-lati.onrender.com"
    : "http://localhost:5000")
).replace(/\/+$/, "");
