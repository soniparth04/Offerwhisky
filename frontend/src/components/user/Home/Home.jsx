import React from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import Category from './Category';
import CarouselDefault from './Slider';
import OfferCardSection from './OfferCardSection';
import VideoAdSection from './VideoAdSection';
import Navbar from '../Navbar';

const Home = () => (
  <div style={{ maxWidth: '100%', overflowX: 'hidden' }}>
    <div className='mb-20'>
      <Header />
      <SearchBar />
      <Category />
      <CarouselDefault/>
      
      {/* Multiple sections of offer cards alternating with video ads */}
      <OfferCardSection sectionId={1} />
      <VideoAdSection adId={1} />
      <OfferCardSection sectionId={2} />
      <VideoAdSection adId={2} />
      <OfferCardSection sectionId={3} />
      <VideoAdSection adId={3} />
      <OfferCardSection sectionId={4} />
      <VideoAdSection adId={4} />
      <OfferCardSection sectionId={5} />
    </div>
    <Navbar/>
  </div>
);

export default Home;
