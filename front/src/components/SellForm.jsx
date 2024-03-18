import axios from "axios";
import { useState } from "react";

const SellForm = () => {
  const [selectedType, setSelectedType] = useState("");
  const [discription, setDiscription] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (event) => {
    const newImages = Array.from(event.target.files); // Convert FileList to array
    setSelectedImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct FormData to handle images and other data
    const formData = new FormData();
    formData.append("type", selectedType);
    formData.append("description", discription); // Corrected typo
    formData.append("price", price);
    formData.append("size", size);
    formData.append("color", color);

    // Append each selected image to the FormData
    selectedImages.forEach((image) => {
      formData.append("images", image); // Assuming your backend expects an array of images
    });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/sell",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set for file uploads
          },
        }
      );

      // Handle successful response from the server
      console.log(response.data);
      // Clear form fields or display a success message
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="my-32">
      <div className="flex justify-center mt-16 text-2xl">
        <span className=" bg-black text-white text-center px-1 rounded-md">
          Abysinia
        </span>
        Market
      </div>

      <div className="my-16 h-full flex flex-col items-center justify-center">
        <form className="space-y-4 w-[38%]">
          <div className="flex flex-col justify-center">
            <label className="font-thin text-xl m-2">Type</label>
            <select
              id="type"
              name="type"
              className="border-black border-2 mx-2"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value="">Select Type</option>
              <option value="vehicle">Vehicle</option>
              <option value="property">Property</option>
              <option value="clothing">Clothing</option>
            </select>
          </div>
          <div className="flex flex-col justify-center">
            <label className="font-thin text-xl m-2">Discription</label>
            <input
              className="border border-gray-400 rounded-sm focus:outline-none focus:border-gray-600 p-1 m-2"
              type="text"
              value={discription}
              onChange={(e) => setDiscription(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-center">
            <label className="font-thin text-xl m-2">Price</label>
            <input
              className="border border-gray-400 rounded-sm focus:outline-none focus:border-gray-600 p-1 m-2"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-center">
            <label className="font-thin text-xl m-2">Size</label>
            <input
              className="border border-gray-400 rounded-sm focus:outline-none focus:border-gray-600 p-1 m-2"
              type="text"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-center">
            <label className="font-thin text-xl m-2">Color</label>
            <input
              className="border border-gray-400 rounded-sm focus:outline-none focus:border-gray-600 p-1 m-2"
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-center">
            <label className="font-thin text-xl m-2">Image</label>
            <input
              type="file"
              accept="image/*"
              multiple
              className="border border-gray-400 rounded-sm focus:outline-none focus:border-gray-600 p-1 m-2"
              onChange={handleImageChange}
            />
          </div>

          <div className="flex flex-col justify-center">
            <button
              className="w-full bg-blue-700 text-white rounded-lg mt-8 py-2 hover:bg-blue-800"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellForm;
