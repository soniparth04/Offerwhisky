import React from "react";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const images = [
    {
      src: "https://thedrum-media.imgix.net/thedrum-prod/s3/share_a_coke.jpg?w=1020&ar=default&fit=crop&crop=faces&auto=format&q=100",
      alt: "Coca Cola Ad",
    },
    {
      src: "https://poweradspy.com/wp-content/uploads/2023/10/nike-ads-growth.webp",
      alt: "Nike Ad",
    },
    {
      src: "https://i.ytimg.com/vi/_Cf_Thff044/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAoVVWj_RUKPn5ntqrftWWgR6R3DA",
      alt: "Samsung Ad",
    },
    {
      src: "https://www.krishnajewellers.com/blog/wp-content/uploads/2021/11/gold-jewellery-video-call-shopping-at-krishna-jewellers.jpg",
      alt: "Krishna Jewellers Ad",
    },
    {
      src: "https://www.adgully.com/img/800/201712/heinz-tomato-ketchup_the-taste-that-grabs-you_pic-2.jpg",
      alt: "Heinz Ad",
    },
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative px-4 py-2">
      {/* Main Carousel Container */}
      <div className="relative max-w-4xl w-full mx-auto">
        {/* Image Container */}
        <div className="relative aspect-[3/2] rounded-xl overflow-hidden shadow-lg">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-800 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        {/* Enhanced Dots Navigation */}
        <div className="flex justify-center items-center mt-4 space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative transition-all duration-300 hover:scale-110 ${
                index === currentSlide
                  ? "w-8 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400 rounded-full"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
