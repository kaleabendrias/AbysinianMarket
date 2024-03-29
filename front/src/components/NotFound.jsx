import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-200">
      <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
      <p className="text-lg">
        Sorry, the page you are looking for does not exist.
      </p>
      <p className="">
        Return to{" "}
        <Link to="/" className="text-blue-500 underline">
          Home
        </Link>
      </p>
    </div>
  );
};

export default NotFound;
