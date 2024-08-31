
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoute = () => {
  const { currentUser } = useAuth();

  console.log(currentUser);

  return currentUser ? <Outlet /> : <Navigate to="/login" />;
  
};

// eslint-disable-next-line no-undef


export default PrivateRoute;