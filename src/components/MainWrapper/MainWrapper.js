import Toast from "components/Toast";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { renderRoutes } from "react-router-config";

import { mainSelectors } from "#redux/mainSlice/slice";

const MainWrapper = ({ route: { routes }, location }) => {
  const dispatch = useDispatch();
  const [modalIsOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false);
  };
  const handleMenu = () => {
    setIsOpen(!modalIsOpen);
  };
  const { filterModalIsOpen } = useSelector(mainSelectors.getMain);
  return (
    <div className="h-screen bg-gray-50 overflow-y-hidden">
      {renderRoutes(routes)}
      <Toast />
    </div>
  );
};

export default MainWrapper;
