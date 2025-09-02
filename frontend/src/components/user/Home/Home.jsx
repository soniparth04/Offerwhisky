import React, { useState } from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import Category from './Category';
import Slider from './Slider';
import OfferCardSection from './OfferCardSection';
import VideoAdSection from './VideoAdSection';
import ImageAdSection from './ImageAdSection';
import Navbar from '../Navbar';
import OfferHeader from './OfferHeader';

// Import the new specialized components
import Section1 from './OfferCardSection/Section1';
import Section2 from './OfferCardSection/Section2';
import Section3 from './OfferCardSection/Section3';
import Section4 from './OfferCardSection/Section4';
import Section5 from './OfferCardSection/Section5';
import Section6 from './OfferCardSection/Section6';
import Section7 from './OfferCardSection/Section7';

const Home = () => {
  const [currentFilter, setCurrentFilter] = useState('all');
  const [currentCategory, setCurrentCategory] = useState('all');

  const handleFilterChange = (filterType) => {
    setCurrentFilter(filterType);
  };

  const handleCategoryChange = (categoryType) => {
    setCurrentCategory(categoryType);
    // When a category is selected, reset the offer type filter to show all offers
    setCurrentFilter('all');
  };

  return (
    <div style={{ maxWidth: '100%', overflowX: 'hidden' }} className="select-none">
      <style>{`
        img { pointer-events: none; user-drag: none; -webkit-user-drag: none; }
      `}</style>
      <div className='mb-20'>
        <Header />
        <SearchBar />
        <Category onCategoryChange={handleCategoryChange} activeCategory={currentCategory} />
        <Slider />
        <Section1 />
        <VideoAdSection adId={1} />
        <Section2 />
        <Section3 />
        <VideoAdSection adId={2} />
        <Section4 />
        <Section5 />
        <Section6 />
        {/* <Section7/> */}
        <OfferHeader/>
        <OfferCardSection/>
        <OfferCardSection/>
        <OfferCardSection/>
        <OfferCardSection/>
        <OfferCardSection/>
      </div>
      <div className="fixed bottom-0 left-0 w-full z-50">
        <Navbar/>
      </div>
    </div>
  );
};

export default Home;