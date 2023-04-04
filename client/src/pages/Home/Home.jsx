import React from "react";
import Cards from "../../components/CardsContainer/Cards";
import "./home.css";
import Services from "../../components/Services/Services";
import BestCities from "../../components/BestCities/BestCities";
import HomeAboutUs from "../../components/HomeAboutUs/HomeAboutUs";
import HomeHeaderPage from "../../components/HomeHeaderPage/HomeHeaderPage";

const Home = () => {
  return (
    <div className="home-mother-container">
      <HomeHeaderPage />
      <Services />
      <BestCities />
      <Cards />
      <HomeAboutUs />
    </div>
  );
};
export default Home;
