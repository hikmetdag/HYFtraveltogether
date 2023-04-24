import React, { useState, useContext, useEffect } from "react";
import "./Card.css";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { ImLocation } from "react-icons/im";
import { AiFillHeart } from "react-icons/ai";
import { IoPencil } from "react-icons/io5";
import { AiOutlineHeart } from "react-icons/ai";
import { LoginContext } from "../Context/LoginContext";
import { logInfo } from "../../../../server/src/util/logging";

const Card = ({ img, title, userName, id, icon, date, data }) => {
  const { user } = useContext(LoginContext);
  const navigate = useNavigate();
  const [favored, setFavored] = useState(false);
  const [edit, setEdit] = useState(false);
  const reviewId = id;
  const userId = user && user.userId;

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("user"));
    users && setFavored(users.fav.includes(id));
  }, [id]);

  useEffect(() => {
    const reviewsByUser = data?.map((item) => item.user);
    if (reviewsByUser?.includes(userId)) {
      setEdit(true);
    }
  }, [data]);
  const handleAddFavbtn = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user === null) {
      navigate("/login");
    }
    setFavored(!favored);
    if (favored) {
      user && user.fav.splice(user.fav.indexOf(reviewId), 1);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      user && user.fav.push(reviewId);
      localStorage.setItem("user", JSON.stringify(user));
    }
  };
  const handleEditClick = () => {
    navigate("/createReview", { state: { reviewId } });
  };
  const fetchData = async () => {
    const users = JSON.parse(localStorage.getItem("user"));

    if (users !== null) {
      await fetch(`${process.env.BASE_SERVER_URL}/api/user/me/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reviewId,
          userId,
        }),
      });
    }
  };

  return (
    <div className="card-container">
      <div className="card">
        {favored ? (
          <AiFillHeart
            className="favored-icon "
            onClick={() => (fetchData(), handleAddFavbtn())}
          />
        ) : (
          <AiOutlineHeart
            className="favored-icon un-liked-icon"
            onClick={() => (fetchData(), handleAddFavbtn())}
          />
        )}
        {edit && <IoPencil className="edit-icon " onClick={handleEditClick} />}

        <img src={img} alt="card-image" />
        <div className="info-box">
          <span className="placeName">
            {<ImLocation />}
            {title}
          </span>
          <p className="userName">Traveler Name : {userName}</p>
          <div className="star-header-container">
            <div className="stars">
              <div className="star-icon">{icon}</div>
              <p className="date">{date}</p>
            </div>
          </div>
        </div>
        <Link to={`/detail/${id}`}>
          <button className="explore-btn">Explore Now</button>
        </Link>
      </div>
    </div>
  );
};
Card.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string,
  icon: PropTypes.array,
  subDescription: PropTypes.string,
  userName: PropTypes.string,
  date: PropTypes.date,
};

export default Card;
