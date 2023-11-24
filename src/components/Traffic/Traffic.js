import { colors } from "constants/colors";
import React, { useEffect, useState } from "react";
import { Polyline } from "react-leaflet";

const Traffic = ({ trafficData }) => {
  return trafficData?.map((feature, index) => {
    let color = colors.low;
    switch (feature?.properties?.congestion) {
      case "low":
        color = colors.low;
        break;
      case "moderate":
        color = colors.moderate;
        break;
      case "heavy":
        color = colors.heavy;
        break;
      case "severe":
        color = colors.severe;
        break;
    }
    // if (feature?.properties?.class === "trunk") {
    //   color = "#152D53";
    // }

    return (
      <Polyline
        key={index}
        positions={feature?.geometry?.coordinates}
        pathOptions={{ weight: 1, color: color }}
      />
    );
  });
};

export default Traffic;
