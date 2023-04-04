import React, { useState, useEffect } from "react";
import "../../pages/Home/home.css";
import Card from "../../components/Card/Card";
import useFetch from "../../hooks/useFetch";
// import { logInfo } from "../../../../server/src/util/logging";
import { AiFillStar } from "react-icons/ai";
import Loading from "../Templates/Loading/Loading";
const Cards = () => {
  const [data, setData] = useState();
  const { performFetch, isLoading } = useFetch("/review/sort", (data) => {
    setData(data);
  });
  useEffect(() => {
    performFetch();
  }, []);
  return (
    <>
      <div className="title-home-container">
        <h1 className="top-cards-destination">Top Destinations</h1>
      </div>
      {/* <div className="underline"></div> */}
      <div className="cards-container">
        {data?.result?.slice(0, 8).map((item) => (
          <Card
            title={item.city}
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
      {isLoading && <Loading />}
    </>
  );
};

export default Cards;
