import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import ProductCard from "../components/ProductCard";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ButtonWidget from "../widgets/ButtonWidget";
import ReactImageZoom from "react-image-zoom";
import { BiCartAdd } from "react-icons/bi";
import { FaCopy, FaRegHeart, FaShareAlt, FaTruck } from "react-icons/fa";
import { VscGitCompare } from "react-icons/vsc";
import Color from "../components/Color";
import laptop from "../assets/images/products/laptop.jpg";
import QuantityPicker from "../components/QuantityPicker";
import { useDispatch, useSelector } from "react-redux";
import {
  addRating,
  getAProduct,
  getProducts,
} from "../features/product/productSlice";
import { toast } from "react-toastify";
import { addToCart } from "../features/user/userSlice";
import { getCart } from "../features/user/userSlice";

const ProductDetail = () => {
  const navigate = useNavigate();
  const [color, setColor] = useState(null);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [popularProducts, setPopularProducts] = useState([]);
  console.log(popularProducts);

  const { id } = useParams();
  const dispatch = useDispatch();
  const productState = useSelector((state) => state?.product?.singleProduct);
  const productsState = useSelector((state) => state?.product?.products);
  const cartState = useSelector((state) => state?.auth?.cartProducts);

  useEffect(() => {
    dispatch(getAProduct(id));
    dispatch(getCart());
    dispatch(getProducts());
  }, []);

  useEffect(() => {
    let data = [];
    for (let i = 0; i < productsState?.length; i++) {
      const element = productsState[i];
      if (element?.tag.includes("popular")) {
        data.push(element);
      }
      setPopularProducts(data);
    }
  }, [productsState]);

  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);
  const addProductRating = () => {
    if (star === null) {
      toast.error("Please add star to rating");
      return;
    } else if (comment === null) {
      toast.error("Please add comment");
      return;
    } else {
      dispatch(addRating({ star, comment, productId: id }));
      setTimeout(() => {
        dispatch(getAProduct(id));
      }, [300]);
    }
  };

  useEffect(() => {
    for (let i = 0; i < cartState?.length; i++) {
      if (cartState[i]?.productId?._id === id) {
        setAlreadyAdded(true);
      }
    }
  }, []);

  const productAddToCart = () => {
    if (color === null) {
      toast.error("Please select a color");
      return false;
    }

    if (quantity > 0) {
      dispatch(
        addToCart({
          productId: productState?._id,
          quantity: quantity,
          color,
          price: productState?.price,
        })
      );
      setAlreadyAdded(true);
    }
  };

  const props = {
    width: 500,
    height: 500,
    zoomWidth: 500,
    img:
      productState?.images[0]?.url ||
      "https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/718ETwvLVOL._SL1500_.jpg",
  };
  const [orderedProduct, setOrderedProduct] = useState(true);

  return (
    <>
      <Meta title="Product Name" />
      <BreadCrumb title="Product Name" />
      <div className="bg-gray-100 py-4">
        <div className="max-w-[1300px] pb-10 md:pb-20 mx-auto">
          <section className="w-full bg-white py-8 flex">
            <div className="w-1/2 flex gap-3 flex-col mx-5">
              <div className="product-image border-2 border-gray-100">
                <ReactImageZoom {...props} />
              </div>
              <div className="flex flex-wrap gap-3 justify-center">
                <img
                  className="w-60 border-2 border-gray-100"
                  src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/718ETwvLVOL._SL1500_.jpg"
                  alt="laptop"
                />
                <img
                  className="w-60 border-2 border-gray-100"
                  src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/718ETwvLVOL._SL1500_.jpg"
                  alt="laptop"
                />
                <img
                  className="w-60 border-2 border-gray-100"
                  src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/718ETwvLVOL._SL1500_.jpg"
                  alt="laptop"
                />
                <img
                  className="w-60 border-2 border-gray-100"
                  src="https://m.media-amazon.com/images/W/IMAGERENDERING_521856-T1/images/I/718ETwvLVOL._SL1500_.jpg"
                  alt="laptop"
                />
              </div>
            </div>
            <div className="w-1/2 p-4">
              <div className="py-2 border-b-2 border-gray-200 flex justify-between">
                <h3 className="text-lg font-bold">{productState?.title}</h3>
                <div className="flex gap-5 items-center">
                  <div className="group flex relative">
                    <div className="cursor-pointer">
                      <FaRegHeart size={22} />
                    </div>
                    <span
                      className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-center text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 translate-y-full opacity-0 w-28 m-4 mx-auto"
                    >
                      Add to Wishlist
                    </span>
                  </div>
                  <div className="group flex relative">
                    <div className="cursor-pointer">
                      <FaShareAlt size={22} />
                    </div>
                    <span
                      className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-center text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 translate-y-full opacity-0 w-28 m-4 mx-auto"
                    >
                      Share
                    </span>
                  </div>
                </div>
              </div>
              <div className="py-2 border-b-2 border-gray-200">
                <p className="my-3 text-xl font-medium text-color-1">
                  ₹{productState?.price}
                </p>
                <div className="flex gap-3 items-center">
                  <ReactStars
                    count={5}
                    size={24}
                    value={productState?.totalRating?.toString()}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <span>( {productState?.ratings?.length} Reviews )</span>
                </div>
                <Link to="/" className="text-gray-500 text-sm">
                  Write a Review
                </Link>
              </div>
              <div className="py-5 flex flex-col gap-5">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold">Type: </span>
                  <span className="text-sm">Laptop</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold">Brand: </span>
                  <span className="text-sm">{productState?.brand}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold">Category: </span>
                  <span className="text-sm">{productState?.category}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold">Tags: </span>
                  <span className="text-sm">{productState?.tag}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold">Availability: </span>
                  <span className="text-sm text-color-6 font-bold">
                    In Stock
                  </span>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-sm font-bold">Size: </span>
                  <div className="flex flex-wrap gap-3">
                    <button className="px-2 border-[1px] cursor-pointer border-gray-500 text-center rounded-md">
                      S
                    </button>
                    <button className="px-2 border-[1px] cursor-pointer border-gray-500 text-center rounded-md">
                      M
                    </button>
                    <button className="px-2 border-[1px] cursor-pointer border-gray-500 text-center rounded-md">
                      L
                    </button>
                    <button className="px-2 border-[1px] cursor-pointer border-gray-500 text-center rounded-md">
                      XL
                    </button>
                    <button className="px-2 border-[1px] cursor-pointer border-gray-500 text-center rounded-md">
                      XXL
                    </button>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <span className="text-sm font-bold">Color: </span>
                  <Color
                    colorData={productState?.color}
                    setColorData={setColor}
                  />
                </div>
                <div className="flex gap-5 items-center">
                  {alreadyAdded === false && (
                    <QuantityPicker qty={quantity} id={id} />
                  )}
                  <ButtonWidget
                    text={
                      <div className="flex gap-2 items-center">
                        <BiCartAdd />
                        {alreadyAdded ? "Go to Cart" : "Add to cart"}
                      </div>
                    }
                    color="bg-color-1"
                    textcolor="white"
                    hovercolor="indigo-800"
                    handleClick={() =>
                      alreadyAdded
                        ? navigate("/cart")
                        : productAddToCart(productState?._id)
                    }
                  />
                  <ButtonWidget
                    text={
                      <div className="flex gap-2 items-center">
                        <BiCartAdd />
                        Buy Now
                      </div>
                    }
                    color="bg-color-6"
                    textcolor="white"
                    hovercolor="indigo-800"
                  />
                  <ButtonWidget
                    text={
                      <div className="flex gap-2 items-center">
                        <VscGitCompare />
                        Compare
                      </div>
                    }
                    color="bg-color-7"
                    textcolor="black"
                    hovercolor="indigo-800"
                  />
                </div>
              </div>
              <div className="py-5">
                <span className="flex gap-5 items-center font-bold">
                  <FaTruck /> Shipping & Returns
                </span>
                <p className="text-neutral-600 mt-3 group-open:animate-fadeIn">
                  Free Shipping and Returns are available on all orders! We ship
                  all US domestic orders within <b>5-10 business days!</b>
                </p>
              </div>
              <div className="flex gap-5 items-center">
                <h6 className="text-md font-bold">Product Link: </h6>
                <div className="w-40 flex">
                  <input
                    className="border border-gray-500 px-2 outline-none"
                    readOnly
                    value={window.location.href}
                  />
                  <div className="group flex relative">
                    <button className="bg-gray-300 p-2">
                      <FaCopy />
                    </button>
                    <span
                      className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-center text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 translate-y-full opacity-0 w-14 m-4 mx-auto"
                    >
                      Copy!
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full my-8">
            <h3 className="text-2xl font-bold">Description</h3>
            <div className="bg-white my-3 p-5 rounded-md shadow-md text-md text-gray-500">
              {productState?.description}
            </div>
          </section>
          <section className="w-full my-8">
            <h3 className="text-2xl font-bold">Reviews</h3>
            <div className="bg-white my-3 p-5 rounded-md shadow-md">
              <div className="flex items-center justify-between border-b-2 border-gray-200 py-3">
                <div>
                  <h5 className="text-xl">Customer Reviews</h5>
                  <div className="flex gap-5 items-center">
                    <ReactStars
                      count={5}
                      size={24}
                      value={4}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <span>Based on 2 reviews</span>
                  </div>
                </div>
                {orderedProduct && (
                  <Link
                    className="text-color-2 border-b-2 border-color-2"
                    to="/"
                  >
                    Write a review
                  </Link>
                )}
              </div>
              <div className="py-8 border-b-2 border-b-gray-200">
                <h4 className="text-xl">Write a review</h4>
                <ReactStars
                  count={5}
                  size={24}
                  value={star}
                  edit={true}
                  activeColor="#ffd700"
                  onChange={(e) => setStar(e)}
                />
                <textarea
                  className="outline-none border-2 w-full rounded-md px-2 py-1 text-black focus:border-2 focus:border-color-2 my-2"
                  name="comment"
                  id="comment"
                  rows="5"
                  placeholder="Comments"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
                <ButtonWidget
                  handleClick={addProductRating}
                  color="bg-color-1"
                  text="Submit Review"
                  textcolor="white"
                  hovercolor="indigo-800"
                  width="w-44"
                />
              </div>
              {productState?.ratings &&
                productState?.ratings?.map((item) => (
                  <div className="py-8" key={item?._id}>
                    <div className="flex gap-5 items-center">
                      <h4 className="text-md font-medium">Pranit Yawalkar</h4>
                      <ReactStars
                        count={5}
                        size={24}
                        value={item?.star}
                        edit={false}
                        activeColor="#ffd700"
                      />
                    </div>
                    <p className="text-sm text-gray-500">{item?.comment}</p>
                  </div>
                ))}
            </div>
          </section>
          <section className="w-full my-8">
            <h3 className="text-2xl font-bold">Our Popular Products</h3>
            <div className="flex flex-row gap-5 my-5">
              {popularProducts &&
                popularProducts?.map((product) => (
                  <div className="w-1/4" key={product?._id}>
                    <ProductCard
                      img={laptop}
                      brand={product?.brand}
                      name={product?.title}
                      price={`₹${product?.price}`}
                      grid={3}
                      handleClick={() => navigate("/product/:id")}
                    />
                  </div>
                ))}

              {/* <ProductCard
                img={laptop}
                brand="Asus"
                name="Asus Vivobook 32 GB RAM"
                price="₹50000"
                grid={3}
                handleClick={() => navigate("/product/:id")}
              />{" "}
              <ProductCard
                img={laptop}
                brand="Asus"
                name="Asus Vivobook 32 GB RAM"
                price="₹50000"
                grid={3}
                handleClick={() => navigate("/product/:id")}
              />{" "}
              <ProductCard
                img={laptop}
                brand="Asus"
                name="Asus Vivobook 32 GB RAM"
                price="₹50000"
                grid={3}
                handleClick={() => navigate("/product/:id")}
              /> */}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
