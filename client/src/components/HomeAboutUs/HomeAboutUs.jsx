import React from "react";
import "../../pages/Home/home.css";
import { HiUserGroup } from "react-icons/hi";
import { BsStack } from "react-icons/bs";
import { GiStairsGoal } from "react-icons/gi";
import Tilt from "react-vanilla-tilt";
import ContactForm from "../ContactForm/ContactForm";

const HomeAboutUs = () => {
  return (
    <div className="all-about-us-container">
      <div className="about-us-text-container">
        <div className="about-us-one wood-one">A</div>
        <div className="about-us-one wood-two">B</div>
        <div className="about-us-one wood-three">O</div>
        <div className="about-us-one wood-four">U</div>
        <div className="about-us-one wood-five">T</div>
        <div className="about-us-one wood-six">U</div>
        <div className="about-us-one wood-seven">S</div>
      </div>

      <div className="title-about-us-home-page-container">
        <h1 className="get-to">Get To Know Us</h1>
        <div className="underline-about"></div>
      </div>

      <div className="what-drives-container">
        <Tilt
          style={{ backgroundColor: "transparent" }}
          options={{ scale: 4, max: 45 }}
        >
          <div className="our-first-mission">
            <div className="icon-background">
              <HiUserGroup className="about-us-icon" />
            </div>
            <p>
              Our mission is to provide exceptional travel advice, tips, and
              recommendations to all our users.We are committed to creating a
              user-friendly platform that is easy to navigate.
            </p>
          </div>
        </Tilt>
        <Tilt
          style={{ backgroundColor: "transparent" }}
          options={{ scale: 4, max: 45 }}
        >
          <div className="our-first-mission">
            <div className="icon-background">
              <BsStack className="about-us-icon" />
            </div>
            <p>
              We strive to be a reliable source of information for travelers
              seeking to explore new destinations, try new activities, or plan
              their dream vacations.
            </p>
          </div>
        </Tilt>
        <Tilt
          style={{ backgroundColor: "transparent" }}
          options={{ scale: 4, max: 45 }}
        >
          <div className="our-first-mission">
            <div className="icon-background">
              <GiStairsGoal className="about-us-icon" />
            </div>
            <p>
              Our goal is to make travel planning as stress-free as possible,
              ensuring that every user has an enjoyable and memorable travel
              experience as possible.
            </p>
          </div>
        </Tilt>
      </div>
      <div className="title-about-us-home-page-container">
        <h1 className="get-to ">Contact Us</h1>
        <div className="underline-about"></div>
      </div>
      <div className="contact-us-container">
        <ContactForm />
        {/* <form>
          <div className="name-email-about-container">
            <input
              type="text"
              className="contact-us-input"
              placeholder="Name"
            />
            <input
              type="text"
              className="contact-us-input"
              placeholder="Email"
            />
          </div>
          <input
            type="text"
            className="contact-us-input"
            placeholder="Subject"
          />
          <textarea
            className="contact-us-input"
            placeholder="write you comments here"
          ></textarea>
        </form> */}
      </div>
    </div>
  );
};

export default HomeAboutUs;
