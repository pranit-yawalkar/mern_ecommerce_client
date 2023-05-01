import React from "react";
import { BsCartPlus, BsEye, BsHeart } from "react-icons/bs";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addToWishlist } from "../features/product/productSlice";
import { toast } from "react-toastify";
import { addToCart } from "../features/user/userSlice";

const ProductCard = ({
  id,
  img,
  brand,
  name,
  color,
  description,
  price,
  rating,
  grid,
  handleClick,
}) => {
  const location = useLocation();
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
      console.log("for l");
      if (id === cartState[i]?.productId?._id) {
        toast.info("Product is already present in the cart");
        return;
      }
    }
    if (cartState) {
      dispatch(
        addToCart({
          productId: id,
          quantity: 1,
          color: color[0],
          price,
        })
      );
    }
  };

  return (
    <div
      className={`${
        location.pathname === "/store"
          ? `${
              grid === 4
                ? "w-full md:w-1/4"
                : grid === 3
                ? "md:w-1/3"
                : grid === 2
                ? "md:w-1/2"
                : "w-full"
            } p-2`
          : "w-full"
      }`}
    >
      <div className={`bg-white rounded-lg w-full shadow-md overflow-hidden`}>
        <div className={`relative px-5 ${grid === 1 && "md:flex"}`}>
          <div className={`group ${grid === 1 && "md:w-1/2"}`}>
            <div
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => addToWish(id)}
            >
              <BsHeart />
            </div>
            <div
              className={`flex flex-col gap-4 absolute top-10 -right-5 transition-all group-hover:right-3 cursor-pointer ${
                grid === 1 && "md:right-3"
              }`}
            >
              <BsEye
                onClick={() =>
                  navigate(
                    location.pathname === "/store" ? `${id}` : `product/${id}`
                  )
                }
                size={18}
              />
              <BsCartPlus onClick={addProductToCart} size={18} />
            </div>
            <img className="w-full" src={img} alt={`${brand}`} />
          </div>
          <div className="px-3 py-5 cursor-pointer" onClick={handleClick}>
            <h6 className="text-sm text-red-500">{brand}</h6>
            <h5 className="text-sm font-bold">{name}</h5>
            <ReactStars
              count={5}
              size={24}
              value={rating ?? 4}
              edit={false}
              activeColor="#ffd700"
            />
            {grid === 1 && (
              <p className="text-sm text-gray-400 mb-3">{description}</p>
            )}
            <span className="text-lg font-light">₹{price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
