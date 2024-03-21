import image1 from "../assets/images/anh-nhat-YKFBdV-RRXI-unsplash.jpg";
import image2 from "../assets/images/domino-164_6wVEHfI-unsplash.webp";
import image5 from "../assets/images/faith-yarn-Wr0TpKqf26s-unsplash.webp";
import { Link } from "react-router-dom";

const Protected = () => {
  return (
    <div className="my-24">
      <div className="text-4xl flex justify-center items-center">
        <span className="bg-white rounded-lg p-1 text-slate-900 font-bold">
          Abysinia
        </span>
        Market
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link to="/accessories">
          <div className="hover:w-[110%] hover:h-[110%] hover:z-10">
            <img
              src={image1}
              className="w-full h-full max-h-[400px] rounded-xl object-cover"
            />
            <p className="text-center">Accessories</p>
          </div>
        </Link>
        <Link to="/cloths">
          <div className="hover:w-[110%] hover:h-[110%] hover:z-10 hover:text-xl">
            <img
              src={image2}
              className="w-full h-full max-h-[400px] rounded-xl object-cover"
            />
            <p className="text-center">Clothing</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Protected;
