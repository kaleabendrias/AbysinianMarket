"use client";
import { SparklesCore } from "./ui/sparkles";
import image1 from "../assets/images/anh-nhat-YKFBdV-RRXI-unsplash.jpg";
import image2 from "../assets/images/domino-164_6wVEHfI-unsplash.webp";
import image5 from "../assets/images/nordwood-themes-_sg8nXmpWDM-unsplash.jpg";

export function SparklesPreview() {
  return (
    <>
      <div className="h-[40rem] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden rounded-md">
        <div className="w-full absolute inset-0 h-screen">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={1.4}
            particleDensity={100}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
        </div>
        <h1 className="md:text-7xl text-3xl lg:text-6xl font-bold text-center text-white relative z-20">
          <span className="font-mono">AbysiniaMarket</span> - Your Ultimate
          Shopping Destination!
        </h1>
      </div>

      <div className="flex flex-col bg-white m-auto p-auto">
        <h1 className="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-4xl text-gray-800">
          Items
        </h1>
        <div className="flex overflow-x-scroll pb-10 hide-scroll-bar h-full">
          <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 ">
            <div className="inline-block px-3 w-full h-full">
              <div className="w-64 h-64 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <div className="relative">
                  <img
                    src={image1}
                    className="object-contain w-full h-full rounded-lg"
                    alt="Image 5"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 opacity-0 transition-opacity duration-300 hover:opacity-100">
                    <p>Price: $10</p>
                    <p>Details: Lorem ipsum dolor sit amet...</p>
                    <div className="w-full flex justify-end mr-4">
                      <button className="bg-green-500 text-white font-bold p-1 rounded-lg text-center">
                        Buy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="inline-block px-3">
              <div className="w-64 h-64 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <div className="relative aspect-w-1 aspect-h-1">
                  <img
                    src={image2}
                    className="object-cover w-full h-full rounded-lg"
                    alt="Image 1"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 opacity-0 transition-opacity duration-300 hover:opacity-100">
                    <p>Price: $10</p>
                    <p>Details: Lorem ipsum dolor sit amet...</p>
                    <div className="w-full flex justify-end mr-4">
                      <button className="bg-green-500 text-white font-bold p-1 rounded-lg text-center">
                        Buy
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="inline-block px-3">
            <div className="w-64 h-64 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <div className="relative aspect-w-1 aspect-h-1">
                <img
                  src={image5}
                  className="object-cover w-full h-full rounded-lg"
                  alt="Image 4"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 opacity-0 transition-opacity duration-300 hover:opacity-100">
                  <p>Price: $10</p>
                  <p>Details: Lorem ipsum dolor sit amet...</p>
                  <div className="w-full flex justify-end mr-4">
                    <button className="bg-green-500 text-white font-bold p-1 rounded-lg text-center">
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="inline-block px-3">
            <div className="w-64 h-64 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <div className="relative aspect-w-1 aspect-h-1">
                <img
                  src={image5}
                  className="object-cover w-full h-full rounded-lg"
                  alt="Image 5"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 opacity-0 transition-opacity duration-300 hover:opacity-100">
                  <p>Price: $10</p>
                  <p>Details: Lorem ipsum dolor sit amet...</p>
                  <div className="w-full flex justify-end mr-4">
                    <button className="bg-green-500 text-white font-bold p-1 rounded-lg text-center">
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="inline-block px-3">
            <div className="w-64 h-64 max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <div className="relative aspect-w-1 aspect-h-1">
                <img
                  src={image5}
                  className="object-cover w-full h-full rounded-lg"
                  alt="Image 5"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 opacity-0 transition-opacity duration-300 hover:opacity-100">
                  <p>Price: $10</p>
                  <p>Details: Lorem ipsum dolor sit amet...</p>
                  <div className="w-full flex justify-end mr-4">
                    <button className="bg-green-500 text-white font-bold p-1 rounded-lg text-center">
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="inline-block px-3 w-full h-full">
            <div className="w-full h-full max-w-xs overflow-hidden rounded-lg shadow-md bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out">
              <div className="relative aspect-w-1 aspect-h-1">
                <img
                  src={image1}
                  className="object-cover w-full h-full rounded-lg"
                  alt="Image 5"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2 opacity-0 transition-opacity duration-300 hover:opacity-100">
                  <p>Price: $10</p>
                  <p>Details: Lorem ipsum dolor sit amet...</p>
                  <div className="w-full flex justify-end mr-4">
                    <button className="bg-green-500 text-white font-bold p-1 rounded-lg text-center">
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-16 text-xl md:text-2xl bg-slate-200 md:space-x-16">
        <div className="m-4">
          <p>
            <span className="text-blue-600 text-8xl">&ldquo;</span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            aperiam nesciunt aliquam, illum numquam vero doloribus suscipit
            praesentium repudiandae eaque quisquam, at voluptatem ex molestias
            quasi necessitatibus ratione. Doloribus, nostrum.
          </p>
          <p className="text-blue-700 mt-4 font-mono">kaleab Endrias</p>
          <p className="text-lg font-mono">CEO</p>
        </div>
        <div className="m-4">
          <p>
            <span className="text-blue-600 text-8xl">&ldquo;</span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
            aperiam nesciunt aliquam, illum numquam vero doloribus suscipit
            praesentium repudiandae eaque quisquam, at voluptatem ex molestias
            quasi necessitatibus ratione. Doloribus, nostrum.
          </p>
          <p className="text-blue-700 mt-4 font-mono">Meseret Defar</p>
          <p className="text-lg font-mono">Long distance athlete</p>
        </div>
      </div>
    </>
  );
}
