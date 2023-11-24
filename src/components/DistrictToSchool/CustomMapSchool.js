import "leaflet/dist/leaflet.css";

import customLocationIcon from "assets/markers/private-school.png";
import PrivateSchoolIcon from "assets/markers/private-school.png";
import customLocationIcon2 from "assets/markers/public-school.png";
import PublicSchoolIcon from "assets/markers/public-school.png";
import district_to_school_flow from "assets/student/khoroo_to_school.json";
import DistrictToSchoolLineChart from "components/Charts/DistrictToSchoolLineChart";
import Traffic from "components/Traffic/Traffic";
import { customStyles } from "constants/functions";
import L from "leaflet";
import React, { useEffect, useState } from "react";
import {
  Circle,
  GeoJSON,
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import Modal from "react-modal";

const CustomMapSchool = ({
  data,
  setMarkers,
  trafficData,
  selectedFeatures,
  selectedMarkers,
  title,
  setData,
}) => {
  const [info, setInfo] = useState({
    totalStudent: 0,
    school_count: 0,
    maxStudent: 0,
    privateSchoolCount: 0,
    publicSchoolCount: 0,
  });
  const [schoolData, setSchoolData] = useState(data?.features);
  const [modalIsOpen, setModalOpen] = useState(false);
  const onClickMarker = (feature) => {
    let tempMarkers = selectedMarkers;
    let found = selectedMarkers.find(
      (s) => s.properties?.school_id === feature?.properties?.school_id
    );
    if (found) {
      tempMarkers.pop(feature);
    } else {
      tempMarkers.push(feature);
    }
    setMarkers([...tempMarkers]);
  };
  useEffect(() => {
    let total = 0;
    let maxStudent = 0;
    let count = 0;
    let privateC = 0;
    let publicC = 0;
    let tempSchoolData = schoolData;
    if (selectedFeatures?.length === 0) {
      tempSchoolData.forEach((s) => {
        let a = district_to_school_flow.filter(
          (d) => d.school_id?.toString() === s.properties?.school_id?.toString()
        );
        let sum = 0;
        a.forEach((a1) => {
          sum += +a1.student_flow;
        });
        s.properties.student_flow = sum;
        total += sum;
        maxStudent = maxStudent < sum ? sum : maxStudent;
        if (sum > 0) {
          if (s.properties?.school_type === "Public") {
            publicC += 1;
          } else {
            privateC += 1;
          }
          count += 1;
        }
      });
      setSchoolData(tempSchoolData);
      let tempData = data;
      tempData.features = tempSchoolData;
      setData(tempData);
    } else {
      tempSchoolData.forEach((s) => {
        let sum = 0;
        selectedFeatures.forEach((f) => {
          let temp = district_to_school_flow.filter(
            (d) => d.home_khoroo_id?.toString() === f.properties?.id?.toString()
          );
          let a = temp.filter(
            (d) =>
              d.school_id?.toString() === s.properties?.school_id?.toString()
          );
          a.forEach((a1) => {
            sum += +a1.student_flow;
          });
        });
        setSchoolData(tempSchoolData);
        let tempData = data;
        tempData.features = tempSchoolData;
        setData(tempData);
        s.properties.student_flow = sum;
        total += sum;
        maxStudent = maxStudent < sum ? sum : maxStudent;
        if (sum > 0) {
          if (s.properties?.school_type === "Public") {
            publicC += 1;
          } else {
            privateC += 1;
          }
          count += 1;
        }
      });
    }
    setInfo({
      ...info,
      totalStudent: total,
      school_count: count,
      maxStudent: maxStudent,
      privateSchoolCount: privateC,
      publicSchoolCount: publicC,
    });
  }, [selectedFeatures]);
  return (
    <div className="relative w-full h-full">
      <button
        className={
          "absolute bottom-2 right-0 py-2 px-6 bg-white opacity-80 shadow-2xl"
        }
        style={{ zIndex: 1000 }}
        onClick={() => {
          setModalOpen(true);
        }}
      >
        Graph
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalOpen(false)}
        style={customStyles}
        parentSelector={() => document.querySelector("#root")}
        contentLabel="Example Modal"
      >
        <DistrictToSchoolLineChart isSchool={true} data={data} title={title} />
      </Modal>
      <div
        className={
          "absolute top-0 right-0 py-2 px-6 bg-white opacity-80 shadow-2xl"
        }
        style={{ zIndex: 401 }}
      >
        <div>
          <div
            className={
              "flex justify-between items-center h-[20px] text-sm mb-2"
            }
          >
            <img
              className={"h-[20px] w-[20px]"}
              src={PublicSchoolIcon}
              alt=""
            />
            <span className={"ml-2"}>Улсын сургууль</span>
            <span className={"ml-2"}>{info.publicSchoolCount}</span>
          </div>
          <div
            className={"flex justify-between items-center h-[20px] text-sm "}
          >
            <img
              className={"h-[20px] w-[20px]"}
              src={PrivateSchoolIcon}
              alt=""
            />
            <span className={"ml-2"}>Хувийн сургууль</span>
            <span className={"ml-2"}>{info.privateSchoolCount}</span>
          </div>
        </div>
      </div>
      <div
        className="absolute top-4 left-1/2 -translate-x-1/2 p-4 bg-white rounded-2xl shadow-lg text-md text-black font-medium text-center"
        style={{ zIndex: 1000 }}
      >
        {title}
      </div>
      <MapContainer
        style={{
          width: "100%",
          height: "100%",
        }}
        zoomControl={false}
        center={[47.919875717418904, 106.91718020011362]}
        maxBoundsViscosity={1.0}
        zoom={13}
        touchZoom={false}
        doubleClickZoom={false}
        closePopupOnClick={true}
      >
        <TileLayer url="https://cloudgis.mn/map/tile/tile.php?zoom={z}&x={x}&y={y}" />
        {schoolData?.map((feature, index) => {
          let tempCustomIcon = new L.Icon({
            iconUrl:
              feature?.properties?.school_type === "Private"
                ? customLocationIcon
                : customLocationIcon2,
            iconSize: [20, 20],
          });
          let iconSize =
            (15 * feature?.properties?.student_flow) /
            (info.totalStudent / info.school_count);
          iconSize = iconSize > 30 ? 30 : iconSize < 10 ? 10 : iconSize;
          tempCustomIcon.options.iconSize = [iconSize, iconSize];
          let min = 10;
          return (
            feature?.properties?.student_flow > min && (
              <Marker
                key={index + "marker"}
                position={[
                  feature?.geometry?.coordinates[2],
                  feature?.geometry?.coordinates[0],
                ]}
                icon={tempCustomIcon}
                eventHandlers={{
                  click: (event) => onClickMarker(feature),
                  mouseover: (event) => event.target.openPopup(),
                  mouseout: (event) => event.target.closePopup(),
                }}
              >
                <Popup>
                  <div className="text-xs font-normal grid gap-1 ">
                    <div
                      className={
                        "flex items-center justify-center text-sm font-medium text-center"
                      }
                    >
                      {feature?.properties?.School_name}
                    </div>
                    <div className="flex justify-between">
                      <span>Хаяг:</span>
                      <span>
                        {feature?.properties?.school_district}
                        {", "}
                        {feature?.properties?.school_khoroo} хороо
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cургуулийн төрөл:</span>
                      <span className={"ml-4"}>
                        {feature?.properties?.school_type === "Private"
                          ? "Хувийн"
                          : "Төрийн"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Сурагчдын тоо:</span>
                      <span className={"ml-4"}>
                        {feature?.properties?.student_flow}
                      </span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            )
          );
        })}
        {selectedMarkers.map((marker, index) => {
          console.log([
            marker?.geometry?.coordinates[2],
            marker?.geometry?.coordinates[0],
          ]);
          return (
            <Circle
              key={"marker_circle" + index}
              center={[
                marker?.geometry?.coordinates[2],
                marker?.geometry?.coordinates[0],
              ]}
              radius={100}
              fillColor="blue"
              fillOpacity={0.2}
            />
          );
        })}

        {trafficData && <Traffic trafficData={trafficData} />}
      </MapContainer>
    </div>
  );
};

export default CustomMapSchool;
