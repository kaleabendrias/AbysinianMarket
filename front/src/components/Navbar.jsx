import axios from "axios";
import { useEffect, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import isAdmin from "./isadmin";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdminUser, setIsAdminUser] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://abysinianmarket.onrender.com/api/auth/checkauth",
          {
            withCredentials: true,
          }
        );

        setIsAuthenticated(response.data.auth);

        if (response.data.auth) {
          const isAdminResult = await isAdmin();
          setIsAdminUser(isAdminResult);
        }
      } catch (err) {
        console.log(err);
        setIsAuthenticated(false);
      }
    };

    fetchData();
  }, []);

  const handleSignout = (e) => {
    e.preventDefault;
    axios
      .get("https://abysinianmarket.onrender.com/api/auth/logout", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        navigate("/signin");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="">
      <div className="fixed top-0 w-full z-50 p-6 bg-black text-white bg-opacity-90">
        <div className="px-0 flex justify-between items-center md:px-16">
          <div>
            <Link to="/">
              <p className="font-mono">
                <span className="bg-white rounded-lg p-1 text-slate-900 font-bold font-mono">
                  Abysinia
                </span>{" "}
                Market
              </p>
            </Link>
          </div>

          <div className="hidden sm:flex sm:justify-between sm:space-x-4 text-lg">
            <Link
              to="/"
              className={`text-white px-1 py-1 rounded ${
                location.pathname === "/" ? "bg-slate-800" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/about"
              className={`text-white px-1 py-1 rounded ${
                location.pathname === "/about" ? "bg-slate-800" : ""
              }`}
            >
              About
            </Link>
            <Link
              to="/contactus"
              className={`text-white md:px-1 md:py-1 rounded ${
                location.pathname === "/contactus" ? "bg-slate-800" : ""
              }`}
            >
              Contact Us
            </Link>
            {isAuthenticated ? (
              <Link
                to="/protected"
                className={`text-white px-1 py-1 rounded ${
                  location.pathname === "/protected" ? "bg-slate-800" : ""
                }`}
              >
                items
              </Link>
            ) : null}
          </div>
          <div className="">
            {!isAuthenticated ? (
              <Link
                to="/signin"
                type="button"
                className="flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg md:text-sm px-5 py-2.5 focus:outline-none"
              >
                Signin
              </Link>
            ) : (
              <div className="flex justify-center space-x-2 mr-4">
                {isAdminUser && (
                  <Link
                    to="/sellform"
                    className="sm:flex text-black bg-yellow-400 hover:bg-yellow-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg md:text-sm px-5 py-2.5 focus:outline-none"
                  >
                    Sell
                  </Link>
                )}
                <Link
                  className="sm:flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg md:text-sm px-5 py-2.5 focus:outline-none"
                  onClick={handleSignout}
                >
                  SignOut
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className="sm:flex sm:justify-between sm:space-x-4 text-lg absolute right-1 top-8">
          <div className="sm:hidden flex items-center">
            <button onClick={toggleMenu}>
              <CiMenuBurger style={{ color: "white", fontSize: "25px" }} />
            </button>
          </div>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } sm:hidden sm:items-center`}
          >
            <div className="flex flex-col absolute right-1 top-6 bg-slate-900 p-3 mt-2 rounded-lg bg-opacity-80 text-xl">
              <Link
                to="/"
                className={`text-white px-1 py-1 rounded ${
                  location.pathname === "/" ? "bg-slate-800" : ""
                }`}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={`text-white px-1 py-1 rounded ${
                  location.pathname === "/about" ? "bg-slate-800" : ""
                }`}
              >
                About
              </Link>
              <Link
                to="/contactus"
                className={`text-white px-1 py-1 rounded ${
                  location.pathname === "/contactus" ? "bg-slate-800" : ""
                }`}
              >
                Contact Us
              </Link>
              {isAuthenticated ? (
                <Link
                  to="/protected"
                  className={`text-white px-1 py-1 rounded ${
                    location.pathname === "/protected" ? "bg-slate-800" : ""
                  }`}
                >
                  items
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
