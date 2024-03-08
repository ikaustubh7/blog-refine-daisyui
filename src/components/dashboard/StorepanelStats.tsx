import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDateRange } from '../../context/Datecontext';
import storedataWithMonthYear from '../../mockdata/storedata';
import { format, parse } from 'date-fns';
import { atom } from 'recoil';






const headtitles = [
  { title: "Online store sessions", key: "online store session" },
  { title: "Net return value", key: "net return value" },
  { title: "Total orders", key: "total orders" },
  { title: "Conversion rate", key: "conversion rate" },
  { title: "Average Order Value", key: "average order value" },
  { title: "Conversion rate", key: "conversion rate" },
  { title: "Gross sales", key: "gross sales" },
  { title: "Net return value", key: "net return value" },
  { title: "Store search conversion", key: "store search conversion" },
  { title: "Return rate", key: "return rate" },
];

const numberOfElements = 4;









function StorepanelStats() {

















  return (
    <>
    {Array.from({ length: numberOfElements }).map((_, index) => (
            <div
              key={index}
              className="w-[183px] rounded-[10px]   bg-[#F1F1F1]"
            >
              <div className="w-[124px] h-[15px] rounded-sm bg-[#D9D9D9] ml-[9px] mt-[7px] "></div>
              <div className="w-[152px] h-[20px] rounded-sm bg-[#D9D9D9] mb-[7px] mt-[5px] ml-[9px] mr-[22px]"></div>
            </div>
          ))}
    </>
  )
}

export default StorepanelStats