import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Loader from "./ui/Loader";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="center-screen">
        <Loader lines={4} />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
