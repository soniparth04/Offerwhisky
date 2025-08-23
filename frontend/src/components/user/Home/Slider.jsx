import React from "react";

const Slider = () => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [startX, setStartX] = React.useState(0);
  const [dragOffset, setDragOffset] = React.useState(0);

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
    setDragOffset(0);
  };

  const handleMove = (clientX) => {
    if (!isDragging) return;
    const diff = clientX - startX;
    setDragOffset(diff);
  };

  const handleEnd = () => {
    if (!isDragging) return;

    const threshold = 80;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      } else {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }

    setIsDragging(false);
    setDragOffset(0);
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
    e.preventDefault();
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

  // Calculate positions for smooth swiping feel
  const getSlidePosition = (slideIndex) => {
    let position = slideIndex - currentSlide;
    
    // Handle wrapping
    if (position > 2) position -= slides.length;
    if (position < -2) position += slides.length;
    
    return position;
  };

  // Get transform for each slide based on drag offset
  const getSlideTransform = (slideIndex) => {
    const basePosition = getSlidePosition(slideIndex);
    const dragInfluence = isDragging ? dragOffset * 0.7 : 0;
    return basePosition * 300 + dragInfluence;
  };

  // Get scale for each slide
  const getSlideScale = (slideIndex) => {
    const position = Math.abs(getSlidePosition(slideIndex));
    if (position === 0) return 0.9; // Main slide
    if (position === 1) return 1.1; // Side previews
    return 0.8; // Far slides
  };

  // Get opacity for each slide
  const getSlideOpacity = (slideIndex) => {
    const position = Math.abs(getSlidePosition(slideIndex));
    if (position === 0) return 1; // Main slide
    if (position === 1) return 0.5; // Side previews
    return 0; // Far slides
  };

  // Helper function to render card content
  const renderCard = (slide, slideIndex) => {
    const position = getSlidePosition(slideIndex);
    const isMain = position === 0;
    const cardClasses = isMain ? "w-80 h-96" : "w-56 h-72";
    
    const transform = getSlideTransform(slideIndex);
    const scale = getSlideScale(slideIndex);
    const opacity = getSlideOpacity(slideIndex);

    return (
      <div 
        key={slide.id}
        className={`${cardClasses} rounded-2xl overflow-hidden absolute flex-shrink-0 transition-all duration-300 ease-out`}
        style={{
          transform: `translateX(${transform}px) scale(${scale})`,
          opacity: opacity,
          zIndex: isMain ? 10 : 5,
          left: '50%',
          marginLeft: isMain ? '-160px' : '-112px',
          transition: isDragging ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out',
        }}
      >
        <img
          src={slide.image}
          alt={slide.title}
          className="w-full h-full rounded-2xl object-cover"
          draggable={false}
        />
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
        {slides.map((slide, index) => renderCard(slide, index))}
      </div>

      {/* 3-Dot Navigation */}
      <div className="flex justify-center items-center -mt-4 mb-4 space-x-2">
        {[0, 1, 2].map((dotIndex) => (
          <button
            key={dotIndex}
            onClick={() => goToSlide(dotNumbers[dotIndex] - 1)}
            className={`flex items-center justify-center transition-all duration-300 ${
              dotIndex === activeDotIndex
                ? "w-10 h-5 rounded-full bg-[#6678FF] text-white shadow-md text-xs"
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