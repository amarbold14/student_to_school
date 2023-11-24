import React from "react";

const TrafficTimeWrapper = ({ showTraffic, setShowTraffic, time, setTime }) => {
  const timesArray = ["08:00", "12:00", "16:00", "20:00"];
  return (
    <div
      className="absolute -bottom-4 left-1/2 -translate-x-2/4 bg-white p-4 rounded-2xl min-w-[284px] shadow-2xl"
      style={{ zIndex: 1000 }}
    >
      <div className="flex justify-between">
        <label
          htmlFor="default-range"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          {time < 10 ? "0" + time + ":00" : time + ":00"}
        </label>
        <div className="flex items-center justify-between">
          <span className="flex items-center mr-4">
            <span className="text-xs">Low</span>
            <div className={"i2eYj"}></div>
            <span className="text-xs">Severe</span>
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={showTraffic}
              onChange={(e) => {
                setShowTraffic(e.target.checked);
              }}
              className="sr-only peer"
            />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>
      <input
        id="default-range"
        type="range"
        max={22}
        min={6}
        step={1}
        onChange={(e) => {
          setTime(e?.target?.value);
        }}
        value={time}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
      <div className="flex justify-between mx-2 mt-2">
        {timesArray.map((t, index) => {
          return (
            <div
              key={t}
              className={`flex flex-col justify-center items-center w-1/4`}
            >
              <div className="w-[2px] h-4 bg-[#70757a]"></div>
              <div className="mt-2 text-xs">{t}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TrafficTimeWrapper;
