// import { SparklesCore } from "./ui/sparkles";
// import image1 from "../assets/images/anh-nhat-YKFBdV-RRXI-unsplash.jpg";
// import image2 from "../assets/images/domino-164_6wVEHfI-unsplash.webp";
// import image5 from "../assets/images/nordwood-themes-_sg8nXmpWDM-unsplash.jpg";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";

export function SparklesPreview() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [data1, setData1] = useState([]);
  const [text, setText] = useState("");
  const fullText = "AbysiniaMarket - Your Ultimate Shopping Destination!";
  const typingSpeed = 50;

  useEffect(() => {
    const getClothes = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://abysinianmarket.onrender.com/api/shop/cloths"
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    getClothes();
  }, []);

  useEffect(() => {
    const getAccessories = async () => {
      setLoading1(true);
      try {
        const response = await axios.get(
          "https://abysinianmarket.onrender.com/api/shop/accessories"
        );
        setData1(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading1(false);
      }
    };

    getAccessories();
  }, []);

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, []);

  const handleBuy = async (e, id) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://abysinianmarket.onrender.com/api/buy/",
        { id, type: "clothing" },
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
    <div className="w-full">
      <div
        className="h-[40rem] overflow-hidden relative w-full flex flex-col items-center justify-center "
        style={{
          backgroundImage: "url('/tlfi1.jpeg')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",

          overflow: "hidden",
        }}
      >
        <div
          className="w-full absolute  h-full backdrop-filter backdrop-blur-xs"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}
        ></div>
        <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
          <span className="font-mono text-white">{text}</span>
        </h1>
      </div>

      <div className="m-16">
        <p className="font-bold text-2xl md:text-4xl">Latest additions</p>
        <div className="flex flex-wrap justify-center items-center">
          {data.slice(0, 3).map((clothingItem, index) => (
            <div
              className="border-gray-200 flex w-full max-w-sm flex-col self-center overflow-hidden rounded-lg border bg-white shadow-xl m-2"
              key={index}
            >
              <a className="relative flex h-96 overflow-hidden" href="#">
                {clothingItem.images.map((image, imageIndex) => (
                  <Link
                    key={imageIndex}
                    to={`/cloth/${clothingItem._id}`}
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
                      {clothingItem.type}
                    </h5>
                  </a>
                  <div className=" flex items-center justify-between">
                    <p>
                      <span className="text-xl font-bold text-black">
                        {clothingItem.price} ETB
                      </span>
                    </p>
                  </div>
                </div>
                <Link
                  to={`/cloth/${clothingItem._id}`}
                  className="inline-block w-full"
                >
                  <button className="hover:border-white/40 flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 w-full">
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
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="m-14">
        {!loading ? (
          <div>
            <p className="font-bold text-2xl md:text-4xl">Featured</p>
            <div className="grid grid-cols-1 md:grid-cols-2">
              {data.slice(0, 2).map((clothingItem) => (
                <>
                  <motion.div
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 100 }}
                  >
                    <div className="max-w-xl relative">
                      {clothingItem.images.map((image, imageIndex) => (
                        <img
                          key={imageIndex}
                          className="w-full h-[600px] object-cover"
                          src={image.url}
                          alt={`product image ${imageIndex + 1}`}
                        />
                      ))}
                      <p className="w-full mb-16 absolute bottom-3 text-lg text-black font-bold left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-40 rounded-lg p-2">
                        {clothingItem.description}
                      </p>
                      <p className="absolute bottom-16 text-lg text-black font-bold left-1/2 transform -translate-x-1/2 bg-white bg-opacity-40 rounded-lg p-2 mb-2">
                        <span className="">Price: </span>
                        {clothingItem.price}
                      </p>
                      <Link
                        to="/cloths"
                        className="absolute bottom-1 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-md"
                      >
                        Buy
                      </Link>
                    </div>
                  </motion.div>
                </>
              ))}
            </div>
          </div>
        ) : (
          <FaSpinner className="w-full flex justify-center animate-spin ml-4 text-center text-8xl" />
        )}
      </div>

      <div className="m-14">
        {!loading ? (
          <div>
            <p className="text-4xl font-bold">Dress</p>

            <div className="flex overflow-x-auto">
              {data.map((clothingItem, index) => (
                <div key={index} className="flex space-x-2">
                  {clothingItem.images.map((image, imageIndex) => (
                    <img
                      key={imageIndex}
                      src={image.url}
                      alt={image.alt}
                      className="inline-block m-2 max-w-full"
                      style={{ maxWidth: "400px", maxHeight: "400px" }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <FaSpinner className="w-full flex justify-center animate-spin ml-4 text-center text-8xl" />
        )}
      </div>
      <div className="m-14">
        {!loading1 ? (
          <div>
            <p className="text-4xl font-bold">Accessories</p>

            <div className="flex overflow-x-auto">
              {data1.slice(0, 6).map((accessoryItem, index) => (
                <div key={index} className="flex space-x-2">
                  {accessoryItem.images.map((image, imageIndex) => (
                    <img
                      key={imageIndex}
                      src={image.url}
                      alt={image.alt}
                      className="inline-block m-2 max-w-full"
                      style={{ maxWidth: "400px", maxHeight: "400px" }}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <FaSpinner className="w-full flex justify-center animate-spin ml-4 text-center text-8xl" />
        )}
      </div>
    </div>
  );
}
