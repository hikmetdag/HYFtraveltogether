import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import FilterCategory from "../../components/FilterCategory/FilterCategory";
import Loading from "../../components/Templates/Loading/Loading";

const DiscoverTrips = () => {
  const [data, setData] = useState([]);
  const { performFetch, isLoading } = useFetch("/review/sort", (data) => {
    setData(data);
  });
  useEffect(() => {
    performFetch();
  }, []);
  const dbData = data?.result;

  return (
    <div className="allData">
      <h1 className="top-destination top-one">Discover Now</h1>
      <div className="underline"></div>
      <div className="reviewContainer">
        <FilterCategory dbData={dbData} />
      </div>
      {isLoading && <Loading />}
    </div>
  );
};

export default DiscoverTrips;
