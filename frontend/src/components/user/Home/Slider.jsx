import React from "react";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  
  const images = [
    {
      src: "https://media.istockphoto.com/id/517188688/photo/mountain-landscape.jpg?s=1024x1024&w=0&k=20&c=z8_rWaI8x4zApNEEG9DnWlGXyDIXe-OmsAyQ5fGPVV8=",
      alt: "Mountain Landscape"
    },
    {
      src: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
      alt: "Ocean View"
    },
    {
      src: "https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg",
      alt: "Tiger in Forest"
    }
  ];

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000);
    
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
        <div className="relative aspect-[16/9] rounded-xl overflow-hidden shadow-lg">
          {images.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-800 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        {/* Enhanced Dots Navigation */}
        <div className="flex justify-center items-center mt-6 space-x-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative transition-all duration-300 hover:scale-110 ${
                index === currentSlide
                  ? 'w-8 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg'
                  : 'w-3 h-3 bg-gray-300 hover:bg-gray-400 rounded-full'
              }`}
            >
              {/* Active dot glow effect */}
              {index === currentSlide && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-sm opacity-50 scale-150"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;