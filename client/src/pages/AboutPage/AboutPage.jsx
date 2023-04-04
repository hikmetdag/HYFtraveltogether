/* eslint-disable react/no-unescaped-entities */
import React from "react";
import "./aboutPage.css";
import CardMui from "../../components/CardMui/CardMui";
import my from "../../assets/my.png";
import necati from "../../assets/necati.jpeg";
import abel from "../../assets/abel.png";
import hikmet from "../../assets/hikmet.jpeg";
import Tilt from "react-vanilla-tilt";

const AboutPage = () => {
  return (
    <>
      <div className="about-us-page-container">
        <div className="single-purpose-container">
          <div className="single-purpose">
            <h1 className="purpose-header">WHY US</h1>
          </div>
          <div className="all-us-container">
            <div className="purpose-paragraph-container">
              <p className="purpose-paragraph">
                Most people make plans before visiting a new place. How do we
                make these plans? We have no information, maybe our money and
                time are limited. That is why you can benefit from the comments
                created by our travelers on our website.Here is the first piece
                of advice for you;
                <span>
                  If you are going to Amsterdam by car, parking fees are very
                  expensive. But you can park your car cheaply at NDSM and
                  easily reach the center of Amsterdam with a FREE ferry! (You
                  can imagine it like a little canal tour).
                </span>
              </p>
              <div className="rectangle-orange"></div>
              <div className="red-circle-orange"></div>
              <div className="green-circle-orange"></div>
              <div className="yellow-circle-orange"></div>
            </div>
          </div>

          <div className="circle-orange"></div>
          <div className="second-circle-orange"></div>
          <div className="circle-orange"></div>
        </div>

        <div className="single-purpose-container">
          <div className="single-purpose">
            <h1 className="purpose-header">Our Aim</h1>
          </div>
          <div className="all-us-container">
            <div className="purpose-paragraph-container">
              <p className="purpose-paragraph">
                People often want to see new places and have different
                experiences. But do we have the enough knowledge for that, No.
                How can we learn this information and some tricks and whom? Of
                course, from people who have experience about the places which
                we want to go. In this way, we can use their good experiences
                and avoid their bad experiences. We wouldn't have wasted money
                and time and our visit can be more fun!
              </p>
              <div className="rectangle-orange"></div>
              <div className="red-circle-orange"></div>
              <div className="green-circle-orange"></div>
              <div className="yellow-circle-orange"></div>
            </div>
          </div>

          <div className="lower-circle"></div>
        </div>
        <div className="single-purpose-container">
          <div className="single-purpose">
            <h1 className="purpose-header">purpose</h1>
          </div>
          <div className="all-us-container">
            <div className="purpose-paragraph-container">
              <p className="purpose-paragraph">
                In a study, people generally spend their holidays in the same
                places. The reason is that they do not want to risk their
                holidays because they do not have information about other
                places. Based on this research, we established this platform to
                transfer peoples travel experiences to others. So people can
                learn more about a place before they go on a trip. In this way,
                people have the chance to travel to different places.
              </p>
              <div className="rectangle-orange"></div>
              <div className="red-circle-orange"></div>
              <div className="green-circle-orange"></div>
              <div className="yellow-circle-orange"></div>
            </div>
          </div>

          <div className="lower-circle"></div>
        </div>
        <div className="team">
          <div className="introduction">
            <h2 className="here-team">HERE IS THE TEAM</h2>
            <div className="personCards">
              <Tilt
                style={{ backgroundColor: "transparent" }}
                options={{ scale: 4, max: 45 }}
              >
                <CardMui
                  title="Abel"
                  description="Full Stack Web Developer"
                  img={abel}
                  github="https://github.com/Abimills"
                  linkedIn="https://www.linkedin.com/in/abel-t-7660a2229/"
                />
              </Tilt>
              <Tilt
                style={{ backgroundColor: "transparent" }}
                options={{ scale: 4, max: 45 }}
              >
                <CardMui
                  title="Hikmet"
                  description="Full Stack Web Developer"
                  img={hikmet}
                  github="https://github.com/hikmetdag"
                  linkedIn="https://www.linkedin.com/in/hikmet-dag-8b6b87188/"
                />
              </Tilt>
              <Tilt
                style={{ backgroundColor: "transparent" }}
                options={{ scale: 4, max: 45 }}
              >
                <CardMui
                  title="Mustafa"
                  description="Full Stack Web Developer"
                  img={my}
                  github="https://github.com/mysr3809"
                  linkedIn="https://www.linkedin.com/in/mustafaysr"
                />
              </Tilt>
              <Tilt
                style={{ backgroundColor: "transparent" }}
                options={{ scale: 4, max: 45 }}
              >
                <CardMui
                  title="Necati"
                  description="Full Stack Web Developer"
                  img={necati}
                  github="https://github.com/necati-arslan"
                  linkedIn="https://www.linkedin.com/in/arslannecati/"
                />
              </Tilt>
            </div>
          </div>
          <div className="thanks-message">
            <h4>
              "A candle loses nothing by lighting another candle" - Mevlana
            </h4>
            <h3>
              We would like to thank the entire HackYourFuture family,
              especially to Rob van Kruijsdijk,Fede,Wouter,Josephine, Sam
              Krouwer , Frank Parejo Lopez and all of our mentors who was there
              on every module, who shared their knowledge with us, mentored us
              and shared their valuable time.
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
