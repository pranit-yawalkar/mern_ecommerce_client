import React, { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import Meta from "../components/Meta";
import InputWidget from "../widgets/InputWidget";
import {
  TfiLayoutGrid2Alt,
  TfiLayoutGrid3Alt,
  TfiLayoutGrid4Alt,
} from "react-icons/tfi";
import { BsGrid3X2GapFill } from "react-icons/bs";
import ProductCard from "../components/ProductCard";
import BreadCrumb from "../components/BreadCrumb";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";

const OurStore = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const navigate = useNavigate();
  const [grid, setGrid] = useState(4);
  const [brands, setBrands] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);

  const [tag, setTag] = useState(null);
  const [category, setCategory] = useState(null);
  const [brand, setBrand] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sort, setSort] = useState(null);

  useEffect(() => {
    getAllProducts();
  }, [sort, tag, brand, category, minPrice, maxPrice]);

  useEffect(() => {
    let brandArr = [];
    let categoryArr = [];
    let tagArr = [];
    for (let i = 0; i < products.length; i++) {
      const element = products[i];
      brandArr.push(element?.brand);
      categoryArr.push(element?.category);
      tagArr.push(...tags, ...element?.tag);
      tagArr.push(...tags, ...element?.tag);
    }
    setBrands([...new Set(brandArr)]);
    setCategories([...new Set(categoryArr)]);
    setTags([...new Set(tagArr)]);
  }, [products]);

  const getAllProducts = () => {
    dispatch(getProducts({ sort, tag, brand, category, minPrice, maxPrice }));
  };

  return (
    <>
      <Meta title="Our Store" />
      <BreadCrumb title="Our Store" />
      <div className="bg-gray-100 py-4">
        <div className="max-w-[1300px]  pb-10 md:pb-20 mx-auto flex flex-col-reverse md:flex-row gap-5">
          <div className="w-full md:w-1/4 md:flex flex-col">
            <div className="bg-white rounded-lg px-5 py-2 shadow-sm mb-3">
              <h3 className="my-3 text-md font-bold">Shop By Categories</h3>
              <ul>
                {categories &&
                  categories?.map((item, index) => (
                    <li
                      key={index}
                      className="text-sm font-light my-2 cursor-pointer"
                      onClick={() => setCategory(item)}
                    >
                      {item}
                    </li>
                  ))}
              </ul>
            </div>
            <div className="bg-white rounded-lg px-5 py-2 shadow-sm mb-3">
              <h3 className="mt-3 text-md font-bold">Filter By</h3>
              <div>
                <h5 className="text-sm my-4 font-medium">Price</h5>
                <div className="flex gap-3">
                  <InputWidget
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="From"
                    type="number"
                  />
                  <InputWidget
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="To"
                    type="number"
                  />
                </div>
              </div>
              <h3 className="text-sm my-4 font-medium">Product Brands</h3>
              <div className="my-3 flex flex-wrap gap-3">
                {brands &&
                  brands?.map((item, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-xs p-2 rounded-sm capitalize cursor-pointer"
                      onClick={() => setBrand(item)}
                    >
                      {item}
                    </span>
                  ))}
              </div>
              <h3 className="text-sm my-4 font-medium">Product Tags</h3>
              <div className="my-3 flex flex-wrap gap-3">
                {tags &&
                  tags?.map((item, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-xs p-2 rounded-sm capitalize cursor-pointer"
                      onClick={() => setTag(item)}
                    >
                      {item}
                    </span>
                  ))}
              </div>
              {/* <div>
                <h5 className="text-sm my-2 font-medium">Color</h5>
                <ul className="flex flex-wrap gap-3">
                  <li className="w-5 h-5 bg-red-500 rounded-full"></li>
                  <li className="w-5 h-5 bg-red-500 rounded-full"></li>
                  <li className="w-5 h-5 bg-red-500 rounded-full"></li>
                  <li className="w-5 h-5 bg-red-500 rounded-full"></li>
                  <li className="w-5 h-5 bg-red-500 rounded-full"></li>
                  <li className="w-5 h-5 bg-red-500 rounded-full"></li>
                  <li className="w-5 h-5 bg-red-500 rounded-full"></li>
                  <li className="w-5 h-5 bg-red-500 rounded-full"></li>
                  <li className="w-5 h-5 bg-red-500 rounded-full"></li>
                  <li className="w-5 h-5 bg-red-500 rounded-full"></li>
                  <li className="w-5 h-5 bg-red-500 rounded-full"></li>
                  <li className="w-5 h-5 bg-red-500 rounded-full"></li>
                  <li className="w-5 h-5 bg-red-500 rounded-full"></li>
                  <li className="w-5 h-5 bg-red-500 rounded-full"></li>
                  <li className="w-5 h-5 bg-red-500 rounded-full"></li>
                </ul>
              </div> */}
            </div>

            <div className="bg-white rounded-lg px-5 py-2 shadow-sm mb-3">
              <h3 className="mt-3 text-md font-bold">Random Products</h3>
              <div className="flex gap-3 my-2">
                <img src="images/products/laptop.jpg" alt="laptop" />
                <div className="mt-3">
                  <h3 className="text-sm font-bold">Asus Vivobook 32 GB RAM</h3>
                  <ReactStars
                    count={5}
                    size={24}
                    value={3}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <span className="text-sm font-bold">₹39990</span>
                </div>
              </div>
              <div className="flex gap-3 my-2">
                <img src="images/products/laptop.jpg" alt="laptop" />
                <div className="mt-3">
                  <h3 className="text-sm font-bold">Asus Vivobook 32 GB RAM</h3>
                  <ReactStars
                    count={5}
                    size={24}
                    value={3}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <span className="text-sm font-bold">₹39990</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-3/4">
            <div className="bg-white rounded-lg flex justify-between px-5 py-2 shadow-sm mb-3">
              <div className="flex items-center gap-2 my-3">
                <label htmlFor="sort">Sort By: </label>
                <select
                  className="p-2 border-[1px] rounded-md border-gray-300"
                  name="sort"
                  id="sort"
                  defaultValue="manual"
                  onChange={(e) => setSort(e.target.value)}
                >
                  <option value="title">Alphabetically A-Z</option>
                  <option value="-title">Alphabetically Z-A</option>
                  <option value="price">Price low to high</option>
                  <option value="-price">Price high to low</option>
                  <option value="createdAt">Date old to new</option>
                  <option value="-createdAt">Date new to old</option>
                </select>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-gray-500">21 Products</span>
                <div className="hidden md:flex gap-3">
                  <button
                    onClick={() => setGrid(4)}
                    className={`p-2 rounded-lg cursor-pointer ${
                      grid === 4 ? "bg-color-1 text-white" : "bg-gray-200 "
                    }`}
                  >
                    <TfiLayoutGrid4Alt />
                  </button>
                  <button
                    onClick={() => setGrid(3)}
                    className={`p-2 rounded-lg cursor-pointer ${
                      grid === 3 ? "bg-color-1 text-white" : "bg-gray-200 "
                    }`}
                  >
                    <TfiLayoutGrid3Alt />
                  </button>
                  <button
                    onClick={() => setGrid(2)}
                    className={`p-2 rounded-lg cursor-pointer ${
                      grid === 2 ? "bg-color-1 text-white" : "bg-gray-200 "
                    }`}
                  >
                    <TfiLayoutGrid2Alt />
                  </button>
                  <button
                    onClick={() => setGrid(1)}
                    className={`p-2 rounded-lg cursor-pointer ${
                      grid === 1 ? "bg-color-1 text-white" : "bg-gray-200 "
                    }`}
                  >
                    <BsGrid3X2GapFill />
                  </button>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap">
              {products.map((product, index) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  img={product.images[0]?.url ?? "images/products/laptop.jpg"}
                  brand={product?.brand}
                  name={product?.title}
                  description={product?.description}
                  rating={parseFloat(product?.totalRating)}
                  price={`₹ ${product?.price}`}
                  grid={grid}
                  handleClick={() => navigate("/product/:id")}
                />
              ))}
              {/* <ProductCard
                img="images/products/laptop.jpg"
                brand="Asus"
                name="Asus Vivobook 32 GB RAM"
                price="₹50000"
                grid={grid}
                handleClick={() => navigate("/product/:id")}
              />
              <ProductCard
                img="images/products/laptop.jpg"
                brand="Asus"
                name="Asus Vivobook 32 GB RAM"
                price="₹50000"
                grid={grid}
                handleClick={() => navigate("/product/:id")}
              /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurStore;
