import React from "react";
import PropTypes from "prop-types";
import { AiFillStar } from "react-icons/ai";
import Card from "../../components/Card/Card";
import { logInfo } from "../../../../server/src/util/logging";

const FavoritesReviews = ({ data }) => {
  logInfo(data);
  if (data.length < 1) {
    return (
      <div>
        <h3 style={{ textAlign: "center", margin: "3rem" }}>Empty ...</h3>
      </div>
    );
  }
  return (
    <div className="profile-cards">
      {data?.map((item) => (
        <Card
          title={item.visitedPlace}
          img={item.photo}
          description={item.title}
          key={item._id}
          id={item._id}
          date={item.date}
          userName={item.userName}
          icon={Array(item.score).fill(<AiFillStar />)}
        />
      ))}
    </div>
  );
};
FavoritesReviews.propTypes = {
  data: PropTypes.array,
};

export default FavoritesReviews;
