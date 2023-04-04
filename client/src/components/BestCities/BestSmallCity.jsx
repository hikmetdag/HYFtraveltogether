import React from "react";
import { Link } from "react-router-dom";
// import { logInfo } from "../../../../server/src/util/logging";
import PropTypes from "prop-types";

const BestSmallCity = ({ data }) => {
  // logInfo(data);
  return (
    <div className="text-image-container">
      <Link to={`/details/${data.city}`}>
        <p className="city-names">
          <span>{data.city}</span>
        </p>
        <img src={data.photo} alt="" className="small-size-img" />
      </Link>
    </div>
  );
};
BestSmallCity.propTypes = {
  data: PropTypes.object,
};

export default BestSmallCity;
