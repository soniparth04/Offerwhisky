import React from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import Category from './Category';
import CarouselDefault from './Slider';
import LatestOffers from './LatestOffer';


const Home = () => (
  <div  style={{ maxWidth: '100%', overflowX: 'hidden' }}>
    <Header />
    <SearchBar />
    <Category />
    <CarouselDefault/>
    <LatestOffers/>
  </div>
);

export default Home;
