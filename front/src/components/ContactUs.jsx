import axios from "axios";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import image1 from "../assets/images/Gold Color Ethiopian Dubai Jewelry Sets Necklace Pendant Earrings Ring - c _ 50cm (1).jpeg";

const ContactUs = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [feedback, setFeedBack] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios
      .post(
        "https://abysinianmarket.onrender.com/api/contactus/",
        {
          email,
          subject,
          feedback,
        },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
        navigate("/signin");
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

  return (
    <div className="mx-10 my-28 md:mx-28">
      <div className="flex items-center justify-center space-x-10">
        <motion.div
          className="hidden md:flex"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <img src={image1} className="w-[100%] rounded-xl" />
        </motion.div>
        <div className="h-full w-full flex flex-col items-center justify-center">
          <p className="text-xl md:text-3xl">
            <span className="bg-black text-white rounded-lg p-1">Abysinia</span>
            market
          </p>

          <div>
            <p className="text-xl md:text-3xl font-bold m-4 tracking-wide">
              Contact Us
            </p>
          </div>

          <div className="w-full md:w-[80%]">
            {error && (
              <p className="text-red-700 text-base md:text-lg mt-2 md:mt-4 font-medium">
                {error}
              </p>
            )}
            <form className="flex flex-col relative mb-16">
              <label className="font-thin text-xl m-2">email</label>
              <input
                className="border border-gray-400 rounded-sm focus:outline-none focus:border-gray-600 p-1 m-2"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="font-thin text-xl m-2">Subject</label>
              <input
                className="border border-gray-400 rounded-sm focus:outline-none focus:border-gray-600 p-1 m-2"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <label className="font-thin text-xl m-2">Your message</label>
              <textarea
                type="text"
                className="border border-gray-400 rounded-sm focus:outline-none focus:border-gray-600 p-1 m-2"
                value={feedback}
                onChange={(e) => setFeedBack(e.target.value)}
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
                    "Send"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
