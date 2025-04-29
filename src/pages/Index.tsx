import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const Index = () => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (user?.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }
  
  return <Navigate to="/dashboard" replace />;
};

export default Index;
