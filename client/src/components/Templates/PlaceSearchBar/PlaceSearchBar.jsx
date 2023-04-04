import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import "./placeSearchBar.css";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { BiSearch } from "react-icons/bi";
import { logInfo } from "../../../../../server/src/util/logging";

const PlaceSearchBar = () => {
  const [inputPlace, setInputPlace] = useState("");
  const [data, setData] = useState();
  const [showEmptyErr, setShowEmptyErr] = useState(false);

  const place = inputPlace.label;
  const { performFetch } = useFetch("/review/reviewbyAddress", (data) => {
    setData(data);
    navigate("/resultPage", { state: { data, place } });
  });
  logInfo(data);

  const navigate = useNavigate();
  const handleSearch = async () => {
    if (!inputPlace) {
      setShowEmptyErr(true);
      setTimeout(() => {
        setShowEmptyErr(false);
      }, 2000);
    } else if (inputPlace) {
      const option = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(inputPlace),
      };
      performFetch(option);
    }
  };

  return (
    <div className="search-container">
      <div className="placeSearchBar">
        <GooglePlacesAutocomplete
          selectProps={{
            inputPlace,
            onChange: setInputPlace,
          }}
          placeHolder="Find"
          value="Place"
          apiKey={process.env.REACT_APP_API_KEY}
        />
      </div>
      <button onClick={handleSearch} className="home-discover-btn">
        <BiSearch />
      </button>
      {showEmptyErr && <p className="emptyInputError">Please Select a Place</p>}
    </div>
  );
};

export default PlaceSearchBar;
