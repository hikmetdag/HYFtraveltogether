import React from "react";
import "../../pages/Home/home.css";
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillCalendar2MonthFill } from "react-icons/bs";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { IoCreate } from "react-icons/io5";
import plant from "../../assets/plant.png";
import guyPointing from "../../assets/guy-pointing.png";
import { Link, useNavigate } from "react-router-dom";
import Tilt from "react-vanilla-tilt";
import { useAlert } from "react-alert";

const Services = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const alert = useAlert();
  const handleClickCreate = () => {
    user === null
      ? navigate("/register")
      : alert.success("you are already registered");
  };
  return (
    <div className="all-our-mission">
      <div className="our-mission-text-container">
        <Tilt
          style={{ backgroundColor: "transparent" }}
          options={{ scale: 4, max: 45 }}
        >
          <div className="watch-reviews-container">
            <div className="circle-dot">
              <div className="orange-dot-div"></div>
            </div>

            <h1 className="watch-review">
              <span>{<BsFillEyeFill />}</span> Watch Reviews
            </h1>
            <p className="watch-paragraph">
              You can view comments created by our travelers and learn useful
              information about the places you will travel.
              <br /> Let&apos;s go travel
            </p>
            <Link to={"/discover"}>
              <button className="read-more-btn">
                {<BsFillArrowRightCircleFill />}
              </button>
            </Link>
          </div>
        </Tilt>
        <Tilt
          style={{ backgroundColor: "transparent" }}
          options={{ scale: 4, max: 45 }}
        >
          <div className="watch-reviews-container">
            <div className="circle-dot">
              <div className="orange-dot-div"></div>
            </div>

            <h1 className="watch-review">
              <span>{<IoCreate />}</span>
              Create Reviews
            </h1>
            <p className="watch-paragraph">
              If we want to benefit from the experiences, we need to share our
              experiences for everyone.
              <br /> Let&apos;s share your experience!
            </p>
            <Link to="/createReview">
              <button className="read-more-btn">
                {<BsFillArrowRightCircleFill />}
              </button>
            </Link>
          </div>
        </Tilt>
        <Tilt
          style={{ backgroundColor: "transparent" }}
          options={{ scale: 4, max: 45 }}
        >
          <div className="watch-reviews-container turn-border-reviews">
            <div className="circle-dot">
              <div className="orange-dot-div"></div>
            </div>

            <h1 className="watch-review">
              <span>{<BsFillCalendar2MonthFill />}</span> Create your Account
            </h1>
            <p className="watch-paragraph">
              If you want to share a new experience and use the features more
              effectively, join the{" "}
              <span style={{ color: "orange" }}>TRAVEL2GETHER</span>.
              <br /> Let&apos;s create an account!
            </p>
            <a style={{ cursor: "pointer" }} onClick={handleClickCreate}>
              <button className="read-more-btn create-account-btn">
                {<BsFillArrowRightCircleFill />}
              </button>
            </a>
          </div>
        </Tilt>
      </div>
      <div className="all-service-image-container">
        <div className="services-text">
          <h1>What</h1>
          <h2 className="our-services-header">OUR SERVICES</h2>
          <h1 className="offer-text">
            {" "}
            OFFE <span>R</span>{" "}
          </h1>
        </div>
        <img src={plant} alt="plant" className="plant-pic" />
        <img src={guyPointing} alt="hat" className="all-guy-pointing-img" />
      </div>
    </div>
  );
};

export default Services;
