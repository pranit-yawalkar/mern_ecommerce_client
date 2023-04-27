import React from "react";
import { useNavigate } from "react-router-dom";
import ButtonWidget from "../widgets/ButtonWidget";

const BlogCard = ({ id, img, date, title, description }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-lg shadow-md">
      <img
        className="rounded-t-lg w-full h-72 object-cover"
        src={img}
        alt={`${title}`}
      />
      <div className="px-3 py-2">
        <p className="text-xs my-2 text-gray-500">{date}</p>
        <p className="font-bold mb-2">{title}</p>
        <p className="text-justify text-sm text-gray-500">{description}</p>
        <div className="my-4">
          <ButtonWidget
            color="bg-color-5"
            textcolor="white"
            text="Read more"
            size="xs"
            handleClick={() => navigate(`/blog/${id}`)}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
