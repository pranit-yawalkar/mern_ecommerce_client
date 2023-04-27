import React, { useEffect } from "react";
import Meta from "../components/Meta";
import BreadCrumb from "../components/BreadCrumb";
import blogImg from "../assets/images/blogs/blog-1.jpg";
import { Link, useLocation, useParams } from "react-router-dom";
import { BiLeftArrowAlt } from "react-icons/bi";
import { getABlog } from "../features/blog/blogSlice";
import { useDispatch, useSelector } from "react-redux";

const SingleBlog = () => {
  const dispatch = useDispatch();
  const blogState = useSelector((state) => state?.blog?.singleBlog);
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    getBlog();
  }, []);

  const getBlog = () => {
    dispatch(getABlog(id));
  };
  return (
    <>
      <Meta title={blogState?.title} />
      <BreadCrumb title={blogState?.title} />
      <div className="bg-gray-100 py-4">
        <div className="max-w-[1300px]  pb-10 md:pb-20 mx-auto flex flex-col-reverse md:flex-row gap-5">
          <div className="w-full md:w-1/4 md:flex flex-col">
            <div className="bg-white rounded-lg px-5 py-2 my-2 shadow-sm mb-3">
              <h3 className="my-3 text-md font-bold">Find By Categories</h3>
              <ul>
                <li className="text-sm font-light my-2 cursor-pointer">
                  Laptops
                </li>
                <li className="text-sm font-light my-2 cursor-pointer">TV</li>
                <li className="text-sm font-light my-2 cursor-pointer">
                  Camera
                </li>
                <li className="text-sm font-light my-2 cursor-pointer">
                  Watch
                </li>
              </ul>
            </div>
          </div>
          <div className="w-full flex flex-col md:w-3/4 bg-white rounded-lg px-5 py-5 my-2 shadow-sm mb-3">
            <Link
              to="/blog"
              className="flex gap-3 items-center hover:text-color-1"
            >
              <BiLeftArrowAlt />
              <span>Go to new blogs</span>
            </Link>
            <div className="flex flex-col gap-5">
              <h3 className="text-2xl my-3 font-medium">{blogState?.title}</h3>
              <img
                className="h-96 w-full object-cover"
                src={blogState?.images[0]?.url ?? blogImg}
                alt="blog"
              />
              <p>{blogState?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
