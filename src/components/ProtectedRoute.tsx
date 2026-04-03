// src/components/ProtectedRoute.tsx
import { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import Login from "../pages/Login";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="auth-loading">
        <div className="spinner" />
        <p>Loading Trackify...</p>
      </div>
    );
  }

  return user ? <>{children}</> : <Login />;
}