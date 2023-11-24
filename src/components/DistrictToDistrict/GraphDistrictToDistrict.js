import "leaflet/dist/leaflet.css";

import seg2 from "assets/student/horoo_school.json";
import seg1 from "assets/student/horoo_student.json";
import CustomMapDistToSchool from "components/DistrictToDistrict/CustomMapDistToSchool";
import CustomMapSchoolToDist from "components/DistrictToDistrict/CustomMapSchoolToDist";
import React, { useEffect, useRef, useState } from "react";
const GraphDistrictToDistrict = ({ traffic, schoolTraffic }) => {
  const [data, setData] = useState(seg1);
  const [schoolData, setSchoolData] = useState(seg2);

  const geoJsonRef = useRef();
  const geoJsonRefBySchool = useRef();
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedFeaturesBySchool, setSelectedFeaturesBySchool] = useState([]);

  function getTitle(isSchool) {
    if (!isSchool) {
      let text = "Нийт сурагчдын байршил хороогоор";
      if (selectedFeaturesBySchool.length === 0) {
        return text;
      }
      text = "";
      selectedFeaturesBySchool.forEach((f) => {
        text += f?.properties?.name_1 + "-";
        text += f?.properties?.name_12;
      });
      text += " хороонд суралцдаг сурагчдын байршил хороогоор ";
      return text;
    } else {
      let text = "Нийт сурагчдын суралцаж буй хороод";
      if (selectedFeatures.length === 0) {
        return text;
      }
      text = "";
      selectedFeatures.forEach((f) => {
        text += f?.properties?.name_1 + "-";
        text += f?.properties?.name_12;
      });
      text += " хорооны сурагчдын суралцаж буй хороод";
      return text;
    }
  }
  return (
    <div className="w-full h-full relative">
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

              <CustomMapDistToSchool
                data={data}
                title={getTitle(false)}
                geoJsonRef={geoJsonRef}
                setFeatures={setSelectedFeatures}
                selectedFeatures={selectedFeatures}
                trafficData={traffic}
                selectedFeaturesBySchool={selectedFeaturesBySchool}
                setData={setData}
              />
            </div>
            <div className="border border-neutral-700 border-solid "></div>
            <div style={{ position: "relative", width: "50%", zIndex: 0 }}>
              <div
                className="w-full text-center text-xl font-bold text-white uppercase mb-2"
                style={{ zIndex: 1000 }}
              >
                {getTitle(true)}
              </div>
              <CustomMapSchoolToDist
                data={schoolData}
                title={getTitle(true)}
                geoJsonRef={geoJsonRefBySchool}
                setFeatures={setSelectedFeaturesBySchool}
                selectedFeatures={selectedFeaturesBySchool}
                setData={setSchoolData}
                selectedFeaturesByStudent={selectedFeatures}
                trafficData={schoolTraffic}
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
export default GraphDistrictToDistrict;
