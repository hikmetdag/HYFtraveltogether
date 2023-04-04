import React from "react";
import guyPic from "../../assets/couples-pic.png";
import postPic from "../../assets/postthingi.png";
import hat from "../../assets/hat.png";
import airplane from "../../assets/airplane.png";
import PlaceSearchBar from "../../components/Templates/PlaceSearchBar/PlaceSearchBar";
import "../../pages/Home/home.css";
import { Link } from "react-router-dom";
const HomeHeaderPage = () => {
  return (
    <>
      <PlaceSearchBar />
      <div className="all-home-page-container">
        <div className="all-text-container">
          <img src={postPic} alt="post pic" className="all-post-img" />
          <h1>
            Explore <span>the World</span>{" "}
          </h1>
          <p>
            How about traveling together? If you want to go to a new place but
            do not know anything about it,{" "}
            <span style={{ color: "orange" }}>TRAVEL2GETHER</span> is here for
            you. By searching for your next destination, you can find comments
            and tips about there. Also, do not forget to write a comment about
            the places you have traveled and share your experiences. <br />
            Come on, plan your trip!
          </p>
          <img src={airplane} alt="hat" className="all-airplane-img" />
          <img src={hat} alt="hat" className="all-hat-img" />
          <Link to={"/discover"}>
            <button className="all-discovers-btn">Discover Now</button>
          </Link>
        </div>
        <div className="all-image-container">
          <img src={guyPic} alt="guy pic" />
          <div className="all-circle"></div>
        </div>
      </div>
      <div className="all-single-images"></div>
    </>
  );
};

export default HomeHeaderPage;
