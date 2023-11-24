import "leaflet/dist/leaflet.css";

import seg1 from "assets/student/horoo_student.json";
import seg2 from "assets/student/schools_2023.json";
import CustomMapDistrict from "components/DistrictToSchool/CustomMapDistrict";
import CustomMapSchool from "components/DistrictToSchool/CustomMapSchool";
import React, { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
const GraphDistrictToSchool = ({ traffic, schoolTraffic }) => {
  const [data, setData] = useState(seg1);
  const [schoolData, setSchoolData] = useState(seg2);
  const geoJsonRef = useRef();
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedMarkers, setSelectedMarkers] = useState([]);

  function getTitle(isSchool) {
    if (!isSchool) {
      let text = "Нийт сурагчдын байршил хороогоор";
      if (selectedMarkers.length === 0) {
        return text;
      }
      text = "";
      selectedMarkers.forEach((f) => {
        text += f?.properties?.School_name?.replace("сургууль", "") + ", ";
      });
      text += " сургуулийн сурагчдын байршил хороогоор ";
      return text;
    } else {
      let text = "Сургууль бүрийн байршил болон сурагчдын тоо";
      if (selectedFeatures.length === 0) {
        return text;
      }
      text = "";
      selectedFeatures.forEach((f) => {
        text += f?.properties?.name_1 + "-";
        text += f?.properties?.name_12 + ", ";
      });
      text += " хорооны сурагчдын сургуулиудын байршил болон сурагчдын тоо ";
      return text;
    }
  }
  Modal.setAppElement("#root");
  return (
    <div className="w-full, h-full">
      {data ? (
        <div className="w-full, h-full">
          <div className="w-full, h-full flex z-0">
            <div
              style={{
                position: "relative",
                width: "50%",
                zIndex: 0,
              }}
            >
              <div
                className="w-full text-center text-xl font-bold text-white uppercase mb-2"
                style={{ zIndex: 1000 }}
              >
                {getTitle(false)}
              </div>
              <CustomMapDistrict
                data={data}
                setData={setData}
                title={getTitle(false)}
                geoJsonRef={geoJsonRef}
                setFeatures={setSelectedFeatures}
                selectedFeatures={selectedFeatures}
                isGlobal={selectedMarkers.length === 0}
                trafficData={traffic}
                selectedMarkers={selectedMarkers}
              />
            </div>
            <div className="border border-neutral-700 border-solid " />
            <div style={{ position: "relative", width: "50%", zIndex: 0 }}>
              <div
                className="w-full text-center text-xl font-bold text-white uppercase mb-2"
                style={{ zIndex: 1000 }}
              >
                {getTitle(true)}
              </div>
              <CustomMapSchool
                data={schoolData}
                title={getTitle(true)}
                setMarkers={setSelectedMarkers}
                selectedFeatures={selectedFeatures}
                trafficData={schoolTraffic}
                selectedMarkers={selectedMarkers}
                setData={setSchoolData}
              />
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default GraphDistrictToSchool;
