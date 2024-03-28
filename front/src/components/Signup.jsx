import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [visible1, setVisible1] = useState(false);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = (e) => {
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
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }
    axios
      .post(
        "https://abysinianmarket.onrender.com/api/auth/signup",
        {
          email,
          name,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);
        navigate("/signin");
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

  return (
    <div className="h-screen mt-24 mx-28 md:mx-2">
      <div className="h-full flex flex-col items-center justify-center">
        <p className="text-xl md:text-3xl">
          <span className="bg-black text-white rounded-lg p-1">Abysinia</span>
          market
        </p>

        <div>
          <p className="text-xl md:text-3xl font-bold m-4 tracking-wide">
            Signup to create your account
          </p>
        </div>

        <div className="w-full lg:w-[38%]">
          {error && (
            <p className="text-red-700 text-base md:text-lg mt-2 md:mt-4 font-medium">
              {error}
            </p>
          )}
          <form className="flex flex-col relative">
            <label className="text-md font-thin md:text-xl ">user name</label>
            <input
              className="border border-gray-400 rounded-sm focus:outline-none focus:border-gray-600 p-1 m-2"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label className="text-md font-thin md:text-xl m-2">email</label>
            <input
              className="border border-gray-400 rounded-sm focus:outline-none focus:border-gray-600 p-1 m-2"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="text-md font-thin md:text-xl m-2">password</label>
            <input
              type={visible ? "text" : "password"}
              className="border border-gray-400 rounded-sm focus:outline-none focus:border-gray-600 p-1 m-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="absolute bottom-[43%] right-4"
              type="button"
              onClick={() => setVisible(!visible)}
            >
              {visible ? <FaEyeSlash /> : <FaEye />}
            </button>

            <label className="text-md font-thin md:text-xl m-2">
              Confirm password
            </label>
            <input
              type={visible1 ? "text" : "password"}
              className="border border-gray-400 rounded-sm focus:outline-none focus:border-gray-600 p-1 m-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button
              className="absolute bottom-[21%] right-4"
              type="button"
              onClick={() => setVisible1(!visible1)}
            >
              {visible1 ? <FaEyeSlash /> : <FaEye />}
            </button>

            <button
              className="w-full bg-blue-700 text-white rounded-lg mt-8 py-2 hover:bg-blue-800"
              onClick={handleSignup}
            >
              {loading ? (
                <>
                  <FaSpinner className="w-full flex justify-center animate-spin ml-4 text-center" />
                </>
              ) : (
                "Signup"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
