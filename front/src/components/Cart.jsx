import axios from "axios";
import { useCartStore } from "../../store/cartStore";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authStore";
import { FaTrash } from "react-icons/fa"; // Import trash icon
import api from "../services/axiosInterceptor"

const Cart = () => {
  const { cart, clearCart, removeFromCart } = useCartStore(); // Add removeFromCart
  const { isAuthenticated, user } = useAuthStore();
  const [location, setLocation] = useState(null); // State to store user's location
  const userId = user?.userId; // Use optional chaining to avoid errors if user is null

  // Fetch the user's location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation([position.coords.longitude, position.coords.latitude]);
        },
        (error) => {
          console.error("Error fetching location:", error);
          alert("Unable to fetch your location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  }, []);

  const handleBuyAll = async () => {
    if (!userId) {
      alert("Please sign in to proceed with the purchase.");
      return;
    }

    if (!location) {
      alert("Please enable location services to proceed with the purchase.");
      return;
    }

    try {
      // Prepare the items array for the backend
      const items = cart.map((item) => ({
        id: item._id,
        type: item.type, // Assuming each item has a `type` field (e.g., "clothing" or "accessory")
      }));

      // Send the items, userId, and location to the backend
      const response = await api.post(
        "/api/buy/",
        { items, userId, location },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      // Redirect to the payment checkout URL
      window.location.href = response.data.data.checkout_url;
    } catch (error) {
      console.error("Error during purchase:", error);
      alert("Failed to process payment. Please try again.");
    }
  };

  return (
    <div className="my-28 p-4 w-full">
      <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col items-center">
          <div className="w-full max-w-4xl">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border-b border-gray-200 py-4 hover:bg-gray-50 transition duration-300"
              >
                <div className="flex items-center">
                  <img
                    src={item.images[0].url}
                    alt={item.type}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="ml-4">
                    <h2 className="text-lg font-semibold">{item.type}</h2>
                    <p className="text-gray-600">{item.price} ETB</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)} // Remove item from cart
                  className="text-red-600 hover:text-red-800 transition duration-300"
                >
                  <FaTrash className="w-5 h-5" /> {/* Trash icon */}
                </button>
              </div>
            ))}
          </div>
          <div className="mt-8 flex space-x-4">
            <button
              onClick={handleBuyAll}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Buy All
            </button>
            <button
              onClick={clearCart}
              className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition duration-300"
            >
              Clear Cart
            </button>
          </div>
        </div>
      )}
      <div className="text-center mt-8">
        <Link to="/" className="text-blue-600 hover:text-blue-800">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Cart;