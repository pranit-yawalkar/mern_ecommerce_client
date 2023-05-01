import React from "react";
import { BsCartPlus, BsEye, BsHeart } from "react-icons/bs";
import ReactStars from "react-rating-stars-component";
import ButtonWidget from "../widgets/ButtonWidget";
import { addToWishlist } from "../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../features/user/userSlice";
import { toast } from "react-toastify";

const SpecialProductCard = ({
  id,
  img,
  brand,
  name,
  price,
  sold,
  quantity,
  rating,
  color,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const wishlistState = useSelector((state) => state.auth.wishlist);

  const addToWish = (prodId) => {
    if (!localStorage.getItem("user")) {
      toast.error("Please login to add!");
      navigate("/login");
      return;
    }
    for (let i = 0; i < wishlistState?.length; i++) {
      if (id === wishlistState[i]?._id) {
        toast.info("Product is already present in the wishlist");
        return;
      }
    }

    dispatch(addToWishlist(prodId));
  };

  const addProductToCart = () => {
    if (!localStorage.getItem("user")) {
      toast.error("Please login to add!");
      navigate("/login");
      return;
    }
    for (let i = 0; i < cartState?.length; i++) {
      if (id === cartState[i]?.productId?._id) {
        toast.info("Product is already present in the cart");
        return;
      }
    }
    dispatch(
      addToCart({
        productId: id,
        quantity: 1,
        color: color[0],
        price,
      })
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-md ">
      <div className="px-4 py-3 flex gap-3">
        <div className="group relative overflow-hidden px-3 py-5">
          <div className="absolute right-1 top-1" onClick={() => addToWish(id)}>
            <BsHeart />
          </div>
          <div className="flex flex-col gap-4 absolute top-8 -right-5 transition-all group-hover:right-1 cursor-pointer">
            <BsEye onClick={() => navigate(`product/${id}`)} size={18} />
            <BsCartPlus onClick={addProductToCart} size={18} />
          </div>
          <img className="w-full" src={img} alt={`${brand}`} />
        </div>
        <div className="p-3">
          <h6 className="text-sm text-red-500">{brand}</h6>
          <h5 className="text-sm font-bold">{name}</h5>
          <ReactStars
            count={5}
            size={24}
            value={parseInt(rating) ?? 4}
            edit={false}
            activeColor="#ffd700"
          />
          <span className="text-lg font-light line-through mr-2">₹{price}</span>
          <span className="text-lg font-normal text-color-1 my-3">
            ₹{price}
          </span>
          <div className="flex gap-2 my-2">
            <span className="font-medium">5 days</span>
            <div>
              <span className="bg-color-8 rounded-full p-2 text-white text-xs">
                07
              </span>
              :
              <span className="bg-color-8 rounded-full p-2 text-white text-xs">
                52
              </span>
              :
              <span className="bg-color-8 rounded-full p-2 text-white text-xs">
                11
              </span>
            </div>
          </div>
          <div>
            <span className="text-sm">
              Sold: <span className="font-bold">{sold}</span> of {quantity}
            </span>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mb-3 dark:bg-gray-700">
              <div
                className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
                style={{ width: `${(sold / quantity) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="mt-2">
            <ButtonWidget
              color="bg-color-1"
              textcolor="white"
              hovercolor="indigo-800"
              size="xs"
              text="Add to cart"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialProductCard;
