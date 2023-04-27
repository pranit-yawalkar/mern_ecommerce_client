import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Color from "../components/Color";
import laptop from "../assets/images/laptop.jpg";
import QuantityPicker from "../components/QuantityPicker";
import ButtonWidget from "../widgets/ButtonWidget";
import { BiCart, BiLeftArrow } from "react-icons/bi";
import { IoBagCheckOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCartProduct,
  getCart,
  updateCartQuantity,
} from "../features/user/userSlice";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userCartState = useSelector((state) => state?.auth?.cartProducts);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    dispatch(getCart());
  }, []);

  useEffect(() => {
    getSubtotal();
  }, [userCartState]);

  const deleteProductFromCart = (id) => {
    dispatch(deleteCartProduct(id));
    dispatch(getCart());
  };

  const getSubtotal = () => {
    let subtotal = 0;
    for (let i = 0; i < userCartState?.length; i++) {
      subtotal =
        subtotal + Number(userCartState[i]?.quantity * userCartState[i]?.price);
      setTotal(subtotal);
    }
  };

  return (
    <>
      <Meta title="Cart - ShoppingSpot" />
      <BreadCrumb title="Cart" />
      <div className="bg-gray-100 py-4">
        {userCartState?.length > 0 && (
          <div className="max-w-[1300px] pb-10 md:pb-20 mx-auto">
            <div className="inline-block bg-white min-w-full shadow-md rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal text-center">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-xs text-center font-semibold text-black uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-xs text-center font-semibold text-black uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-xs text-center font-semibold text-black uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-xs text-center font-semibold text-black uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-xs text-center font-semibold text-black uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-xs text-center font-semibold text-black uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userCartState &&
                    userCartState?.map((product) => (
                      <tr key={product?._id}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <img
                            className="w-24 mx-auto"
                            src={product?.productId?.images[0]?.url || laptop}
                            alt="laptop"
                          />
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <h6 className="text-md font-bold">
                            {product?.productId?.title}
                          </h6>
                          <div className="flex gap-3 justify-center my-2">
                            <p>Color:</p>
                            <Color colorData={[product?.color]} />
                          </div>
                          {product?.productId?.size && (
                            <p>Size: {product?.productId?.size}</p>
                          )}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white font-medium text-md">
                          ₹{product?.productId?.price}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <QuantityPicker
                            qty={product?.quantity}
                            id={product?._id}
                          />
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white font-medium text-md">
                          ₹{product?.productId?.price * product?.quantity}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white font-medium text-md text-color-8 cursor-pointer">
                          <FaTrash
                            className="mx-auto"
                            onClick={() => deleteProductFromCart(product?._id)}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="my-5 flex justify-between">
              <div>
                <ButtonWidget
                  text={
                    <div className="flex gap-3 items-center">
                      <BiLeftArrow />
                      <span>Continue Shopping</span>
                    </div>
                  }
                  color={"bg-color-1"}
                  textcolor={"white"}
                  handleClick={() => navigate("/store")}
                />
              </div>
              <div className="flex flex-col items-center">
                <h4 className="text-2xl font-medium">
                  Subtotal: <span className="text-color-1"> ₹{total}</span>
                </h4>
                <span className="my-3">
                  Taxes and shipping charges are included
                </span>
                <ButtonWidget
                  text={
                    <div className="flex gap-3 items-center">
                      <IoBagCheckOutline />
                      <span>Checkout</span>
                    </div>
                  }
                  color={"bg-color-6"}
                  textcolor={"white"}
                  handleClick={() => navigate("/checkout")}
                />
              </div>
            </div>
          </div>
        )}
        {userCartState?.length === 0 && (
          <div className="bg-white w-full py-20 flex flex-col gap-8 items-center">
            <BiCart size={60} />
            <h3 className="font-medium text-3xl">
              Your cart is <span className="text-red-500">empty</span>
            </h3>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
