import React from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import { MdClose } from "react-icons/md";
import Color from "../components/Color";

const CompareProducts = () => {
  return (
    <>
      <Meta title="Compare Products" />
      <BreadCrumb title="Compare Products" />
      <div className="bg-gray-100 py-4">
        <div className="max-w-[1300px]  pb-10 md:pb-20 mx-auto flex flex-col-reverse md:flex-row gap-5">
          <div className="w-full md:w-1/4 md:flex flex-col relative bg-white rounded-lg px-5 py-4 my-2 shadow-sm mb-3">
            <div className="absolute top-3 right-3 cursor-pointer">
              <MdClose />
            </div>
            <img
              className="w-full h-52 object-cover"
              src="images/products/laptop.jpg"
              alt="laptop"
            />
            <div className="flex flex-col gap-3 mt-5">
              <h5 className="text-md font-bold">Asus Vivobook 15 32 GB RAM</h5>
              <h6 className="text-lg font-bold text-color-1">₹50000</h6>
              <div className="flex justify-between">
                <span className="text-lg">Brand: </span>
                <span className="text-lg">Asus</span>
              </div>
              <div className="flex justify-between">
                <span className="text-lg">Type: </span>
                <span className="text-lg">Laptop</span>
              </div>
              <div className="flex justify-between">
                <span className="text-lg">Availability: </span>
                <span className="text-lg">In Stock</span>
              </div>
              <div className="flex justify-between">
                <span className="text-lg">Color: </span>
                <Color />
              </div>
              <div className="flex justify-between">
                <span className="text-lg">Size: </span>
                <div className="flex gap-2">
                  <span>S</span>
                  <span>M</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/4 md:flex flex-col relative bg-white rounded-lg px-5 py-4 my-2 shadow-sm mb-3">
            <div className="absolute top-3 right-3 cursor-pointer">
              <MdClose />
            </div>
            <img
              className="w-full h-52 object-cover"
              src="images/products/laptop.jpg"
              alt="laptop"
            />
            <div className="flex flex-col gap-3 mt-5">
              <h5 className="text-md font-bold">Asus Vivobook 15 32 GB RAM</h5>
              <h6 className="text-lg font-bold text-color-1">₹50000</h6>
              <div className="flex justify-between">
                <span className="text-lg">Brand: </span>
                <span className="text-lg">Asus</span>
              </div>
              <div className="flex justify-between">
                <span className="text-lg">Type: </span>
                <span className="text-lg">Laptop</span>
              </div>
              <div className="flex justify-between">
                <span className="text-lg">Availability: </span>
                <span className="text-lg">In Stock</span>
              </div>
              <div className="flex justify-between">
                <span className="text-lg">Color: </span>
                <Color />
              </div>
              <div className="flex justify-between">
                <span className="text-lg">Size: </span>
                <div className="flex gap-2">
                  <span>S</span>
                  <span>M</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompareProducts;
