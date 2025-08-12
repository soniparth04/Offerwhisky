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
    <div style={{ maxWidth: '100%', overflowX: 'hidden' }}>
      <div className='mb-20'>
        <Header />
        <SearchBar />
        <Category onCategoryChange={handleCategoryChange} activeCategory={currentCategory} />
        <Slider />
        
        {/* Multiple sections of offer cards alternating with video ads and image ads */}
        <OfferHeader />
        <OfferCardSection sectionId={1} filterType={currentFilter} categoryFilter={currentCategory} />
        <VideoAdSection adId={1} />
        <OfferCardSection sectionId={2} filterType={currentFilter} categoryFilter={currentCategory} />
        <ImageAdSection adId={1} />
        <OfferCardSection sectionId={3} filterType={currentFilter} categoryFilter={currentCategory} />
        <VideoAdSection adId={2} />
        <OfferCardSection sectionId={4} filterType={currentFilter} categoryFilter={currentCategory} />
        <ImageAdSection adId={2} />
        <OfferCardSection sectionId={5} filterType={currentFilter} categoryFilter={currentCategory} />
      </div>
      <Navbar/>
    </div>
  );
};

export default Home;
