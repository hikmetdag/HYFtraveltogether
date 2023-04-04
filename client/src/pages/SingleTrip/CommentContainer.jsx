import React from "react";
import "./SingleTrip.css";
import PropTypes from "prop-types";

const CommentContainer = ({ data }) => {
  const { userPhoto, userName, comment } = data;

  return (
    <div className="comment-person-container">
      <img src={userPhoto} alt="" />
      <div className="text-container">
        <h4>{userName}</h4>
        <h6>{comment} </h6>
      </div>
    </div>
  );
};
CommentContainer.propTypes = {
  data: PropTypes.object,
};

export default CommentContainer;
