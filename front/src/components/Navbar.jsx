import axios from "axios";
import { useEffect, useState } from "react";
import { CiMenuBurger } from "react-icons/ci";
import { Link } from "react-router-dom";
import checkAuth from "./auth.helper";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      axios
        .get("http://localhost:5000/api/auth/checkauth", {
          withCredentials: true,
        })
        .then((response) => {
          setIsAuthenticated(response.data.auth);
          console.log(response.data.auth);
        })
        .catch((err) => {
          console.log(err);
          setIsAuthenticated(false);
        });
    };
    fetchData();
  }, []);

  const handleSignout = (e) => {
    e.preventDefault;
    axios
      .get("http://localhost:5000/api/auth/logout", {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        navigate("/signin");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="">
      <div className="fixed top-0 left-0 w-full z-50 p-6 bg-black text-white bg-opacity-90">
        <div className="flex justify-between items-center px-16">
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
              activeClassName="bg-yellow-700"
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
          </div>
          <div className="">
            {!isAuthenticated ? (
              <Link
                to="/signin"
                type="button"
                className="hidden sm:flex text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg md:text-sm px-5 py-2.5 focus:outline-none"
              >
                Signin
              </Link>
            ) : (
              <div className="flex justify-center space-x-2">
                <Link
                  to="/sellform"
                  className="sm:flex text-black bg-yellow-400 hover:bg-yellow-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg md:text-sm px-5 py-2.5 focus:outline-none"
                >
                  Sell
                </Link>
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
        <div className="sm:flex sm:justify-between sm:space-x-4 text-lg absolute right-6 top-6">
          <div className="sm:hidden flex items-center">
            <button onClick={toggleMenu}>
              <CiMenuBurger style={{ color: "white" }} />
            </button>
          </div>
          <div
            className={`${
              isMenuOpen ? "block" : "hidden"
            } sm:hidden sm:items-center`}
          >
            <div className="flex flex-col relative bg-slate-900 p-3 mt-2 rounded-lg bg-opacity-50">
              <a className="">Home</a>
              <a>About</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
