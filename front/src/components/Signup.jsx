import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:5000/api/auth/signup",
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
      });
  };

  return (
    <div className="h-screen mt-24">
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

        <div className="w-[38%]">
          {error && (
            <p className="text-red-700 text-base md:text-lg mt-2 md:mt-4 font-medium">
              {error}
            </p>
          )}
          <form className="flex flex-col">
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
              className="border border-gray-400 rounded-sm focus:outline-none focus:border-gray-600 p-1 m-2"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label className="text-md font-thin md:text-xl m-2 ">
              confirm password
            </label>
            <input
              type="text"
              className="border border-gray-400 rounded-sm focus:outline-none focus:border-gray-600 p-1 m-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button
              className="w-full bg-blue-700 text-white rounded-lg mt-8 py-2 hover:bg-blue-800"
              onClick={handleSignup}
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
