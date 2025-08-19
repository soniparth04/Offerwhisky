import React from "react";
import Food from "../../../assets/Home/food.png"
import Property from "../../../assets/Home/property.png"
import Vehicles from "../../../assets/Home/vehicle.png"
import Salon from "../../../assets/Home/salon.png"
import ViewAll from "../../../assets/Home/viewall.png"

const Category = ({ onCategoryChange, activeCategory }) => {
    const categories = [
        { id: 'food', image: Food, alt: 'Food' },
        { id: 'property', image: Property, alt: 'Property' },
        { id: 'vehicle', image: Vehicles, alt: 'Vehicle' },
        { id: 'beauty', image: Salon, alt: 'Spa & Salon' },
        { id: 'all', image: ViewAll, alt: 'View All' }
    ];

    const handleCategoryClick = (categoryId) => {
        onCategoryChange(categoryId);
    };

    return (
        <div className="category flex justify-between mx-4 -mt-2">
            {categories.map((category) => (
                <div 
                    key={category.id} 
                    className="items-center flex flex-col cursor-pointer transition-all duration-300"
                    onClick={() => handleCategoryClick(category.id)}
                >
                    <div className="p-1">
                        <img 
                            src={category.image} 
                            alt={category.alt} 
                            className={`w-14 transition-all duration-300 ${category.id === 'beauty' ? 'mt-2' : ''}`}
                            style={activeCategory === category.id ? {
                                filter: 'brightness(0) saturate(100%) invert(31%) sepia(100%) saturate(2000%) hue-rotate(201deg) brightness(99%) contrast(101%)'
                            } : {}}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Category;