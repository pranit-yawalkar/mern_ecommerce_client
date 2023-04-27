import React, { useEffect } from "react";
import BlogCard from "../components/BlogCard";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import blogImg from "../assets/images/blogs/blog-1.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogs } from "../features/blog/blogSlice";

const Blog = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state?.blog?.blogs);

  useEffect(() => {
    getBlogs();
  }, []);

  const getBlogs = () => {
    dispatch(getAllBlogs());
  };
  return (
    <>
      <Meta title="Blogs" />
      <BreadCrumb title="Blogs" />
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
          <div className="w-full flex flex-col md:flex-row md:flex-wrap  md:w-3/4">
            {blogs &&
              blogs?.map((blog) => (
                <div key={blog?._id} className="w-full md:w-1/2 p-2">
                  <BlogCard
                    id={blog._id}
                    img={blog?.images[0]?.url ?? blogImg}
                    date={new Date(blog?.createdAt).toLocaleString("en-IN", {
                      timeStyle: "short",
                      dateStyle: "long",
                    })}
                    title={blog?.title}
                    description={blog?.description}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
