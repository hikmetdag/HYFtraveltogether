import React from "react";
import { Blocks } from "react-loader-spinner";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading">
      <Blocks
        height={120}
        width={120}
        color="#ffa500"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#ffa500"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export default Loading;
