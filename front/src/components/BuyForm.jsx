import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";

const BuyForm = () => {
  const [loading, setLoading] = useState(false);
  // const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleBuy = async (e) => {
    e.preventDefault();

    // Generate tx_ref with current timestamp and random number
    const tx_ref = `${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/api/buy/",
        {
          // amount,
          currency,
          email,
          firstName,
          lastName,
          phoneNumber,
          tx_ref,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(res.data.data);
      const checkoutUrl = res.data.data.checkout_url;
      window.location.href = checkoutUrl;
    } catch (error) {
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-24 h-full flex flex-col items-center justify-center">
      <div className="w-[38%]">
        <form className="flex flex-col relative">
          {/* <label className="font-thin text-xl m-2">amount</label>
          <input
            className="border border-gray-400 rounded-sm focus:outline-none focus:border-gray-600 p-1 m-2"
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          /> */}

          <label className="font-thin text-xl m-2 ">currency</label>

          <input
            className="border border-gray-400 rounded-sm focus:outline-none focus:border-gray-600 p-1 m-2"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          />

          <label className="font-thin text-xl m-2">email</label>
          <input
            className="border border-gray-400 rounded-sm focus:outline-none focus:border-gray-600 p-1 m-2"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="font-thin text-xl m-2 ">first_name</label>

          <input
            className="border border-gray-400 rounded-sm focus:outline-none focus:border-gray-600 p-1 m-2"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label className="font-thin text-xl m-2">last_name</label>
          <input
            className="border border-gray-400 rounded-sm focus:outline-none focus:border-gray-600 p-1 m-2"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label className="font-thin text-xl m-2 ">phone_number</label>

          <input
            className="border border-gray-400 rounded-sm focus:outline-none focus:border-gray-600 p-1 m-2"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <div className="relative">
            <button
              className="w-full bg-blue-700 text-white rounded-lg mt-8 py-2 hover:bg-blue-800"
              onClick={handleBuy}
            >
              {loading ? (
                <>
                  <FaSpinner className="w-full flex justify-center animate-spin ml-4 text-center" />
                </>
              ) : (
                "Buy"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyForm;
