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

  // 3-dot logic (keeping your original system)
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

  // Expo Slider Effect Calculations
  const getSlidePosition = (slideIndex) => {
    let position = slideIndex - currentSlide;

    // Handle wrapping for infinite loop
    if (position > 2) position -= slides.length;
    if (position < -2) position += slides.length;

    return position;
  };

  // Expo Effect: Parallax + Scale transformations
  const getSlideTransform = (slideIndex) => {
    const position = getSlidePosition(slideIndex);
    const dragInfluence = isDragging ? dragOffset * 0.5 : 0;

    // Base translation (horizontal movement)
    const baseTranslateX = position * 320 + dragInfluence;

    // Parallax effect - background moves slower than foreground
    const parallaxOffset = position * -50;

    // Scale effect based on position
    let scale = 1;
    let rotateY = 0;
    let translateZ = 0;

    if (position === 0) {
      // Active slide
      scale = 1;
      translateZ = 0;
    } else if (Math.abs(position) === 1) {
      // Adjacent slides
      scale = 0.85;
      rotateY = position * -15; // Slight rotation for depth
      translateZ = -100;
    } else {
      // Far slides
      scale = 0;
      rotateY = position * -25;
      translateZ = -200;
    }

    return {
      translateX: baseTranslateX,
      parallaxOffset,
      scale,
      rotateY,
      translateZ,
    };
  };

  // Get opacity for expo effect
  const getSlideOpacity = (slideIndex) => {
    const position = Math.abs(getSlidePosition(slideIndex));
    if (position === 0) return 1;
    if (position === 1) return 0.8;
    return 0.5;
  };

  // Render Expo Slider slide
  const renderExpoSlide = (slide, slideIndex) => {
    const position = getSlidePosition(slideIndex);
    const isActive = position === 0;
    const transform = getSlideTransform(slideIndex);
    const opacity = getSlideOpacity(slideIndex);

    return (
      <div
        key={slide.id}
        className="absolute w-80 h-96 rounded-3xl overflow-hidden"
        style={{
          transform: `translateX(${transform.translateX}px) translateZ(${transform.translateZ}px) scale(${transform.scale}) rotateY(${transform.rotateY}deg)`,
          opacity: opacity,
          zIndex: isActive ? 10 : 5 - Math.abs(position),
          left: "50%",
          marginLeft: "-160px",
          transition: isDragging
            ? "none"
            : "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {/* Background Image with Parallax */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            transform: `translateX(${transform.parallaxOffset}px) scale(1.1)`,
            transition: isDragging
              ? "none"
              : "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          }}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="relative bg-white">
      {/* Expo Slider Container */}
      <div className="relative w-full h-[440px] overflow-hidden">
        <div
          className="relative w-full h-full mt-6"
          style={{
            perspective: "1200px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          <div
            className="relative w-full h-full cursor-grab active:cursor-grabbing"
            style={{
              transformStyle: "preserve-3d",
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {slides.map((slide, index) => renderExpoSlide(slide, index))}
          </div>
        </div>

        {/* Side Gradient Overlays for depth */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-y-0 left-0 w-32"></div>
          <div className="absolute inset-y-0 right-0 w-32"></div>
        </div>
      </div>

      {/* 3-Dot Navigation System */}
      <div className="flex justify-center items-center space-x-2 -mt-6">
        {[0, 1, 2].map((dotIndex) => (
          <button
            key={dotIndex}
            onClick={() => goToSlide(dotNumbers[dotIndex] - 1)}
            className={`flex items-center justify-center transition-all duration-300 ${
              dotIndex === activeDotIndex
                ? "w-12 h-6 rounded-full bg-[#6678FF] text-white shadow-lg text-xs font-medium"
                : "w-3 h-3 rounded-full bg-indigo-200"
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
