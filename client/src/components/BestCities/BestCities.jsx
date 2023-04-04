import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import "../../pages/Home/home.css";
import BestSmallCity from "./BestSmallCity";
import Loading from "../Templates/Loading/Loading";

const BestCities = () => {
  const [topCities, setTopCities] = useState([]);
  const { performFetch, isLoading } = useFetch("/review/sort", (data) =>
    setTopCities(data.result)
  );
  useEffect(() => {
    performFetch();
  }, []);
  return (
    <>
      <div className="title-home-container">
        <h1 className="top-destination">Best Cities</h1>
      </div>
      {/* <div className="underline " style={{ marginBottom: "2rem" }}></div> */}
      <div className="best-cities-container">
        <div className="best-city">
          {topCities?.slice(0, 10).map((singleTrip) => {
            return <BestSmallCity data={singleTrip} key={singleTrip._id} />;
          })}
        </div>
      </div>
      {isLoading && <Loading />}
    </>
  );
};

export default BestCities;
