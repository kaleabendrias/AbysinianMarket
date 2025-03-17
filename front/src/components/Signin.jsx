import { useState } from "react";
import { FaEye, FaEyeSlash, FaSpinner, FaGoogle } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    } else if (!password) {
      setError("Please enter your password.");
      setLoading(false);
      return;
    } else if (password.length < 6) {
      setError("Your password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    axios
      .post(
        "https://abysinianmarket.onrender.com/api/auth/signin",
        { email, password },
        { withCredentials: true }
      )
      .then((response) => {
        const { role, _id, name, token } = response.data;
        login({ user: { userName: name, role, userId: _id }, token });
        localStorage.setItem("token", token);
        navigate("/protected");
      })
      .catch((err) => {
        setError(err.response?.data?.message || "An error occurred.");
        toast.error(err.response?.data?.message || "An error occurred.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="mt-12 min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50 p-4">
      <div className="w-full max-w-xl bg-white rounded-lg shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">
            <span className="bg-black text-white rounded-lg px-2 py-1">
              Abysinia
            </span>{" "}
            Market
          </h1>
          <p className="text-xl font-semibold mt-4 text-gray-700">
            Sign in to your account
          </p>
        </div>

        <a
          href="https://abysinianmarket.onrender.com/auth/google"
          className="w-full flex items-center justify-center bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700 transition duration-300"
        >
          <FaGoogle className="mr-2" />
          <span>Login with Google</span>
        </a>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )} */}

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={visible ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={() => setVisible(!visible)}
              className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
            >
              {visible ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="flex justify-between items-center">
            <Link
              to="/forgot"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
            disabled={loading}
          >
            {loading ? <FaSpinner className="animate-spin" /> : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            Not a member yet?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
