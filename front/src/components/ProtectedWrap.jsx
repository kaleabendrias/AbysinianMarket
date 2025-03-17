import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const ProtectedRoute = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);


    console.log("isAuthtenticated:" ,isAuthenticated)

      
    return isAuthenticated ? (
    <div className="flex">
      <Outlet />
    </div>
    ):( <Navigate to="/signin" />);

  };
  

export default ProtectedRoute;
