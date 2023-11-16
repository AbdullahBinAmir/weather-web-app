import { useEffect, useState } from "react";

import LargeCard from "./LargeCard";
import SmallCard from "./SmallCard";
import React from "react";

const MainContent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=chakwal&appid=apikey`)
      .then(res => res.json())
      .then(result => {
        setData(result)
        console.log('result',result);
      }).catch((e)=>{
        console.log('weather api error',e)
      })
  }, [])

  return (
    <div className="text-gray-150 p-10 flex-grow">

      <div className=" w-full justify-center">
        <SmallCard
          dayTitle="Today's Weather"
          img="Shower"
          max={Math.floor(data?.main?.temp_max - 273)}
          min={Math.floor(data?.main?.temp_min - 273)}
          temp={"C"}
        />
        {/* <SmallCard
          dayTitle="Sun, 7 Jun"
          img="Clear"
          max={27}
          min={18}
          temp={temp}
        /> */}
      </div>

      <div className="my-10">
        <h3 className="text-2xl font-bold mb-5">Today's Highlights</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 justify-center">
          <LargeCard title="Wind Status" num={data?.wind?.speed} desc="mph">
            <div className="flex justify-between space-x-5 items-center">
              <div className="bg-gray-500 rounded-full w-[30px] h-[30px] flex justify-center items-center">
                <i className="fas fa-location-arrow"></i>
              </div>
              <p className="text-gray-150 text-sm">WSW</p>
            </div>
          </LargeCard>

          <LargeCard title="Humidity" num={data?.main?.humidity} desc="%">
            <div className="self-stretch text-gray-250 text-xs space-y-1">
              <div className="flex justify-between space-x-5 items-center px-1">
                <p>0</p>
                <p>50</p>
                <p>100</p>
              </div>
              <div className="w-full h-2 bg-gray-150 rounded-full overflow-hidden">
                <div
                  className="bg-[#FFEC65] h-2"
                  style={{ width: `${data?.main?.humidity}%` }}
                ></div>
              </div>
              <p className="text-right">%</p>
            </div>
          </LargeCard>

          <LargeCard title="Visibility" num={data?.visibility / 100} desc=" miles" />

          <LargeCard title="Air Pressure" num={data?.main?.pressure} desc=" mb" />
        </div>
      </div>
    </div>
  );
};

export default MainContent;

