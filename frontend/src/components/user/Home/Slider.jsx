import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Slider.css";

const CarouselDefault = () => {
  // Shopping-themed card images
  const cards = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      alt: "Fashion sale promotion with 50% discount"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      alt: "Summer collection special offer"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1561715276-a2d087060f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      alt: "Shopping bag with today's deals"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1580828343064-fde4fc206bc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      alt: "Shopping mall weekend sale"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      alt: "Gift card promotion"
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    centerMode: false,
    centerPadding: '0',
    dotsClass: "slick-dots",
    appendDots: dots => (
      <div style={{ bottom: "-15px" }}>
        <ul>{dots}</ul>
      </div>
    ),
  };

  return (
    <div className="relative px-4 py-0">
      <div className="card-slider-container">
        <Slider {...settings}>
          {cards.map((card) => (
            <div key={card.id} className="px-1">
              <div className="card-slide relative rounded-xl overflow-hidden shadow-md">
                <img
                  src={card.image}
                  alt={card.alt}
                  className="w-full aspect-[16/9] object-cover"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CarouselDefault;
