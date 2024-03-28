import axios from "axios";
const checkAuth = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not found");
      return false;
    }
    const response = await axios.get(
      "https://abysinianmarket.onrender.com/api/auth/checkauth",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(response);
    console.log("true");
    return true;
  } catch (err) {
    console.log("false");
    return false;
  }
};

export default checkAuth;
