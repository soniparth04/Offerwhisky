import React from 'react';
import Header from './Header';
import SearchBar from './SearchBar';
import Category from './Category';
import CarouselDefault from './Slider';
import LatestOffers from './LatestOffer';
import Navbar from '../Navbar';


const Home = () => (
  <div  style={{ maxWidth: '100%', overflowX: 'hidden' }}>
    <Header />
    <SearchBar />
    <Category />
    <CarouselDefault/>
    <LatestOffers/>
    <Navbar/>
  </div>
);

export default Home;
