import { useState } from "react";
import { FaEye, FaEyeSlash, FaSpinner, FaGoogle } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      setError("Please fill out all fields.");
      setLoading(false); // Update loading state immediately for better UX
      return;
    } else if (password.length < 6) {
      setError("Your password must be at least 6 characters long.");
      setLoading(false);
      return;
    }
    // send data to server and validate it here
    axios
      .post(
        "https://abysinianmarket.onrender.com/api/auth/signin",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        console.log(response.data.token);
        localStorage.setItem("token", response.data.token);
        navigate("/protected");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        if (err) {
          setError(err.response.data.message);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGoogleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        "https://abysinianmarket.onrender.com/auth/google"
      );
      const token = response.data.token; // Assuming the response contains the token
      localStorage.setItem("token", token);
      // Optionally, redirect the user to another page after saving the token
      // window.location.href = "/redirect-page";
    } catch (err) {
      setError("Failed to login with Google");
      console.error("Failed to login with Google:", err);
    }
  };

  return (
    <div className="h-screen mt-16">
      <div className="h-full flex flex-col items-center justify-center">
        <p className="text-xl md:text-3xl">
          <span className="bg-black text-white rounded-lg p-1">Abysinia</span>
          market
        </p>

        <div>
          <p className="text-xl md:text-3xl font-bold m-4 tracking-wide">
            Signin in to your account
          </p>
        </div>

        <div className="mb-6">
          <button
            className="mb-4 border border-gray-400 px-12 py-2 rounded-lg flex items-center bg-blue-700"
            onClick={handleGoogleLogin}
          >
            <FaGoogle width={32} style={{ color: "white" }}></FaGoogle>
            <span className="ml-2 text-white">Login with Google</span>
          </button>
          <p className="text-center">OR</p>
        </div>

        <div className="w-[38%]">
          {error && (
            <p className="text-red-700 text-base md:text-lg mt-2 md:mt-4 font-medium">
              {error}
            </p>
          )}
          <form className="flex flex-col relative">
            <label className="font-thin text-xl m-2">email</label>
            <input
              className="border border-gray-400 rounded-sm focus:outline-none focus:border-gray-600 p-1 m-2"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="flex justify-between items-center">
              <label className="font-thin text-xl m-2 ">password</label>
              <Link
                to="/forgot"
                className="text-blue-700 font-semibold hover:text-blue-900"
              >
                Forgot password?
              </Link>
            </div>
            <input
              type={visible ? "text" : "password"}
              className="border border-gray-400 rounded-sm focus:outline-none focus:border-gray-600 p-1 m-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="absolute bottom-[34%] right-4"
              type="button"
              onClick={() => setVisible(!visible)}
            >
              {visible ? <FaEyeSlash /> : <FaEye />}
            </button>
            <div className="relative">
              <button
                className="w-full bg-blue-700 text-white rounded-lg mt-8 py-2 hover:bg-blue-800"
                onClick={handleSubmit}
              >
                {loading ? (
                  <>
                    <FaSpinner className="w-full flex justify-center animate-spin ml-4 text-center" />
                  </>
                ) : (
                  "Signin"
                )}
              </button>
            </div>
          </form>
          <div className="flex justify-end">
            <p className="text-lg mt-2">
              Not a member yet?{" "}
              <Link
                to="/signup"
                className="text-blue-700 font-semibold hover:text-blue-950"
              >
                Signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
