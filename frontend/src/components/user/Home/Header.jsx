import React from "react";
import Markerpin from "../../../assets/Home/marker.png";
import ChevronDown from "../../../assets/Home/chevrondown.png";
import Heart from "../../../assets/Home/heart.png"


const Header = () => {
    return (
        <div className="bg-gradient-to-b from-orange-100 to-white px-4 pt-10 pb-2">
            <div className="flex justify-between items-center">
                {/* Location + Dropdown */}
                <div className="flex items-center">
                    <div>
                        <p className=" flex items-center">
                            <span className="font-bold flex items-center">
                            <img src={Markerpin} alt="Marker Icon" className="w-6 h-6 mr-2" />
                                Current Location
                                <img src={ChevronDown} alt="chevron down" className="w-4 h-4 ml-1" />
                            </span>
                        </p>
                        <p className="text-xs  text-gray-500 ml-2 ">
                            A-01, Bank street , new delhi-110096 A-...
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