import React, { useEffect } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import Color from "../components/Color";
import QuantityPicker from "../components/QuantityPicker";
import { FaTrash } from "react-icons/fa";
import laptop from "../assets/images/laptop.jpg";
import ButtonWidget from "../widgets/ButtonWidget";
import { BiCart, BiLeftArrow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { IoBagCheckOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/user/userSlice";

const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state?.auth?.orderProducts);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <>
      <Meta title="Orders - ShoppingSpot" />
      <BreadCrumb title="Orders" />
      <div className="bg-gray-100 py-4">
        <div className="max-w-[1300px] pb-10 md:pb-20 mx-auto">
          {orderState?.map((orderItem) => (
            <div
              key={orderItem?._id}
              className="bg-white rounded-lg px-8 py-3 shadow-sm mb-3"
            >
              <div className="flex justify-between px-8 pb-3 border-b-[1px] border-gray-300">
                <p>
                  Order Id:{" "}
                  <span className="text-color-8 font-medium">
                    {orderItem?._id}
                  </span>
                </p>
                <p>
                  Order On:{" "}
                  <span className="text-color-1 font-medium">
                    {new Date(orderItem?.paidAt).toDateString()}
                  </span>
                </p>
                <p>
                  Order Status:{" "}
                  <span className="text-color-6 font-medium">
                    {orderItem?.orderStatus}
                  </span>
                </p>
              </div>
              <div className="py-4">
                {orderItem?.orderItems?.map((item, index) => (
                  <div key={item?._id} className="flex  items-center my-2 px-8">
                    <div className="w-1/5 text-center">
                      <img
                        className="w-20"
                        src={item?.product?.images[0] || laptop}
                        alt=""
                      />
                    </div>
                    <div className="w-2/5 text-center">
                      <h6 className="text-xl font-bold">
                        {item?.product?.title}
                      </h6>
                    </div>
                    <div className="w-3/5 flex justify-around text-center">
                      <p className="flex justify-center gap-3 w-1/3">
                        <span>Color: </span>
                        <Color colorData={[item?.color]} />
                      </p>
                      {item?.product?.size && (
                        <p>Size: {item?.product?.size}</p>
                      )}
                      <p className="w-1/3">Qty: {item?.quantity}</p>
                      <p className="w-1/3">₹{item?.quantity * item?.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between px-8 pt-3 mb-3 items-center border-t-[1px] border-gray-300">
                <div className="">
                  <h6 className="font-bold">Shipping Address: </h6>
                  <p>
                    Mr/Ms. {orderItem?.shippingInfo?.firstName}{" "}
                    {orderItem?.shippingInfo?.lastName},{" "}
                    {orderItem?.shippingInfo?.address},{" "}
                    {orderItem?.shippingInfo?.other},{" "}
                    {orderItem?.shippingInfo?.city},{" "}
                    {orderItem?.shippingInfo?.state},{" "}
                    {orderItem?.shippingInfo?.pincode}
                  </p>
                </div>
                <div className="flex flex-col w-40 border-l-[1px] border-gray-400 px-3">
                  <div className="font-bold text-lg">
                    <span className="text-lg font-bold">Total: </span>
                    <span className="text-color-1 ">
                      ₹{orderItem?.totalPrice}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {orderState?.length === 0 && (
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

export default Orders;
