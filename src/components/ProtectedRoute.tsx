import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Props {
  requireAdmin?: boolean;
}

export default function ProtectedRoute({ requireAdmin }: Props) {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  // 1. Wait for Auth Check to finish
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center text-slate-400">Loading...</div>;
  }

  // 2. If not logged in -> Go to Login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 3. If logged in but NOT admin, and page requires Admin -> Go Home
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // 4. Access Granted
  return <Outlet />;
}