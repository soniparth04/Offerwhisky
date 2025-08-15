import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Star,
  Clock,
} from "lucide-react";

import { FaPlay } from "react-icons/fa";

const VideoAdSection = ({ adId = 1 }) => {
  const videoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showCenterButton, setShowCenterButton] = useState(false);

  // Enhanced ad variations with offer details
  const ads = [
    {
      video: "/Defender.mp4",
      fallbackImage:
        "https://images.unsplash.com/photo-1617893992751-6d1e8d7f19ec?w=1200&h=600&fit=crop&q=80",
      title: "Range Rover Defender",
      subtitle: "Luxury SUV Offer",
      accentColor: "from-indigo-500 to-purple-500",
      offer: {
        discount: "₹1,00,000 OFF",
        description:
          "Rule Streets And Trails With The Legendary Range Rover Defender",
        validUntil: "Valid Till : 20th Aug 2025",
        rating: 4.9,
        reviews: 327,
      },
    },
    {
      video: "/ColdDrink.mp4",
      fallbackImage:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop&q=80",
      title: "Go Good",
      subtitle: "Buy 2 Get 1 Free",
      accentColor: "from-rose-400 to-orange-300",
      offer: {
        discount: "Buy 2 Get 1 FREE",
        description: "Refreshing Natural Cold Drinks - Special Combo Pack",
        validUntil: "Valid Till : 18th Aug 2025",
        rating: 4.6,
        reviews: 892,
      },
    },
  ];

  const currentAd = ads[(adId - 1) % ads.length];

  // Format time in MM:SS format
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Toggle play/pause
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
      setIsPlaying(false);
      setShowCenterButton(true);
    } else {
      video.play().catch(() => {});
      setIsPlaying(true);
      setShowCenterButton(false);
    }
  };

  // Toggle mute/unmute
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  // Handle video click to toggle play/pause
  const handleVideoClick = () => {
    togglePlay();
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsLoading(false);
      // Auto-play with retry mechanism
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If autoplay fails, try again after a short delay
          setTimeout(() => {
            video.play().catch(() => setHasError(true));
          }, 1000);
        });
      }
    };

    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
      setHasError(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    const handlePlay = () => {
      setIsPlaying(true);
      setShowCenterButton(false);
    };

    const handlePause = () => {
      setIsPlaying(false);
      setShowCenterButton(true);
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("error", handleError);
    video.addEventListener("loadstart", handleLoadStart);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    // Intersection Observer for better performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(video);

    return () => {
      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("error", handleError);
      video.removeEventListener("loadstart", handleLoadStart);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="mt-2 px-2 sm:px-4 bg-gray-50 py-3 cursor-pointer">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden relative">
        {/* Video Container */}
        <div
          className="relative h-56 sm:h-72 overflow-hidden group"
          onClick={handleVideoClick}
        >
          {/* Main Video Element */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            muted
            loop
            autoPlay
            playsInline
            preload="auto"
            poster={currentAd.fallbackImage}
          >
            <source src={currentAd.video} type="video/mp4" />
            {/* Fallback image */}
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${currentAd.fallbackImage})` }}
            />
          </video>

          {/* Center Play/Pause Button - Only shown when paused */}
          {showCenterButton && (
            <div className="absolute inset-0 flex items-center justify-center z-30">
              <div className="bg-black/40 backdrop-blur-sm hover:bg-opacity-80 p-2 rounded-full">
                {isPlaying ? (
                  <Pause className="w-8 h-8 text-white" />
                ) : (
                  <FaPlay className="w-7 h-7 text-white ml-1" />
                )}
              </div>
            </div>
          )}

          {/* Timer - Top Left */}
          <div className="absolute top-1 left-1 z-20">
            <div className="bg-black bg-opacity-60 backdrop-blur-sm px-2 py-1 rounded-lg">
              <span className="text-white text-xs font-mono flex">
                {formatTime(currentTime)}
              </span>
            </div>
          </div>

          {/* Mute/Unmute Button - Bottom Right */}
          <div className="absolute bottom-1 right-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleMute();
              }}
              className="bg-black bg-opacity-60 backdrop-blur-sm hover:bg-opacity-80 p-2 sm:p-2.5 rounded-full transition-all duration-200 hover:scale-110"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              ) : (
                <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              )}
            </button>
          </div>

          {/* Enhanced Loading State */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="w-8 h-8 sm:w-12 sm:h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Error State Fallback */}
          {hasError && (
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${currentAd.fallbackImage})` }}
            ></div>
          )}

          {/* Enhanced AD Tag - Top Right */}
          <div className="absolute top-1 right-1 sm:right-4 z-20">
            <div className="relative">
              <div className="bg-black/50 rounded-lg px-2 py-1">
                <div className="flex items-center">
                  <span className="text-white text-xs tracking-wider font-semibold">
                    AD
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Offer Details Section */}
        <div className="-mt-5 p-4 border-t border-gray-100">
          {/* Title and Rating */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 my-3">
                {currentAd.offer.description}
              </h3>

              {/* Price Section */}
              <div className="flex items-center space-x-3 mb-3">
                <div
                  className={`bg-gradient-to-r ${currentAd.accentColor} text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg`}
                >
                  {currentAd.offer.discount}
                </div>
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center space-x-1">
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-semibold text-gray-700">
                    {currentAd.offer.rating}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  ({currentAd.offer.reviews} reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Validity */}
          <div className="flex items-center space-x-2 text-sm text-orange-600">
            <Clock className="w-4 h-4" />
            <span className="font-medium">{currentAd.offer.validUntil}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoAdSection;
