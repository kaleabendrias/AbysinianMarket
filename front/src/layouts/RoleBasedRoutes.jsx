import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";

const RoleBasedRoute = ({ allowedRoles }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const userRole = useAuthStore((state) => state.user.role)||localStorage('userRole');

  const isAllowed = isAuthenticated && allowedRoles.includes(userRole);


  return isAllowed ? <div className="md:ml-64">
    <Outlet />
  </div> : <Navigate to="/unauthorized" />;
};

export default RoleBasedRoute;