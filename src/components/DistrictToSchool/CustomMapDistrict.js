import "leaflet/dist/leaflet.css";

import * as turf from "@turf/turf";
import customLocationIcon from "assets/markers/marker.png";
import district_to_school_flow from "assets/student/khoroo_to_school.json";
import LegendItems from "components/LegendItems";
import Traffic from "components/Traffic/Traffic";
import {
  getFillColor,
  globalArray,
  LegendItemsDistrictGlobal,
  LegendItemsDistrictLocal,
  localArray,
} from "constants/functions";
import L from "leaflet";
import React, { useEffect, useState } from "react";
import { GeoJSON, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
const CustomMapDistrict = ({
  geoJsonRef,
  data,
  setFeatures,
  trafficData,
  selectedFeatures,
  title,
  selectedMarkers,
  setData,
}) => {
  const [studentData, setStudentData] = useState(data.features);
  const [centers, setPolygonCenters] = useState([]);
  const [info, setInfo] = useState({
    totalStudent: 0,
    totalHouseHold: 0,
    totalHouseHoldWithoutCar: 0,
  });
  const customIcon = new L.Icon({
    iconUrl: customLocationIcon,
    iconSize: [20, 20],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
  const [showMarkerId, setShowMarkerId] = useState(null);

  useEffect(() => {
    let totalStudent = 0;
    let count_district = 0;
    let totalHouseHold = 0;
    let totalHouseHoldWithoutCar = 0;
    let tempStudentData = studentData;
    if (selectedMarkers.length === 0) {
      tempStudentData.forEach((s) => {
        let a = district_to_school_flow.filter(
          (d) => d.home_khoroo_id?.toString() === s.properties?.id?.toString()
        );
        let sumStudent = 0;
        let sumHouseHold = 0;
        let sumHouseHoldWithoutCar = 0;
        a.forEach((a1) => {
          sumStudent += +a1.student_flow;
          sumHouseHold += +a1.household_flow;
          sumHouseHoldWithoutCar += +a1.student_flow_carless;
        });
        s.properties.student_flow = sumStudent;
        totalStudent += sumStudent;
        totalHouseHold += sumHouseHold;
        totalHouseHoldWithoutCar += sumHouseHoldWithoutCar;
        count_district += 1;
      });
      setStudentData(tempStudentData);
      let tempData = data;
      tempData.features = tempStudentData;
      setData(tempData);
    } else {
      tempStudentData.forEach((s) => {
        let sumStudent = 0;
        let sumHouseHold = 0;
        let sumHouseHoldWithoutCar = 0;
        selectedMarkers.forEach((sm) => {
          let temp = district_to_school_flow.filter(
            (d) =>
              d?.school_id?.toString() === sm?.properties?.school_id?.toString()
          );
          let a = temp.filter(
            (d) => d.home_khoroo_id?.toString() === s.properties?.id?.toString()
          );
          a.forEach((a1) => {
            sumStudent += +a1.student_flow;
            sumHouseHold += +a1.household_flow;
            sumHouseHoldWithoutCar += +a1.student_flow_carless;
          });
        });
        s.properties.student_flow = sumStudent;
        s.properties.household_flow = sumHouseHold;
        s.properties.student_flow_carless = sumHouseHoldWithoutCar;
        totalStudent += sumStudent;
        totalHouseHold += sumHouseHold;
        totalHouseHoldWithoutCar += sumHouseHoldWithoutCar;
        count_district += 1;
      });

      setStudentData(tempStudentData);
      let tempData = data;
      tempData.features = tempStudentData;
      setData(tempData);
    }
    setInfo({
      ...info,
      totalStudent: totalStudent,
      totalHouseHold: totalHouseHold,
      totalHouseHoldWithoutCar: totalHouseHoldWithoutCar,
    });
  }, [selectedMarkers]);
  const setStyle = ({ properties }) => {
    let percent = (properties.student_flow / info.totalStudent) * 100;
    let per_arr = globalArray;
    if (selectedMarkers.length > 0) {
      per_arr = localArray;
    }
    let t = getFillColor(per_arr, percent);
    let temp = selectedFeatures.find(
      (f) => f?.properties?.id === properties.id
    );
    if (temp) {
      return {
        weight: 1.5,
        color: "red",
        dashArray: "2 3",
        fillOpacity: 0,
        opacity: 1,
      };
    }
    return {
      fillColor: t[0],
      weight: 0.3,
      color: "#4c1d95",
      dashArray: "1 0",
      fillOpacity: 0.7,
      opacity: 1,
    };
  };
  useEffect(() => {
    if (studentData) {
      const t = studentData?.map((feature) => {
        if (feature) {
          let polygonCenter = turf.center(feature);
          return {
            center: [
              polygonCenter?.geometry?.coordinates[1],
              polygonCenter?.geometry?.coordinates[0],
            ],
            properties: feature?.properties,
          };
        }
      });
      setPolygonCenters(t);
    }
  }, [studentData]);

  function handleFeatureClick(e) {
    if (!geoJsonRef.current) return;
    const layer = e.target;
    let temp = selectedFeatures;
    let feature = layer?.feature;
    let found = temp.find((f) => f?.properties?.id === feature?.properties?.id);
    if (found) {
      temp.pop(feature);
    } else {
      temp.push(feature);
    }
    setFeatures([...temp]);
  }

  function handleMouseEnter(e) {
    const layer = e.target;
    setShowMarkerId(layer?.feature?.properties?.id);
  }

  function onEachFeature(feature, layer) {
    layer.on({
      click: handleFeatureClick,
      mouseover: handleMouseEnter,
    });
  }

  return (
    <div className="relative w-full h-full">
      <div
        className={
          "absolute top-0 right-0 py-2 px-6 bg-white opacity-80 shadow-2xl"
        }
        style={{ zIndex: 1000 }}
      >
        <div>Сурагчдын тоо хувиар</div>
        <div className={"flex justify-center mt-2"}>
          <div>
            <LegendItems
              data={
                selectedMarkers.length > 0
                  ? LegendItemsDistrictLocal
                  : LegendItemsDistrictGlobal
              }
            />
          </div>
        </div>
      </div>
      <div
        className="absolute top-4 left-1/2 -translate-x-1/2 p-4 bg-white rounded-2xl shadow-lg text-md text-black font-medium"
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
        {data && data?.features?.length > 0 && (
          <GeoJSON
            ref={geoJsonRef}
            data={data}
            style={setStyle}
            onEachFeature={onEachFeature}
          />
        )}

        {centers?.map((center, index) => {
          let p = center?.properties;
          let found = selectedFeatures.find((f) => f.properties.id === p.id);
          if (p.id === showMarkerId || found)
            return (
              <Marker
                key={index + "marker"}
                position={center?.center}
                icon={customIcon}
                eventHandlers={{
                  mouseover: (event) => event.target.openPopup(),
                }}
              >
                <Popup>
                  <div className="text-xs font-normal grid  gap-1 ">
                    <div
                      className={
                        "flex items-center justify-center text-sm font-medium"
                      }
                    >
                      {p.name_1 + ", " + p.name_12 + " хороо "}
                    </div>
                    <div className="flex justify-between">
                      <span>Өрхийн тоо: </span>
                      <span className={"ml-4"}>{p.household_flow || 0}</span>
                    </div>
                    <div>
                      <span>Автомашинтай өрхийн тоо:</span>
                      <span className={"ml-4"}>{p.household_flow || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Сурагчдын тоо:</span>
                      <span className={"ml-4"}>{p.student_flow || 0}</span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
        })}
        {trafficData && <Traffic trafficData={trafficData} />}
      </MapContainer>
    </div>
  );
};

export default CustomMapDistrict;
