import { Button, ButtonGroup } from "@mui/material";
import time_6 from "assets/traffic/6.json";
import time_6_school from "assets/traffic/6-school.json";
import time_7 from "assets/traffic/7.json";
import time_7_school from "assets/traffic/7-school.json";
import time_8 from "assets/traffic/8.json";
import time_8_school from "assets/traffic/8-school.json";
import time_9 from "assets/traffic/9.json";
import time_9_school from "assets/traffic/9-school.json";
import time_10 from "assets/traffic/10.json";
import time_10_school from "assets/traffic/10-school.json";
import time_11 from "assets/traffic/11.json";
import time_11_school from "assets/traffic/11-school.json";
import time_12 from "assets/traffic/12.json";
import time_12_school from "assets/traffic/12-school.json";
import time_13 from "assets/traffic/13.json";
import time_13_school from "assets/traffic/13-school.json";
import time_14 from "assets/traffic/14.json";
import time_14_school from "assets/traffic/14-school.json";
import time_15 from "assets/traffic/15.json";
import time_15_school from "assets/traffic/15-school.json";
import time_16 from "assets/traffic/16.json";
import time_16_school from "assets/traffic/16-school.json";
import time_17 from "assets/traffic/17.json";
import time_17_school from "assets/traffic/17-school.json";
import time_18 from "assets/traffic/18.json";
import time_18_school from "assets/traffic/18-school.json";
import time_19 from "assets/traffic/19.json";
import time_19_school from "assets/traffic/19-school.json";
import time_20 from "assets/traffic/20.json";
import time_20_school from "assets/traffic/20-school.json";
import time_21 from "assets/traffic/21.json";
import time_21_school from "assets/traffic/21-school.json";
import time_22 from "assets/traffic/22.json";
import time_22_school from "assets/traffic/22-school.json";
import TrafficLineChartNonSchool from "components/Charts/TrafficLineChartNonSchool";
import TrafficLineChartSchool from "components/Charts/TrafficLineChartSchool";
import GraphDistrictToDistrict from "components/DistrictToDistrict/GraphDistrictToDistrict";
import GraphDistrictToSchool from "components/DistrictToSchool/GraphDistrictToSchool";
import BoxWrapper from "components/Toast/BoxWrapper";
import TrafficTimeWrapper from "components/Traffic/TrafficTimeWrapper";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [totalInfo, setTotalInfo] = useState({
    totalSchool: 0,
    percent: 0,
    avgDistance: 0,
  });
  const [time, setTime] = useState(18);
  const [activeButton, setActiveButton] = useState(0);
  const [traffic, setTraffic] = useState(time_18);
  const [trafficSchoolDay, setTrafficSchoolDay] = useState(time_18);
  useEffect(() => {
    switch (time) {
      case "6":
        setTraffic(time_6);
        setTrafficSchoolDay(time_6_school);
        break;
      case "7":
        setTraffic(time_7);
        setTrafficSchoolDay(time_7_school);
        break;
      case "8":
        setTraffic(time_8);
        setTrafficSchoolDay(time_8_school);
        break;
      case "9":
        setTraffic(time_9);
        setTrafficSchoolDay(time_9_school);
        break;
      case "10":
        setTraffic(time_10);
        setTrafficSchoolDay(time_10_school);
        break;
      case "11":
        setTraffic(time_11);
        setTrafficSchoolDay(time_11_school);
        break;
      case "12":
        setTraffic(time_12);
        setTrafficSchoolDay(time_12_school);
        break;
      case "13":
        setTraffic(time_13);
        setTrafficSchoolDay(time_13_school);
        break;
      case "14":
        setTraffic(time_14);
        setTrafficSchoolDay(time_14_school);
        break;
      case "15":
        setTraffic(time_15);
        setTrafficSchoolDay(time_15_school);
        break;
      case "16":
        setTraffic(time_16);
        setTrafficSchoolDay(time_16_school);
        break;
      case "17":
        setTraffic(time_17);
        setTrafficSchoolDay(time_17_school);
        break;
      case "18":
        setTraffic(time_18);
        setTrafficSchoolDay(time_18_school);
        break;
      case "19":
        setTraffic(time_19);
        setTrafficSchoolDay(time_19_school);
        break;
      case "20":
        setTraffic(time_20);
        setTrafficSchoolDay(time_20_school);
        break;
      case "21":
        setTraffic(time_21);
        setTrafficSchoolDay(time_21_school);
        break;
      case "22":
        setTraffic(time_22);
        setTrafficSchoolDay(time_22_school);
        break;
    }
  }, [time]);
  const [showTraffic, setShowTraffic] = useState(false);
  return (
    <div className={"overflow-y-scroll bg-[#152D53] px-20 py-20 h-screen"}>
      <div className="text-center text-white text-3xl">
        Улаанбаатар хотын түгжрэл, түүнд нөлөөлж буй хүчин зүйлс
      </div>
      <div className={"flex justify-between mt-20 mb-16"}>
        <BoxWrapper
          title={totalInfo.totalSchool}
          desc={"Нийт нийслэлийн хүрээн дэх ебс-н тоо"}
        />
        <BoxWrapper
          title={totalInfo.percent + " %"}
          desc={"Нийт сурагчдын харьяаллын дагуу суралцаж буй эзлэх хувь"}
        />
        <BoxWrapper
          title={totalInfo.avgDistance + " км"}
          desc={"Сурагчдын дунджаар туулдаг сургууль руу хүрэх замын урт"}
        />
      </div>
      <ButtonGroup className="flex justify-center mb-4">
        <Button
          variant={activeButton === 0 ? "outlined" : "contained"}
          size="large"
          color="primary"
          className={activeButton === 0 ? "bg-white" : ""}
          onClick={() => setActiveButton(0)}
        >
          Хороо хооронд
        </Button>
        <Button
          variant={activeButton === 1 ? "outlined" : "contained"}
          size="large"
          color="primary"
          className={activeButton === 1 ? "bg-white" : ""}
          onClick={() => setActiveButton(1)}
        >
          Хороо сургууль хооронд
        </Button>
        <Button
          variant={activeButton === 2 ? "outlined" : "contained"}
          size="large"
          color="primary"
          className={activeButton === 2 ? "bg-white" : ""}
          onClick={() => setActiveButton(2)}
        >
          Сурагч сургууль хооронд
        </Button>
      </ButtonGroup>
      <div className={"h-2/3 w-full relative"}>
        {activeButton === 0 ? (
          <GraphDistrictToDistrict
            traffic={showTraffic ? traffic : []}
            schoolTraffic={showTraffic ? trafficSchoolDay : []}
          />
        ) : activeButton === 1 ? (
          <GraphDistrictToSchool
            traffic={showTraffic ? traffic : []}
            schoolTraffic={showTraffic ? trafficSchoolDay : []}
          />
        ) : (
            <div className={"flex justify-center"}>
              <iframe src="https://kepler.gl/demo/map?mapUrl=https://dl.dropboxusercontent.com/scl/fi/2e7dbgobyn3gibk22lius/keplergl_6hbhj3.json?rlkey=r6s43yd0qjims7szry2fc80nt&dl=0" title="Graph" name="myiFrame" height="600px" width="1800px" allowFullScreen></iframe>
            </div>
        )}

      <div>
        { activeButton === 2 ? (''
        ) : (<TrafficTimeWrapper
          time={time}
          setTime={setTime}
          setShowTraffic={setShowTraffic}
          showTraffic={showTraffic}
        />)
        }
      </div>

      </div>

      <div className={"mt-16"}>
        <div className="text-white font-bold text-xl">
          Нийт болон дундаж түгжрэл
        </div>
        <TrafficLineChartSchool />
        <TrafficLineChartNonSchool />
      </div>
    </div>

  );
};

export default Home;
