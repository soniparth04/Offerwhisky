import React, { useEffect, useState } from 'react';
import Markerpin from "../../../assets/Home/marker.png";
import ChevronDown from "../../../assets/Home/chevrondown.png";
import Heart from "../../../assets/Home/heart.png"
import { useNavigate } from "react-router-dom";

const Header = () => {

  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const apiKey = import.meta.env.VITE_OPENCAGE_API_KEY;

  const getCityFromComponents = (components) => {
    return (
      components.city ||
      components.town ||
      components.village ||
      components.municipality ||
      components.county ||
      components.state ||
      components.country
    );
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setLoading(false);
      return;
    }

    const geoOptions = {
      enableHighAccuracy: true,
      timeout: 10000, // 10 seconds
      maximumAge: 0 // Don't use cached position
    };

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        console.log("Geo Coordinates:", latitude, longitude);

        try {
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}&no_annotations=1`
          );

          if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
          }

          const data = await response.json();
          console.log("OpenCage result:", data);

          if (data.results?.length > 0) {
            const result = data.results[0];
            setAddress(result.formatted || 'Address not available');

            const cityName = getCityFromComponents(result.components);
            setCity(cityName || 'City not available');
          } else {
            setAddress('No address found for this location');
            setCity('No city found for this location');
          }
        } catch (err) {
          console.error('Error:', err);
          setError('Failed to get location data');
          setAddress('Location service error');
          setCity('City detection error');
        } finally {
          setLoading(false);
        }
      },
      (error) => {
        console.error('Geolocation error:', error);
        let errorMessage = 'Location access denied';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location permission denied";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out";
            break;
          default:
            errorMessage = "Unknown location error";
        }
        setError(errorMessage);
        setAddress(errorMessage);
        setCity('');
        setLoading(false);
      },
      geoOptions
    );
  }, [apiKey]);

  return (
    <div className="bg-gradient-to-b from-orange-100 to-white px-4 pt-10 pb-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <div>
            <p className=" flex items-center">
              <span className="font-bold flex items-center">
                <img src={Markerpin} alt="Marker Icon" className="w-6 h-6 mr-2" />
                Current Location
                <img
                  src={ChevronDown}
                  alt="chevron down"
                  className="w-4 h-4 ml-1 cursor-pointer"
                  onClick={() => navigate("/location")}
                />
              </span>
            </p>
            <p className="text-xs  text-gray-500 ml-2 ">
              {loading ? 'Fetching location...' : error || address}
            </p>
          </div>

        </div>
        {/* Gift Icon */}
        <div className="text-xl text-gray-700">
          <img src={Heart} alt="heart" className="w-6 h-6 " />
        </div>
      </div>
    </div>
  );
};

export default Header;