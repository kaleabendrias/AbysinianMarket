import { useState, useEffect } from "react";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

const ChangePassword = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const verificationToken = searchParams.get("token");
    console.log(typeof verificationToken, verificationToken);
    if (password !== confirmPassword) {
      setMessage("passowrd didnt match");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/updatePassword",
        { password, verificationToken }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("An error occurred. Please try again later.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-32">
      <div className="h-screen flex flex-col items-center">
        <p className="text-2xl font-bold mb-2">Forgot Password</p>
        <form className="flex flex-col relative">
          <label className="font-thin text-xl m-2">email</label>
          <input
            className="border border-gray-400 rounded-sm focus:outline-none focus:border-gray-600 p-1 m-2"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="font-thin text-xl m-2">email</label>
          <input
            className="border border-gray-400 rounded-sm focus:outline-none focus:border-gray-600 p-1 m-2"
            type="text"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
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
                "Reset Password"
              )}
            </button>
            {message && <p>{message}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
