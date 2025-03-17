import image1 from "../assets/images/Gold Color Ethiopian Dubai Jewelry Sets Necklace Pendant Earrings Ring - c _ 50cm (1).jpeg";
import image2 from "../assets/images/Ethiopian Culture 🇪🇹.jpeg";
import { Link } from "react-router-dom";

const Protected = () => {
  return (
    <div className="my-24 w-full">
      <div className="text-4xl flex justify-center items-center">
        <span className="bg-white rounded-lg p-1 text-slate-900 font-bold">
          Abysinia
        </span>
        Market
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-14 mt-8">
        <Link to="/accessories">
          <div className="hover:w-[110%] hover:h-[110%] hover:z-10">
            <img
              src={image1}
              className="w-full h-full max-h-[400px] rounded-xl object-cover"
            />
            <p className="text-center mt-4 text-xl font-bold text-gray-800">
              Accessories
            </p>
          </div>
        </Link>
        <Link to="/cloths">
          <div className="hover:w-[110%] hover:h-[110%] hover:z-10 hover:text-xl">
            <img
              src={image2}
              className="w-full h-full max-h-[400px] rounded-xl object-cover"
            />
            <p className="text-center mt-4 text-xl font-bold text-gray-800">
              Clothing
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Protected;
