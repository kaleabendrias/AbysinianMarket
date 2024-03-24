// import { SparklesCore } from "./ui/sparkles";
// import image1 from "../assets/images/anh-nhat-YKFBdV-RRXI-unsplash.jpg";
// import image2 from "../assets/images/domino-164_6wVEHfI-unsplash.webp";
// import image5 from "../assets/images/nordwood-themes-_sg8nXmpWDM-unsplash.jpg";
import guts from "../assets/images/𝘽𝙀𝙍𝙎𝙀𝙍𝙆 ガッツ スマイル.jpeg";
import eren from "../assets/images/Eren Yeager.jpeg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export function SparklesPreview() {
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  const fullText = "AbysiniaMarket - Your Ultimate Shopping Destination!";
  const typingSpeed = 50;

  useEffect(() => {
    const getClothes = async () => {
      try {
        const response = await axios.get(
          "https://abysinianmarket.onrender.com/api/shop/cloths"
        );
        setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getClothes();
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

      <div className="my-28 flex flex-wrap">
        {data.slice(0, 4).map((clothingItem, index) => (
          <div
            className="border-gray-200 flex w-full max-w-xs flex-col self-center overflow-hidden rounded-lg border bg-white shadow-xl m-2"
            key={index}
          >
            <a className="relative flex h-72 overflow-hidden" href="#">
              {clothingItem.images.map((image, imageIndex) => (
                <Link
                  key={imageIndex}
                  to={`/cloth/${clothingItem._id}`}
                  className="inline-block w-full"
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
              <button
                onClick={(e) => handleBuy(e, clothingItem._id)}
                className="hover:border-white/40 flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 w-full"
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
      <div className="m-16">
        <div className="flex flex-col md:flex-row items-center text-lg space-x-4">
          <motion.div
            initial={{ x: -10 }}
            whileInView={{ x: 1 }}
            transition={{ type: "spring", stiffness: 100, duration: 0.5 }}
          >
            <div className="flex flex-col space-x-2 items-center justify-center">
              <img src={guts} className="h-32 w-32 rounded-full" />
              <p>
                <span className="text-6xl text-blue-500">&ldquo;</span>
                Welcome to the realm of Habesha style! Our digital fortress is
                where the spirits of Ethiopia&apos;s culture converge. Dive into
                the fray and claim your slice of tradition with our authentic
                garments. From the hills of Ethiopia to the pixels of your
                screen, we&apos;re here to unleash the essence of Habesha
                fashion. Embrace the adventure, fellow warrior!
              </p>
              <p className="text-blue-700 text-xl font-bold">Guts</p>
              <p className="font-light">CEO</p>
            </div>
          </motion.div>
          <motion.div
            initial={{ x: 100 }}
            whileInView={{ x: 1 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <div className="flex flex-col space-x-2 items-center justify-center">
              <img src={eren} className="h-32 w-32 rounded-full" />
              <p>
                <span className="text-6xl text-blue-500">&ldquo;</span>
                Hey, you! Ready to unlock the power of Habesha fashion? Our site
                is the key to your titan-sized wardrobe dreams. From the dusty
                streets of Ethiopia to your fingertips, we&apos;re here to
                revolutionize your style. Join the fight for cultural expression
                and unleash your inner titan with our authentic garments.
                It&apos;s time to soar above the walls of fashion conformity!
              </p>
              <p className="text-blue-700 text-xl font-bold">Eren Yager</p>
              <p className="font-light">Developer</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="m-14">
        <p className="font-bold text-2xl md:text-4xl">Featured</p>
        <div className="grid grid-cols-1 md:grid-cols-2">
          {data.slice(0, 2).map((clothingItem, index) => (
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
                      className="h-full w-full object-cover"
                      src={`http://localhost:5000/uploads/${image}`}
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

      <div className="">
        <p className="text-4xl font-bold ml-4">Dress</p>

        <div className="flex overflow-x-auto">
          {data.map((clothingItem, index) => (
            <div key={index} className="flex">
              {clothingItem.images.map((image, imageIndex) => (
                <img
                  key={imageIndex}
                  src={`http://localhost:5000/uploads/${image}`}
                  alt={image.alt}
                  className="inline-block max-w-xs m-2"
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
