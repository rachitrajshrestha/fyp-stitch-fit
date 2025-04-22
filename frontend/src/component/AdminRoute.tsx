// components/AdminRoute.tsx
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/" />;

  try {
    const decoded = jwtDecode<{ role: string }>(token);
    if (decoded.role !== "admin") {
      return <Navigate to="/" />;
    }
    return children;
  } catch {
    return <Navigate to="/" />;
  }
};
