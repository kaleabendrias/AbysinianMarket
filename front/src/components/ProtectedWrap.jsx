import checkAuth from "./auth.helper";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedWrap = ({ element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if the user is authenticated by making a request to the server
        const res = await checkAuth();
        setIsAuthenticated(res);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  // Redirect to the login page if not authenticated
  if (loading) {
    return <div>Loading...</div>;
  }
  console.log("PrivateRoute isAuthenticate:", isAuthenticated);
  return isAuthenticated ? element : <Navigate to="/signin" />;
};

export default ProtectedWrap;
