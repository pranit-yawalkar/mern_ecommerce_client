import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import { useDispatch, useSelector } from "react-redux";
import { getUserWishlist } from "../features/user/userSlice";
import { addToWishlist } from "../features/product/productSlice";
import { BsFillBagDashFill } from "react-icons/bs";

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistState = useSelector((state) => state.auth.wishlist);
  useEffect(() => {
    getWishlist();
  }, []);

  const getWishlist = () => {
    dispatch(getUserWishlist());
  };

  const removeFromWishlist = (id) => {
    dispatch(addToWishlist(id));
    setTimeout(() => {
      getWishlist();
    }, 300);
  };

  return (
    <>
      <Meta title="Wishlist - ShoppingSpot" />
      <BreadCrumb title="Wishlist" />
      <div className="bg-gray-100 py-4">
        <div className="max-w-[1300px]  pb-10 md:pb-20 mx-auto flex flex-col-reverse md:flex-row gap-5">
          {wishlistState?.length === 0 && (
            <div className="bg-white w-full py-20 flex flex-col gap-8 items-center">
              <BsFillBagDashFill size={60} />
              <h3 className="font-medium text-3xl">
                Your wishlist is <span className="text-red-500">empty</span>
              </h3>
            </div>
          )}
          {wishlistState?.map((item, index) => (
            <div className="w-full md:w-1/4 md:flex flex-col relative bg-white rounded-lg px-5 py-4 my-2 shadow-sm mb-3">
              <div
                className="absolute top-3 right-3 cursor-pointer"
                onClick={() => removeFromWishlist(item._id)}
              >
                <MdClose />
              </div>
              <img
                className="w-full h-52 object-cover"
                src={item.images[0]?.url ?? "images/products/laptop.jpg"}
                alt="laptop"
              />
              <div className="flex flex-col gap-3 mt-5">
                <div>
                  <h6 className="text-sm text-red-500">{item?.brand}</h6>
                  <h5 className="text-md font-bold">{item?.title}</h5>
                </div>
                <h6 className="text-lg font-bold text-color-1">
                  ₹ {item?.price}
                </h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
