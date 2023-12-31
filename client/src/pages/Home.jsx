import React from "react";
import Announcement from "../components/Announcement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import Slider from "../components/Slider";
import { useLocation } from "react-router-dom";

const Home = () => {

  const {state} = useLocation();
  const {token} = state; 

  return (
    <div>
      <Announcement />
      <Navbar />
      <Slider />
      <Categories token = {token}/>
      <Products/>
      <Newsletter/>
      <Footer/>
    </div>
  );
};

export default Home;
