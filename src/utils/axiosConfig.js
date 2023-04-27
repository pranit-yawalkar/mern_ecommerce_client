// export const base_url = "http://localhost:5000/api/";
export const base_url = "https://shoppingspot-backend.onrender.com/api/";

const getUserData = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${getUserData !== null ? getUserData.token : ""}`,
    Accept: "application/json",
  },
};
