import BoxWrapperLine from "components/BoxWrapperLine";
import React from "react";

const BoxWrapper = ({ title, desc }) => {
  return (
    <div
      className={"text-white px-20 py-8 bg-[#192349] relative"}
      style={{ maxWidth: "25%" }}
    >
      <BoxWrapperLine />
      <div className={"font-bold text-4xl mb-4"}>{title}</div>
      <div className={"font-bold text-text-xl uppercase"}>{desc}</div>
    </div>
  );
};

export default BoxWrapper;
