import React from "react";

const CustomButton = ({ text, onClick, className, active }) => {
  console.log(active);
  return (
    <button
      onClick={onClick}
      className={[
        `bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent ${
          active && " bg-[#3B82F6] text-white "
        }`,
        className,
      ].join(" ")}
    >
      {text}
    </button>
  );
};
export default CustomButton;
