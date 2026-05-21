import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { LoadingState } from "@/components/atomic/LoadingState";

interface ProtectedRouteProps {
  children: ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
  const { user, isAdmin, loading, rolesLoading } = useAuth();
  const location = useLocation();

  if (loading || (requireAdmin && rolesLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingState
          label={requireAdmin ? "Verifying access" : "Loading"}
          size={52}
          minHeight="min-h-0"
        />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
