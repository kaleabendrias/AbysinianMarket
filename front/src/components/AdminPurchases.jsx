// pages/AdminPurchases.js
import { useEffect, useState } from "react";

import api from "../services/axiosInterceptor"

const AdminPurchases = () => {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await api.get("/api/purchases", {
          withCredentials: true,
        });
        setPurchases(response.data);
      } catch (error) {
        console.error("Error fetching purchases:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">All Purchases</h1>
      {purchases.length === 0 ? (
        <p>No purchases found.</p>
      ) : (
        <div className="space-y-6">
          {purchases.map((purchase) => (
            <div
              key={purchase._id}
              className="border border-gray-200 rounded-lg p-6 shadow-sm"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  Purchase ID: {purchase._id}
                </h2>
                <p className="text-gray-600">
                  Date: {new Date(purchase.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-medium">User Details</h3>
                <p>User ID: {purchase.userId?._id}</p>
                <p>Name: {purchase.userId?.name}</p>
                <p>Email: {purchase.userId?.email}</p>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-medium">Items Purchased</h3>
                <ul className="space-y-2">
                  {purchase.items.map((item, index) => (
                    <li key={index} className="flex justify-between">
                      <span>
                        {item.type === "clothing" ? "Clothing" : "Accessory"} (ID:{" "}
                        {item.itemId})
                      </span>
                      <span>{item.price} ETB</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-medium">Total Amount</h3>
                <p>{purchase.totalAmount} ETB</p>
              </div>
              <div>
                <h3 className="text-lg font-medium">Location</h3>
                <p>
                  Longitude: {purchase.location.coordinates[0]}, Latitude:{" "}
                  {purchase.location.coordinates[1]}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPurchases;