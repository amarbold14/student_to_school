import React from "react";
const LegendItems = ({ data }) => {
  return data.map((item, index) => (
    <div key={index}>
      <span
        style={{
          display: "inline-block",
          width: "10px",
          height: "10px",
          backgroundColor: item.color,
          marginRight: "5px",
        }}
      ></span>
      {item.label}
    </div>
  ));
};
export default LegendItems;
