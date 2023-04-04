import React, { useContext } from "react";
import "./resultPage.css";
import PlaceSearchBar from "../../components/Templates/PlaceSearchBar/PlaceSearchBar";
import { Link, useLocation } from "react-router-dom";
import Button from "../../components/Templates/Button/Button";
import { LoginContext } from "../../components/Context/LoginContext";
import FilterCategory from "../../components/FilterCategory/FilterCategory";

const ResultPage = () => {
  const location = useLocation();
  const allData = location.state.data.reviews;
  const visitedPlace = location.state.place.split(",")[0];
  const { user } = useContext(LoginContext);
  const data = allData.sort((a, b) => b.score - a.score);
  return (
    <div className="result-content">
      <div className="resultSearchBar">
        <PlaceSearchBar />
      </div>
      <div className="reviewInfo">
        {data.length !== 0 && (
          <>
            <h1>{`Here are the reviews about ${visitedPlace}!`}</h1>
            <div className="reviewContainer">
              <FilterCategory dbData={data} />
            </div>
          </>
        )}
      </div>
      {data.length === 0 && (
        <div className="noReview reviewInfo">
          {location.state.place === undefined ? (
            <h1>Please write place name in search bar</h1>
          ) : (
            <div className="reviewOffer">
              <h1>
                There is no review about <br></br>
                <span>{visitedPlace}</span>
                <br></br>
                Share your experience and create first review!
              </h1>
              {user ? (
                <Link to="/createReview">
                  <Button name="Create Review" />
                </Link>
              ) : (
                <Link to="/login">
                  <Button name="Create Review" />
                </Link>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResultPage;
