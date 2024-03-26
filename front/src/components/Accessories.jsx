import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";

const Accessories = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAccessories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://abysinianmarket.onrender.com/api/shop/accessories"
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getAccessories();
  }, []);

  const handleBuy = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://abysinianmarket.onrender.com/api/buy/",
        { id, type: "accessory" },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(res);
      console.log(id);
      const checkoutUrl = res.data.data.checkout_url;
      window.location.href = checkoutUrl;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="my-28">
      {!loading ? (
        <div className="flex flex-wrap justify-center">
          {data.map((accessoriesItem, index) => (
            <div
              className="border-gray-200 flex w-full max-w-xs flex-col self-center overflow-hidden rounded-lg border bg-white shadow-xl m-2"
              key={index}
            >
              <a className="relative flex h-72 overflow-hidden" href="#">
                {accessoriesItem.images.map((image, imageIndex) => (
                  <Link
                    key={imageIndex}
                    to={`/accessories/${accessoriesItem._id}`}
                    className="inline-block w-full"
                  >
                    <img
                      key={imageIndex}
                      className="h-full w-full object-cover"
                      src={image.url}
                      alt={`product image ${imageIndex + 1}`}
                    />
                  </Link>
                ))}
              </a>
              <div className="mt-4 px-5 pb-5">
                <div className="flex items-center justify-between my-4">
                  <a href="#">
                    <h5 className="text-sm w-20 text-center tracking-tight text-white bg-blue-900 rounded-full">
                      {accessoriesItem.type}
                    </h5>
                  </a>
                  <div className=" flex items-center justify-between">
                    <p>
                      <span className="text-xl font-bold text-black">
                        {accessoriesItem.price} ETB
                      </span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => handleBuy(e, accessoriesItem._id)}
                  className="hover:border-white/40 flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-2 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <FaSpinner className="w-full flex justify-center animate-spin ml-4 text-center text-8xl" />
      )}
    </div>
  );
};

export default Accessories;
