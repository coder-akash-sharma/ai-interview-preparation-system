import { Navigate, Outlet } from "react-router-dom";

function PublicRoute() {
  const token = localStorage.getItem("token");

  // User is already logged in
  if (token) {
    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  // User is not logged in
  return <Outlet />;
}

export default PublicRoute;