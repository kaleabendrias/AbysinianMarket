import axios from "axios";

const isAdmin = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not found");
      return false;
    }

    const response = await axios.get(
      "https://abysinianmarket.onrender.com/api/auth/checkadmin",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response.data);

    return response.data;
  } catch (err) {
    console.log("Error:", err);
    return false;
  }
};

export default isAdmin;
