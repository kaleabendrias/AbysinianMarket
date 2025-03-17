import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SellForm = () => {
  const [selectedType, setSelectedType] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    const newImages = Array.from(event.target.files); // Convert FileList to array
    setSelectedImages(newImages);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form fields
    if (!selectedType || !description || !price || !size || !color || selectedImages.length === 0) {
      setError("Please fill out all fields and upload at least one image.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    // Construct FormData to handle images and other data
    const formData = new FormData();
    formData.append("type", selectedType);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("size", size);
    formData.append("color", color);

    // Append each selected image to the FormData
    selectedImages.forEach((image) => {
      formData.append("images", image); // Assuming your backend expects an array of images
    });

    try {
      const response = await axios.post(
        "https://abysinianmarket.onrender.com/api/auth/sell",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set for file uploads
          },
        }
      );

      // Handle successful response from the server
      console.log(response.data);
      navigate("/protected");
    } catch (error) {
      console.error(error);
      setError("Failed to submit the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="my-12 min-h-screen w-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            <span className="bg-black text-white px-2 rounded-md">Abysinia</span> Market
          </h2>
          <p className="mt-2 text-sm text-gray-600">Sell your items with ease</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="text-red-500 text-sm text-center">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Type</label>
              <select
                id="type"
                name="type"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                required
              >
                <option value="">Select Type</option>
                <option value="clothing">Clothing</option>
                <option value="accessories">Accessories</option>
                <option value="others">Others</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Price (ETB)</label>
              <input
                type="number"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Size</label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={size}
                onChange={(e) => setSize(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Color</label>
              <input
                type="text"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Images</label>
              <input
                type="file"
                accept="image/*"
                multiple
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleImageChange}
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SellForm;