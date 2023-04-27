import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLocationArrow,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import InputWidget from "../widgets/InputWidget";

const Footer = () => {
  return (
    <div>
      <footer className="py-8 px-8 bg-color-1  flex flex-col items-center md:flex-row gap-5 justify-around">
        <div className="flex gap-3 text-white items-center">
          <FaLocationArrow />
          <h3 className="text-xl">Sign up for Newsletters</h3>
        </div>
        <div className="flex w-full mx-5 md:w-1/3">
          <div className="w-full">
            <InputWidget type="text" placeholder="Enter your email" />
          </div>
          <button className="bg-color-6 text-white -ml-10 px-3">
            Subscribe
          </button>
        </div>
      </footer>
      <footer className="py-3 bg-color-1 text-white">
        <div className="flex flex-col mx-8 justify-around md:flex-row">
          <div className="flex flex-col">
            <h2 className="text-lg font-bold my-3">Contact Us</h2>
            <address className="my-1 not-italic">
              ShoppingSpot, Marine drive road, <br />
              Mumbai - 411111
            </address>
            <a href="tel:+91 9574833758" className="my-1">
              +91 9574833758
            </a>
            <a href="mailto:store@shoppingspot.com" className="my-1">
              store@shoppingspot.com
            </a>
            <div className="flex my-3 gap-5">
              <Link className="my-1" to={"/"}>
                <FaInstagram size={22} />
              </Link>
              <Link className="my-1" to={"/"}>
                <FaWhatsapp size={22} />
              </Link>
              <Link className="my-1" to={"/"}>
                <FaFacebook size={22} />
              </Link>
              <Link className="my-1" to={"/"}>
                <FaTwitter size={22} />
              </Link>
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-bold my-3">Categories</h2>
            <Link className="my-1" to={"/"}>
              Accessories
            </Link>
            <Link className="my-1" to={"/"}>
              Laptops
            </Link>
            <Link className="my-1" to={"/"}>
              Laptops
            </Link>
            <Link className="my-1" to={"/"}>
              Headphones
            </Link>
            <Link className="my-1" to={"/"}>
              Smart Watches
            </Link>
          </div>

          <div className="flex flex-col">
            <h2 className="text-lg font-bold my-3">Quick Links</h2>
            <Link className="my-1" to={"/"}>
              About Us
            </Link>
            <Link className="my-1" to={"/"}>
              FAQ
            </Link>
            <Link className="my-1" to={"/"}>
              Contact Us
            </Link>
            <Link className="my-1" to={"/"}>
              Our Store
            </Link>
          </div>
          <div className="flex flex-col">
            <h2 className="text-lg font-bold my-3">Information</h2>
            <Link className="my-1" to={"/privacy-policy"}>
              Privacy Policy
            </Link>
            <Link className="my-1" to={"/refund-policy"}>
              Refund Policy
            </Link>
            <Link className="my-1" to={"/shipping-policy"}>
              Shipping Policy
            </Link>
            <Link className="my-1" to={"/terms-conditions"}>
              Terms and Conditions
            </Link>
            <Link className="my-1" to={"/blog"}>
              Blogs
            </Link>
          </div>
        </div>
      </footer>
      <footer className="py-5 bg-color-1 text-white">
        <div className="text-center">
          Copyright &copy; {new Date().getFullYear()}. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Footer;
