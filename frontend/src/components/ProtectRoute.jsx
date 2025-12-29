import { useAuth } from "../hooks/AuthHooks";
import { Navigate } from "react-router-dom";


export function ProtectedRoute({ children }) {
   const { user, loading } = useAuth();

  if (loading) return <p>Carregando...</p>;

  if (!user || !user.isAccountVerified) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
