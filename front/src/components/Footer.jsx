import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaGoogle,
} from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row justify-center items-center w-full bg-black text-white p-2 opacity-95 space-x-4">
        <div className="mt-6 mr-12 hidden md:flex">
          <p>
            <span className="bg-white rounded-lg p-1 text-slate-900 font-bold">
              Abysinia
            </span>{" "}
            Market
          </p>
        </div>
        <div className="">
          <div className="flex items-center justify-center w-full space-x-3">
            <FaFacebook style={{ fontSize: "34px" }} />
            <FaGithub style={{ fontSize: "34px" }} />
            <FaInstagram style={{ fontSize: "34px" }} />
            <FaTwitter style={{ fontSize: "34px" }} />
            <FaLinkedin style={{ fontSize: "34px" }} />
            <FaGoogle style={{ fontSize: "34px" }} />
          </div>

          <div className="flex items-center justify-center mt-5 text-lg space-x-2">
            <p>Signup for our newsletter</p>
            <input type="text" />
            <button className="text-white bg-green-600 p-2 rounded-lg">
              Submit
            </button>
          </div>

          <div className="flex justify-center mt-2">
            @2024 - This website is built by&nbsp;
            <a href="https://github.com/kaleabendrias" target="_blank">
              <span className="font-bold">Kaleab Endrias</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
