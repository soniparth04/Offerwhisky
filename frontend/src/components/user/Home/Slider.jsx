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
        "https://images.unsplash.com/photo-1526779259212-939e64788e3c?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0",
    },
    {
      id: 2,
      image:
        "https://images.pexels.com/photos/1054655/pexels-photo-1054655.jpeg?cs=srgb&fm=jpg",
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

    const threshold = window.innerWidth < 768 ? 50 : 80;
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

  // 3-dot navigation logic
  const getDotNumbers = () => {
    const total = slides.length;
    if (currentSlide === 0) return [1, 2, 3];
    if (currentSlide === total - 1) return [total - 2, total - 1, total];
    return [currentSlide, currentSlide + 1, currentSlide + 2];
  };

  const getActiveDotIndex = () => {
    if (currentSlide === 0) return 0;
    if (currentSlide === slides.length - 1) return 2;
    return 1;
  };

  const goToSlide = (slideIndex) => setCurrentSlide(slideIndex);

  const dotNumbers = getDotNumbers();
  const activeDotIndex = getActiveDotIndex();

  // ✅ Fixed Main Card (305.45 × 407.61) + More Spacing Between Cards
  const getResponsiveDimensions = () => {
    const vw = window.innerWidth;

    const baseMainWidth = 305.45;
    const baseMainHeight = 407.61;

    // Responsive scaling for very small screens
    if (vw < 360) {
      const scale = vw / 360;
      return {
        slideWidth: baseMainWidth * scale,
        slideHeight: baseMainHeight * scale,
        slideSpacing: baseMainWidth * scale * 1.0, // 🔥 More spacing
        parallaxOffset: -20,
      };
    }

    // Small mobile (360px - 640px)
    if (vw < 640) {
      return {
        slideWidth: baseMainWidth * 0.85, // 259.63px
        slideHeight: baseMainHeight * 0.85, // 346.47px
        slideSpacing: baseMainWidth * 0.87, // 🔥 275px spacing (more gap)
        parallaxOffset: -25,
      };
    }

    // Tablet (640px - 1024px)
    if (vw < 1024) {
      return {
        slideWidth: baseMainWidth, // 305.45px
        slideHeight: baseMainHeight, // 407.61px
        slideSpacing: baseMainWidth * 1.05, // 🔥 321px spacing (more gap)
        parallaxOffset: -30,
      };
    }

    // Desktop (1024px - 1440px)
    if (vw < 1440) {
      return {
        slideWidth: baseMainWidth,
        slideHeight: baseMainHeight,
        slideSpacing: baseMainWidth * 1.1, // 🔥 336px spacing (good gap)
        parallaxOffset: -35,
      };
    }

    // Large Desktop (1440px+)
    return {
      slideWidth: baseMainWidth,
      slideHeight: baseMainHeight,
      slideSpacing: baseMainWidth * 1.15, // 🔥 351px spacing (nice wide gap)
      parallaxOffset: -40,
    };
  };

  const getSlidePosition = (slideIndex) => {
    let position = slideIndex - currentSlide;
    if (position > 2) position -= slides.length;
    if (position < -2) position += slides.length;
    return position;
  };

  // ✅ Better side card scaling and positioning
  const getSlideTransform = (slideIndex) => {
    const position = getSlidePosition(slideIndex);
    const dimensions = getResponsiveDimensions();
    const dragInfluence = isDragging ? dragOffset * 0.5 : 0;

    const baseTranslateX = position * dimensions.slideSpacing + dragInfluence;
    const parallaxOffset = position * dimensions.parallaxOffset;

    let scale = 1;
    let rotateY = 0;
    let translateZ = 0;

    if (position === 0) {
      // Main card
      scale = 1;
      translateZ = 0;
    } else if (Math.abs(position) === 1) {
      // Side cards - good visibility with more spacing
      scale = window.innerWidth < 640 ? 0.88 : 0.9;
      rotateY = position * -5;
      translateZ = -60;
    } else {
      // Far cards - completely hidden
      scale = 0;
      rotateY = position * -15;
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

  const getSlideOpacity = (slideIndex) => {
    const position = Math.abs(getSlidePosition(slideIndex));
    if (position === 0) return 1;
    if (position === 1) return 0.9;
    return 0;
  };

  const renderExpoSlide = (slide, slideIndex) => {
    const position = getSlidePosition(slideIndex);
    const isActive = position === 0;
    const transform = getSlideTransform(slideIndex);
    const opacity = getSlideOpacity(slideIndex);
    const dimensions = getResponsiveDimensions();

    return (
      <div
        key={slide.id}
        className="absolute"
        style={{
          width: `${dimensions.slideWidth}px`,
          height: `${dimensions.slideHeight}px`,
          borderRadius: `${
            Math.min(dimensions.slideWidth, dimensions.slideHeight) * 0.08
          }px`,
          transform: `translateX(${transform.translateX}px) translateZ(${transform.translateZ}px) scale(${transform.scale}) rotateY(${transform.rotateY}deg)`,
          opacity: opacity,
          zIndex: isActive ? 10 : 5 - Math.abs(position),
          left: "50%",
          marginLeft: `-${dimensions.slideWidth / 2}px`,
          transition: isDragging
            ? "none"
            : "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          overflow: "hidden",
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
            alt={`Slide-${slide.id}`}
            className="w-full h-full object-cover"
            draggable={false}
          />
        </div>
      </div>
    );
  };

  const dimensions = getResponsiveDimensions();

  return (
    <div className="relative bg-white w-full" style={{ overflow: "visible" }}>
      {/* Expo Slider Container */}
      <div
        className="relative w-full"
        style={{
          height: `${dimensions.slideHeight + 90}px`,
          overflow: "visible",
        }}
      >
        <div
          className="relative w-full h-full"
          style={{
            marginTop: `${Math.max(dimensions.slideHeight * 0.025)}px`,
            perspective: "1400px",
            perspectiveOrigin: "50% 50%",
            overflow: "visible",
          }}
        >
          <div
            className="relative w-full h-full cursor-grab active:cursor-grabbing"
            style={{
              transformStyle: "preserve-3d",
              overflow: "visible",
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
      </div>

      {/* Navigation Dots */}
      <div
        className="flex justify-center items-center space-x-2"
        style={{
          marginTop: `-${Math.max(80, dimensions.slideHeight * 0.08)}px`,
          paddingBottom: `${Math.max(25, dimensions.slideHeight * 0.045)}px`,
        }}
      >
        {[0, 1, 2].map((dotIndex) => (
          <button
            key={dotIndex}
            onClick={() => goToSlide(dotNumbers[dotIndex] - 1)}
            className={`flex items-center justify-center transition-all duration-300 ${
              dotIndex === activeDotIndex
                ? "bg-[#6678FF] text-white shadow-lg font-medium"
                : "bg-indigo-200"
            }`}
            style={{
              width:
                dotIndex === activeDotIndex
                  ? `${Math.max(48, dimensions.slideWidth * 0.15)}px`
                  : `${Math.max(12, dimensions.slideWidth * 0.0375)}px`,
              height:
                dotIndex === activeDotIndex
                  ? `${Math.max(24, dimensions.slideWidth * 0.075)}px`
                  : `${Math.max(12, dimensions.slideWidth * 0.0375)}px`,
              borderRadius:
                dotIndex === activeDotIndex
                  ? `${Math.max(12, dimensions.slideWidth * 0.0375)}px`
                  : "50%",
              fontSize: `${Math.max(10, dimensions.slideWidth * 0.03125)}px`,
            }}
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