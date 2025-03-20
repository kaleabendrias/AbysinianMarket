import axios from "axios";
import { useEffect, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
// import isAdmin from "./isadmin";
import { useAuthStore } from "../../store/authStore";
import { useCartStore } from "../../store/cartStore";
import { FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuthStore();
  const isAdmin = user?.role == "admin" ? true : false;
  const logout = useAuthStore((state) => state.logout);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const { cart } = useCartStore();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (isAuthenticated) {
        user.role === "admin" ? setIsAdminUser(true) : setIsAdminUser(false);
      }
    };

    checkAdminStatus();
  }, [user, isAuthenticated]);

  const handleSignout = async (e) => {
    e.preventDefault();
    try {
      await axios.get("https://abysinianmarket.onrender.com/api/auth/logout", {
        withCredentials: true,
      });
      logout();
      localStorage.removeItem("token");
      navigate("/signin");
      window.location.reload();
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-black bg-opacity-90 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="bg-white rounded-lg p-1 text-slate-900 font-bold font-mono text-lg">
              Abysinia
            </span>
            <span className="text-white font-mono ml-2 text-lg">Market</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link
              to="/"
              className={`text-white hover:text-blue-400 transition duration-300 ${
                location.pathname === "/" ? "font-bold" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`text-white hover:text-blue-400 transition duration-300 ${
                location.pathname === "/about" ? "font-bold" : ""
              }`}
            >
              About
            </Link>
            <Link
              to="/contactus"
              className={`text-white hover:text-blue-400 transition duration-300 ${
                location.pathname === "/contactus" ? "font-bold" : ""
              }`}
            >
              Contact Us
            </Link>
            {isAuthenticated && (
              <Link
                to="/protected"
                className={`text-white hover:text-blue-400 transition duration-300 ${
                  location.pathname === "/protected" ? "font-bold" : ""
                }`}
              >
                Items
              </Link>
            )}
            {isAuthenticated && isAdmin && (
              <Link
                to="/admin/purchases"
                className={`text-white hover:text-blue-400 transition duration-300 ${
                  location.pathname === "/admin/purchases" ? "font-bold" : ""
                }`}
                onClick={toggleMenu}
              >
                Orders
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {!isAuthenticated ? (
              <Link
                to="/signin"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300"
              >
                Sign In
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/cart"
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition duration-300 flex items-center justify-center"
                >
                  <FaShoppingCart className="mr-2" />
                  {cart.length > 0 && (
                    <span className="ml-2 bg-red-600 text-white text-xs rounded-full px-2 py-1">
                      {cart.length}
                    </span>
                  )}
                </Link>
                {isAdminUser && (
                  <Link
                    to="/sellform"
                    className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg transition duration-300"
                  >
                    Sell
                  </Link>
                )}
                <button
                  onClick={handleSignout}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-300"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center justify-between mb-2 space-x-3">
            <Link
              to="/cart"
              className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded-lg transition duration-300 flex items-center justify-center"
            >
              <FaShoppingCart className="mr-2" />
              {cart.length > 0 && (
                <span className="ml-2 bg-red-600 text-white text-xs rounded-full px-2 py-1">
                  {cart.length}
                </span>
              )}
            </Link>
            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="text-white focus:outline-none"
              >
                <CiMenuBurger className="w-6 h-6" />
              </button>
            </div>
          </div>
          {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 w-full bg-slate-900 bg-opacity-95 backdrop-blur-md px-6 py-4 z-40 shadow-lg">
              <div className="flex flex-col space-y-4">
                <Link
                  to="/"
                  className={`text-white hover:text-blue-400 transition duration-300 ${
                    location.pathname === "/" ? "font-bold" : ""
                  }`}
                  onClick={toggleMenu}
                >
                  Home
                </Link>
                <Link
                  to="/about"
                  className={`text-white hover:text-blue-400 transition duration-300 ${
                    location.pathname === "/about" ? "font-bold" : ""
                  }`}
                  onClick={toggleMenu}
                >
                  About
                </Link>
                <Link
                  to="/contactus"
                  className={`text-white hover:text-blue-400 transition duration-300 ${
                    location.pathname === "/contactus" ? "font-bold" : ""
                  }`}
                  onClick={toggleMenu}
                >
                  Contact Us
                </Link>
                {isAuthenticated && (
                  <Link
                    to="/protected"
                    className={`text-white hover:text-blue-400 transition duration-300 ${
                      location.pathname === "/protected" ? "font-bold" : ""
                    }`}
                    onClick={toggleMenu}
                  >
                    Items
                  </Link>
                )}
                {isAuthenticated && isAdmin && (
                  <Link
                    to="/admin/purchases"
                    className={`text-white hover:text-blue-400 transition duration-300 ${
                      location.pathname === "/admin/purchases"
                        ? "font-bold"
                        : ""
                    }`}
                    onClick={toggleMenu}
                  >
                    Orders
                  </Link>
                )}
                {!isAuthenticated ? (
                  <Link
                    to="/signin"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition duration-300 text-center"
                    onClick={toggleMenu}
                  >
                    Sign In
                  </Link>
                ) : (
                  <div className="flex flex-col space-y-2">
                    {isAdminUser && (
                      <Link
                        to="/sellform"
                        className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg transition duration-300 text-center"
                        onClick={toggleMenu}
                      >
                        Sell
                      </Link>
                    )}
                    <button
                      onClick={(e) => {
                        handleSignout(e);
                        toggleMenu();
                      }}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-300"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
