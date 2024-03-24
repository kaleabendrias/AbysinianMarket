import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const SingleCloth = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const getClothes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/shop/cloth/${id}`
        );
        setData(response.data);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.log(error);
        setLoading(false); // Set loading to false even if an error occurs
      } finally {
        setLoading(false); // Set loading to false after data fetching is completed
        console.log(data);
      }
    };

    getClothes();
  }, []);

  const handleBuy = async (e) => {
    e.preventDefault;
    try {
      const res = await axios.post(
        "http://localhost:5000/api/buy/",
        { id },
        { withCredentials: true },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(res);
      const checkoutUrl = res.data.data.checkout_url;
      window.location.href = checkoutUrl;
    } catch (e) {
      console.log(e);
    }
  };

  if (loading) {
    return <div className="mt-28">Loading...</div>; // Render a loading indicator while fetching data
  }

  return (
    <div className="my-28 flex flex-wrap justify-center text-black">
      <div className="group border-gray-100/30 flex w-full max-w-4xl self-center overflow-hidden rounded-lg border bg-white shadow-md m-2">
        <a
          className="relative mx-3 mt-3 flex h-full overflow-hidden rounded-xl"
          href="#"
        >
          {data.images?.map((image, imageIndex) => (
            <Link
              key={imageIndex}
              to={`/cloth/${data._id}`}
              className="inline-block m-2 w-full h-full"
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
        <div className="mt-4 px-5 pb-5 w-full h-full">
          <div className="mt-2 mb-5 flex flex-col space-y-3 justify-between">
            <p>
              <span className="text-xl font-light ">{data.description}</span>
            </p>
            <a href="#">
              <h5 className="text-xl tracking-tight ">
                <span>size: </span>
                {data.size}
              </h5>
            </a>
            <p>
              <span className="text-xl font-bold ">
                <span>Price: </span>
                {data.price} ETB
              </span>
            </p>
          </div>
          <button
            onClick={handleBuy}
            className="text-white hover:border-white/40 flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-5 py-2.5 text-center text-md font-medium  focus:outline-none focus:ring-4 focus:ring-blue-300"
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
    </div>
  );
};

export default SingleCloth;
