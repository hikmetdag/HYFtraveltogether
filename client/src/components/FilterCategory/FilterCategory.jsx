import React, { useEffect, useState } from "react";
import Card from "../Card/Card";
import { AiFillStar } from "react-icons/ai";
import "./filterCategory.css";

// eslint-disable-next-line react/prop-types
const FilterCategory = ({ dbData }) => {
  const [selectCat, setSelectCat] = useState([]);
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    setData(dbData);
    // eslint-disable-next-line react/prop-types
    setCategories(["ALL", ...new Set(dbData?.map((item) => item.category[0]))]);
  }, [dbData]);

  const galleryFilter = (itemData) => {
    if (itemData === "ALL") {
      setData(dbData);
      return;
    }
    // eslint-disable-next-line react/prop-types
    const filterData = dbData?.filter((item) => item.category == itemData);
    setData(filterData);
  };
  return (
    <div className="result_content">
      <div className="galleryWrapper">
        <div className="filterItem">
          <ul>
            {categories?.map((item, index) => (
              <li key={index}>
                <button
                  className={selectCat === index ? "active" : "non-active"}
                  onClick={() => {
                    galleryFilter(item);
                    setSelectCat(index);
                  }}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="reviewCards">
          {data?.map((item) => (
            <div className="reviewItem" key={item.id}>
              <Card
                title={item.visitedPlace}
                img={item.photo}
                description={item.title}
                key={item._id}
                id={item._id}
                userName={item.userName}
                date={item.date}
                icon={Array(item.score).fill(<AiFillStar />)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterCategory;
