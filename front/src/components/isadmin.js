import axios from "axios";
const isAdmin = async () => {
  try {
    const response = await axios.get(
      "https://abysinianmarket.onrender.com/api/auth/checkadmin",
      {
        withCredentials: true,
      }
    );
    console.log(response.data);

    return response.data;
  } catch (err) {
    console.log("false");
    return false;
  }
};

export default isAdmin;
