import React from "react";

const BoxWrapperLine = () => {
  return (
    <div className={"absolute w-full h-full top-0 left-0"}>
      <div
        className={
          "absolute left-0 top-0 border-0 border-l-2 border-t-2 border-solid border-[#FFC800] h-4 w-4"
        }
      />
      <div
        className={
          "absolute left-0 bottom-0 border-0 border-l-2 border-b-2 border-solid border-[#FFC800] h-4 w-4"
        }
      />
      <div
        className={
          "absolute right-0 top-0 border-0 border-r-2 border-t-2 border-solid border-[#FFC800] h-4 w-4"
        }
      />
      <div
        className={
          "absolute right-0 bottom-0 border-0 border-r-2 border-b-2 border-solid border-[#FFC800] h-4 w-4"
        }
      />
    </div>
  );
};
export default BoxWrapperLine;
