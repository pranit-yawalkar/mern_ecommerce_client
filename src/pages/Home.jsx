import React, { useEffect } from "react";
import ImageSlider from "../widgets/ImageSlider";
import { CarouselData } from "../utils/corousel";
import Marquee from "react-fast-marquee";
import BlogCard from "../components/BlogCard";
import ProductCard from "../components/ProductCard";
import SpecialProductCard from "../components/SpecialProductCard";
import FamousCard from "../components/FamousCard";
import Meta from "../components/Meta";
import { homeImages, services } from "../utils/data";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blog/blogSlice";
import blogImg from "../assets/images/blogs/blog-1.jpg";
import { getProducts } from "../features/product/productSlice";

const Home = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const blogs = useSelector((state) => state?.blog?.blogs);
  const productState = useSelector((state) => state?.product?.products);
  console.log(productState);

  useEffect(() => {
    getBlogs();
    getAllProducts();
  }, []);

  const getBlogs = () => {
    dispatch(getAllBlogs());
  };

  const getAllProducts = () => {
    dispatch(getProducts());
  };
  return (
    <>
      <Meta title="Home - ShoppingSpot" />
      <section className="max-w-[1200px] mb-10 md:mb-20 mx-auto">
        <div className="flex flex-col gap-5 justify-center items-center lg:flex-row">
          <div className="w-full lg:w-4/6 md:my-5">
            <ImageSlider images={CarouselData} />
          </div>
          <div className="w-full lg:w-2/6 my-5 gap-8 md:gap-3 flex flex-wrap justify-center lg:justify-start">
            {homeImages.map((item, index) => (
              <img
                key={index}
                src={item.img}
                alt={item.alt}
                className="w-32 h-22 md:w-44 md:h-36 object-cover"
              />
            ))}
          </div>
        </div>
      </section>
      <section className="bg-gray-200 pb-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex flex-wrap w-3/4 mx-auto md:w-full md:justify-around">
            {services.map((service, index) => (
              <div key={index} className="flex gap-5 my-8">
                {service.icon}
                <div className="flex flex-col">
                  <span className="font-bold">{service.title}</span>
                  <span className="text-sm">{service.tagline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-[1200px] my-5 mx-auto bg-white rounded-md shadow-lg flex flex-wrap justify-center">
          <div className="w-2/4 flex justify-between items-center gap-3 px-5 py-8 md:w-1/4">
            <div className="flex flex-col">
              <span className="font-bold">PC and Laptops</span>
              <span className="text-sm">8 brands</span>
            </div>
            <div>
              <img
                className="w-20"
                src="images/categories/laptop.jpg"
                alt="laptop"
              />
            </div>
          </div>
          <div className="w-2/4 flex justify-between items-center gap-3 px-5 py-8 md:w-1/4">
            <div className="flex flex-col">
              <span className="font-bold">Mobiles and Tablets</span>
              <span className="text-sm">15 brands</span>
            </div>
            <div>
              <img
                className="h-20 object-cover"
                src="images/categories/mobiles.jpg"
                alt="laptop"
              />
            </div>
          </div>
          <div className="w-2/4 flex justify-between items-center gap-3 px-5 py-8 md:w-1/4">
            <div className="flex flex-col">
              <span className="font-bold">Cameras</span>
              <span className="text-sm">8 brands</span>
            </div>
            <div>
              <img
                className="w-20"
                src="images/categories/camera.jpg"
                alt="laptop"
              />
            </div>
          </div>
          <div className="w-2/4 flex justify-between items-center gap-3 px-5 py-8 md:w-1/4">
            <div className="flex flex-col">
              <span className="font-bold">Smart Watches</span>
              <span className="text-sm">12 brands</span>
            </div>
            <div>
              <img
                className="h-20"
                src="images/categories/smart_watch.jpg"
                alt="laptop"
              />
            </div>
          </div>
          <div className="w-2/4 flex justify-between items-center gap-3 px-5 py-8 md:w-1/4">
            <div className="flex flex-col">
              <span className="font-bold">Earphones</span>
              <span className="text-sm">5 brands</span>
            </div>
            <div>
              <img
                className="w-20"
                src="images/categories/buds.jpg"
                alt="laptop"
              />
            </div>
          </div>
          <div className="w-2/4 flex justify-between items-center gap-3 px-5 py-8 md:w-1/4">
            <div className="flex flex-col">
              <span className="font-bold">Fashion</span>
              <span className="text-sm">11 brands</span>
            </div>
            <div>
              <img
                className="w-20 object-cover"
                src="images/categories/fashion.jpg"
                alt="laptop"
              />
            </div>
          </div>
          <div className="w-2/4 flex justify-between items-center gap-3 px-5 py-8 md:w-1/4">
            <div className="flex flex-col">
              <span className="font-bold">Power Tools</span>
              <span className="text-sm">6 brands</span>
            </div>
            <div>
              <img
                className="w-20"
                src="images/categories/tools.jpg"
                alt="laptop"
              />
            </div>
          </div>
          <div className="w-2/4 flex justify-between items-center gap-3 px-5 py-8 md:w-1/4">
            <div className="flex flex-col">
              <span className="font-bold">Home Appliances</span>
              <span className="text-sm">9 brands</span>
            </div>
            <div>
              <img
                className="h-20"
                src="images/categories/home_appliances.jpg"
                alt="laptop"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-200 py-10 ">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-center text-xl md:text-3xl font-bold">
            Featured Collection
          </h2>
          <div className="flex flex-col gap-5 my-8 md:flex-row">
            {productState &&
              productState?.map((product) => {
                if (product.tag.includes("featured")) {
                  return (
                    <div key={product?._id} className="w-full md:w-1/5">
                      <ProductCard
                        id={product?._id}
                        img={
                          product?.images[0]?.url ||
                          "images/products/laptop.jpg"
                        }
                        brand={product?.brand}
                        name={product?.title}
                        price={product?.price}
                        color={product?.color}
                        handleClick={() => navigate(`product/${product?._id}`)}
                      />
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </section>
      <section className="bg-gray-200 py-10 ">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-center text-xl md:text-3xl font-bold">
            Special Products
          </h2>
          <div className="flex flex-col gap-3 justify-between my-8 md:flex-row">
            {productState &&
              productState?.map((product) => {
                if (product.tag.includes("special")) {
                  return (
                    <SpecialProductCard
                      key={product._id}
                      id={product._id}
                      img={
                        product?.images[0]?.url || "images/products/laptop.jpg"
                      }
                      brand={product?.brand}
                      name={product?.title}
                      price={product?.price}
                      sold={product?.sold ?? 0}
                      rating={product?.totalRating}
                      quantity={product?.quantity}
                    />
                  );
                }
              })}
          </div>
        </div>
      </section>
      <section className="bg-gray-200 py-10 ">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-center text-xl md:text-3xl font-bold">
            Famous Products
          </h2>
          <div className="flex flex-col justify-between gap-5 my-8 md:flex-row">
            <FamousCard
              color="bg-black"
              textcolor="white"
              img="images/brands/brand-04.png"
              text1="High Resolution"
              text2="Best Laptop in 2023"
              text3="From ₹39990 or ₹1000/month"
            />
            <FamousCard
              color="bg-white"
              img="images/products/laptop.jpg"
              text1="High Resolution"
              text2="Best Laptop in 2023"
              text3="From ₹39990 or ₹1000/month"
            />
            <FamousCard
              color="bg-white"
              img="images/products/laptop.jpg"
              text1="High Resolution"
              text2="Best Laptop in 2023"
              text3="From ₹39990 or ₹1000/month"
            />
            <FamousCard
              color="bg-white"
              img="images/products/laptop.jpg"
              text1="High Resolution"
              text2="Best Laptop in 2023"
              text3="From ₹39990 or ₹1000/month"
            />
          </div>
        </div>
      </section>
      <section className="bg-gray-200 py-10 ">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-center text-xl md:text-3xl font-bold">
            Popular Products
          </h2>
          <div className="flex flex-col justify-between gap-5 my-8 md:flex-row">
            {productState &&
              productState?.map((product) => {
                if (product.tag.includes("popular")) {
                  return (
                    <div className="w-full md:w-1/4">
                      <ProductCard
                        id={product._id}
                        img={
                          product?.images[0]?.url ||
                          "images/products/laptop.jpg"
                        }
                        brand={product?.brand}
                        name={product?.title}
                        price={product?.price}
                        color={product?.color}
                      />
                    </div>
                  );
                }
              })}
          </div>
        </div>
      </section>
      <section className="max-w-[1200px] my-10 mx-auto">
        <h2 className="text-center text-xl md:text-3xl font-bold">
          Top Brands
        </h2>
        <Marquee loop="infinite" className="flex my-10">
          <div className="w-1/4 mx-5 md:w-1/3 md:mx-16">
            <img src="images/brands/brand-01.png" alt="brand1" />
          </div>
          <div className="w-1/4 mx-5 md:w-1/3 md:mx-16">
            <img src="images/brands/brand-02.png" alt="brand2" />
          </div>
          <div className="w-1/4 mx-5 md:w-1/3 md:mx-16">
            <img src="images/brands/brand-03.png" alt="brand3" />
          </div>
          <div className="w-1/4 mx-5 md:w-1/3 md:mx-16">
            <img src="images/brands/brand-04.png" alt="brand4" />
          </div>
          <div className="w-1/4 mx-5 md:w-1/3 md:mx-16">
            <img src="images/brands/brand-05.png" alt="brand5" />
          </div>
        </Marquee>
      </section>
      <section className="bg-gray-200 py-10 ">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-center text-xl md:text-3xl font-bold">
            Our Latest Blogs
          </h2>
          <div className="flex flex-col gap-5 my-8 md:flex-row">
            {blogs &&
              blogs?.map((blog) => (
                <BlogCard
                  key={blog._id}
                  id={blog._id}
                  img={blog?.images[0]?.url ?? blogImg}
                  date={new Date(blog?.createdAt).toLocaleString("en-IN", {
                    timeStyle: "short",
                    dateStyle: "long",
                  })}
                  title={blog?.title}
                  description={blog?.description}
                />
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
