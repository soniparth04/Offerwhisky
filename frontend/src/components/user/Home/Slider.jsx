import React from "react";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [translateX, setTranslateX] = React.useState(0);

  const slides = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1526779259212-939e64788e3c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZnJlZSUyMGltYWdlc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: 2,
      image:
        "https://images.pexels.com/photos/1054655/pexels-photo-1054655.jpeg?cs=srgb&dl=pexels-hsapir-1054655.jpg&fm=jpg",
    },
    {
      id: 3,
      image:
        "https://thumbs.dreamstime.com/b/beautiful-view-nature-mountains-near-konigssee-lake-bavaria-germany-blue-sky-clouds-97444419.jpg",
    },
    {
      id: 4,
      image:
        "https://st2.depositphotos.com/1591133/8812/i/450/depositphotos_88120646-stock-photo-idyllic-summer-landscape-with-clear.jpg",
    },
    {
      id: 5,
      image:
        "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-fall-waterfall-free-image.jpeg?w=600&quality=80",
    },
  ];

  // Auto-rotate functionality
  React.useEffect(() => {
    if (isDragging) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [slides.length, isDragging]);

  // Touch/Mouse handlers
  const handleStart = (clientX) => {
    setIsDragging(true);
    setStartX(clientX);
  };

  const handleMove = (clientX) => {
    if (!isDragging) return;
    const diff = clientX - startX;
    setTranslateX(diff);
  };

  const handleEnd = () => {
    if (!isDragging) return;

    const threshold = 100;
    if (Math.abs(translateX) > threshold) {
      if (translateX > 0) {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      } else {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }

    setIsDragging(false);
    setTranslateX(0);
  };

  // Mouse events
  const handleMouseDown = (e) => {
    e.preventDefault();
    handleStart(e.clientX);
  };
  const handleMouseMove = (e) => handleMove(e.clientX);
  const handleMouseUp = () => handleEnd();

  // Touch events
  const handleTouchStart = (e) => handleStart(e.touches[0].clientX);
  const handleTouchMove = (e) => {
    e.preventDefault(); // Prevent scrolling
    handleMove(e.touches[0].clientX);
  };
  const handleTouchEnd = () => handleEnd();

  // 3-dot logic
  const getDotNumbers = () => {
    const total = slides.length;

    if (currentSlide === 0) {
      return [1, 2, 3];
    } else if (currentSlide === total - 1) {
      return [total - 2, total - 1, total];
    } else {
      return [currentSlide, currentSlide + 1, currentSlide + 2];
    }
  };

  const getActiveDotIndex = () => {
    if (currentSlide === 0) return 0;
    if (currentSlide === slides.length - 1) return 2;
    return 1;
  };

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  const dotNumbers = getDotNumbers();
  const activeDotIndex = getActiveDotIndex();

  // Helper function to render card content
  const renderCard = (slide, isMain = false) => {
    const cardClasses = isMain
      ? "w-80 h-96"
      : "w-56 h-72 opacity-50";

    return (
      <div className={`${cardClasses} rounded-2xl overflow-hidden relative`}>
        <div className="">
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full rounded-t-2xl absolute inset-0 object-cover"
            draggable={false}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="relative">
      {/* Card Container with Side Previews */}
      <div
        className="relative w-full h-96 cursor-grab active:cursor-grabbing overflow-hidden"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="flex items-center justify-center h-full gap-2 transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(${translateX}px)`,
            transition: isDragging ? 'none' : 'transform 0.3s ease-out'
          }}
        >
          {/* Left preview */}
          <div className="transform transition-all duration-1000 ease-in-out scale-110 flex-shrink-0">
            {renderCard(
              slides[(currentSlide - 1 + slides.length) % slides.length],
              false
            )}
          </div>

          {/* Main slide */}
          <div className="scale-90">
            {renderCard(slides[currentSlide], true)}
          </div>

          {/* Right preview */}
          <div className="transform transition-all duration-500 ease-in-out scale-110 flex-shrink-0">
            {renderCard(slides[(currentSlide + 1) % slides.length], false)}
          </div>
        </div>
      </div>

      {/* 3-Dot Navigation */}
      <div className="flex justify-center items-center -mt-4 mb-4 space-x-2">
        {[0, 1, 2].map((dotIndex) => (
          <button
            key={dotIndex}
            onClick={() => goToSlide(dotNumbers[dotIndex] - 1)}
            className={`flex items-center justify-center transition-all duration-300 ${
              dotIndex === activeDotIndex
                ? "w-10 h-5 rounded-full bg-violet-600 text-white shadow-md text-xs font-medium"
                : "w-3 h-3 rounded-full bg-gray-300 hover:bg-gray-400"
            }`}
          >
            {dotIndex === activeDotIndex
              ? `${currentSlide + 1}/${slides.length}`
              : ""}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Slider;