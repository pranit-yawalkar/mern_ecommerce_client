import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function PrevArrow(props) {
  const { onClick } = props;
  return (
    <button
      className="absolute top-1/2 left-0 transform -translate-y-1/2 z-10"
      onClick={onClick}
    >
      <svg
        className="w-6 h-6 fill-current text-gray-700 hover:text-gray-900"
        viewBox="0 0 24 24"
      >
        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"></path>
      </svg>
    </button>
  );
}

function NextArrow(props) {
  const { onClick } = props;
  return (
    <button
      className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10"
      onClick={onClick}
    >
      <svg
        className="w-6 h-6 fill-current text-gray-700 hover:text-gray-900"
        viewBox="0 0 24 24"
      >
        <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12l-4.58 4.59z"></path>
      </svg>
    </button>
  );
}

const ImageSlider = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    cssEase: "linear",
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    // <div className="">

    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <img
            src={image.image}
            alt={image.alt}
            className="w-full md:h-[300px] object-cover"
          />
        </div>
      ))}
    </Slider>

    // </div>
  );
};

export default ImageSlider;
