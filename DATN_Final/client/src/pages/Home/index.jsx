import React from 'react';
import Banner from '../../components/Banner';
import ListCategory from '../../components/ListCategory';
import ListProductsHome from '../../components/ListProductsHome';
import Policy from '../../components/Policy';
import SlideHome from '../../components/SlideHome';
import './styles.scss';

const Home = () => {
  return (
    <div className="home">
      <Banner />
      <ListCategory />
      <SlideHome />
      <ListProductsHome />
      <Policy />
    </div>
  );
};

export default Home;
