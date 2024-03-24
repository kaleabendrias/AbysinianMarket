import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Accessories = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getAccessories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/shop/accessories"
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
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
    <div className="my-28 flex flex-wrap justify-center">
      {data.map((accessoriesItem, index) => (
        <div
          className="group border-gray-100/30 flex w-full max-w-xs flex-col self-center overflow-hidden rounded-lg border bg-gray-700 shadow-md m-2"
          key={index}
        >
          <a
            className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
            href="#"
          >
            {accessoriesItem.images.map((image, imageIndex) => (
              <Link
                key={imageIndex}
                to={`/accessories/${accessoriesItem._id}`}
                className="inline-block max-w-xs m-2"
              >
                <img
                  key={imageIndex}
                  className="h-full w-full object-cover"
                  src={`http://localhost:5000/uploads/${image}`}
                  alt={`product image ${imageIndex + 1}`}
                />
              </Link>
            ))}
          </a>
          <div className="mt-4 px-5 pb-5">
            <a href="#">
              <h5 className="text-xl tracking-tight text-white">
                {accessoriesItem.type}
              </h5>
            </a>
            <div className="mt-2 mb-5 flex items-center justify-between">
              <p>
                <span className="text-3xl font-bold text-white">
                  {accessoriesItem.price}
                </span>
              </p>
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
  );
};

export default Accessories;
