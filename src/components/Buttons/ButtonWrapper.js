import CustomButton from "components/Buttons/CustomButton";
import React from "react";

const ButtonWrapper = ({ activeButton, setActiveButton }) => {
  return (
    <div className="w-full flex p-2">
      <div className="inline-flex">
        <CustomButton
          id={0}
          active={0 === activeButton}
          text={"Сурагчдаар"}
          className={"rounded-l "}
          onClick={() => setActiveButton(0)}
        />
        <CustomButton
          id={1}
          active={1 === activeButton}
          text={"Өрхөөр"}
          onClick={() => setActiveButton(1)}
        />
        <CustomButton
          id={2}
          active={2 === activeButton}
          text={"Автомашинаар"}
          className={"rounded-r "}
          onClick={() => setActiveButton(2)}
        />
      </div>
    </div>
  );
};
export default ButtonWrapper;
