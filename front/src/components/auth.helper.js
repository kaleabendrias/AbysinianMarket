import axios from "axios";
const checkAuth = async () => {
  try {
    const response = await axios.get(
      "https://abysinianmarket.onrender.com/api/auth/checkauth",
      {
        withCredentials: true,
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
