import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";
import { toast } from "react-toastify";

const register = async (userData) => {
  const response = await axios.post(`${base_url}auth/register`, userData);
  if (response.data) {
    return response.data;
  }
};

const login = async (userData) => {
  const response = await axios.post(`${base_url}auth/login`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
    return response.data;
  }
};

const forgotPasswordToken = async (data) => {
  const response = await axios.post(
    `${base_url}auth/forgot-password-token`,
    data
  );
  if (response.data) {
    return response.data;
  }
};

const resetUserPassword = async (data) => {
  const response = await axios.put(
    `${base_url}auth/reset-password/${data.token}`,
    { password: data.password }
  );
  if (response.data) {
    return response.data;
  }
};

const updateUser = async (userData) => {
  const response = await axios.put(`${base_url}user/update`, userData, config);
  if (response.data) {
    return response.data;
  }
};

const getWishlist = async () => {
  const response = await axios.get(`${base_url}user/wishlist`, config);
  if (response.data) {
    return response.data;
  }
};

const addProductToCart = async (cartData) => {
  const response = await axios.post(`${base_url}user/cart`, cartData, config);
  if (response.status === 401) {
    toast.error("Please login to add!");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return;
  }
  if (response.data) {
    return response.data;
  }
};

const getUserCart = async () => {
  const response = await axios.get(`${base_url}user/cart`, config);
  if (response.data) {
    return response.data;
  }
};

const emptyCart = async (id) => {
  const response = await axios.delete(`${base_url}user/cart/empty`, config);
  if (response.data) {
    return response.data;
  }
};

const removeProductFromCart = async (id) => {
  const response = await axios.delete(`${base_url}user/cart/${id}`, config);
  if (response.data) {
    return response.data;
  }
};

const updateQuantityFromCart = async (cartItem) => {
  const response = await axios.put(
    `${base_url}user/cart/${cartItem?.cartItemId}`,
    { quantity: cartItem?.quantity },
    config
  );
  if (response.data) {
    return response.data;
  }
};

const createOrder = async (orderDetail) => {
  const response = await axios.post(
    `${base_url}user/cart/create-order`,
    orderDetail,
    config
  );
  if (response.data) {
    return response.data;
  }
};

const getUserOrders = async () => {
  const response = await axios.get(`${base_url}user/orders`, config);
  if (response.data) {
    return response.data;
  }
};

export const userService = {
  register,
  login,
  getWishlist,
  addProductToCart,
  getUserCart,
  removeProductFromCart,
  updateQuantityFromCart,
  createOrder,
  getUserOrders,
  updateUser,
  forgotPasswordToken,
  resetUserPassword,
  emptyCart,
};
