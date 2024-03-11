import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useDateRange } from "../../context/Datecontext";
import storedataWithMonthYear from "../../mockdata/storedata";
import { format, parse } from "date-fns";
import { sortedDataForChartState } from "../../context/storeDataState";
import { useRecoilValue, atom, selector, useRecoilState } from "recoil";
import Trendicon from "../../ui/Trendicon";
import PenIcon from "../../ui/PenIcon";
import PopMenu from "./PopMenu";
import { useState, useCallback } from "react";
import { storedataType } from "../../interfaces";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../ui/hover-card";

const headtitles = [
  { id: 0, title: "Online store sessions", key: "online store session" },
  { id: 1, title: "Net return value", key: "net return value" },
  { id: 2, title: "Total orders", key: "total orders" },
  { id: 3, title: "Conversion rate", key: "conversion rate" },
  { id: 4, title: "Average Order Value", key: "average order value" },
  { id: 5, title: "Gross sales", key: "gross sales" },
  { id: 6, title: "Store search conversion", key: "store search conversion" },
  { id: 7, title: "Return rate", key: "return rate" },
];

const numberOfElements = 4;

let totalIds = [0, 1, 2, 3, 4, 5, 6, 7];
let currentIds = [0, 1, 2, 3];

export const currentidState = atom({
  key: "currentidState",
  default: currentIds,
});

export const residueidState = selector({
  key: "residueidState",
  get: ({ get }) => {
    const current = get(currentidState);
    let residueIds = totalIds.filter((id) => !current.includes(id));
    if (residueIds.length < 6 && current.length > 3) {
      residueIds = [...new Set([...residueIds, current[1], current[3]])];
    }
    return residueIds;
  },
});

export const headtitleState = atom({
  key: "headtitles",
  default: headtitles,
});

export const clickedCurrent = atom({
  key: "clickedcurrent",
  default: 0,
});

type SortedDataForChart = storedataType & {
  [key: string]: number | string;
};

function StorepanelStats() {
  const [hoverindex, setHoverindex] = useState<number | null>(null);
  const [currentid, setCurrentid] = useRecoilState(currentidState);
  const [clickedtopic, setClickedtopic] = useRecoilState(clickedCurrent);

  const residueIds = useRecoilValue(residueidState);
  console.log("residueids are---", residueIds);

  const sortedDataForChart = useRecoilValue(
    sortedDataForChartState
  ) as SortedDataForChart;
  //console.log(sortedDataForChart)
  let propsvalue: {
    id: number;
    title: string;
    firstday: number;
    value: number;
    percentagechange: number;
  }[] = [];

  if (sortedDataForChart !== undefined) {
    for (const item in headtitles) {
      const id = headtitles[item].id;
      const title = headtitles[item].title;
      const key = headtitles[item].key as keyof (typeof sortedDataForChart)[0];

      const firstday = Number(sortedDataForChart[0][key]);
      const lastday = Number(
        sortedDataForChart[sortedDataForChart.length - 1][key]
      );
      const value = sortedDataForChart[sortedDataForChart.length - 1][key];
      const change = lastday - firstday;
      const percentagechange = Math.round((change / firstday) * 100);
      console.log("key is", key);

      console.log(percentagechange);
      console.log(title);
      console.log("firstday is ", firstday);

      let titlearray: {
        id: number;
        title: string;
        firstday: number;
        value: number;
        percentagechange: number;
      } = {
        id: id,
        title: title,
        firstday: firstday,
        value: Number(value),
        percentagechange: percentagechange,
      };

      titlearray["id"] = id;
      titlearray["title"] = title;
      titlearray["firstday"] = firstday;
      titlearray["value"] = Number(value);
      titlearray["percentagechange"] = percentagechange;
      propsvalue.push(titlearray);
    }
    //return propsvalue;
  }

  console.log("propsvalue", propsvalue);
  console.log("current id--", currentid);

  const handleMouseOver = useCallback((current: number) => {
    setHoverindex(current);
  }, []); // Dependencies array is empty, meaning this function is created once

  // Using useCallback to memoize the onMouseLeave handler
  const handleMouseLeave = useCallback(() => {
    setHoverindex(null);
  }, []); // Dependencies array is empty, meaning this function is created once

  // Using useCallback to memoize the onDoubleClick handler
  const handleClick = useCallback((current: number) => {
    setClickedtopic(current);
  }, []); // Dependencies array is empty, meaning this function is created once

  if (propsvalue.length == 0) {
    return <div>Loading data ...</div>;
  }

  return (
    <>
      {currentid.map((current, index) => (
        <div
          key={index}
          className={`w-[183px] rounded-[10px] h-[60px]   hover:bg-[#F1F1F1]  ${
            current === clickedtopic ? "bg-[#F1F1F1]" : ""
          }  `}
          onMouseOver={() => handleMouseOver(current)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleClick(current)}
        >
          <div className="flex justify-between   w-[163px]  rounded-sm  ml-[10px] mr-[10px] mt-[5px] h-[23px] ">
            <span className="text-[12px] font-[Inter] text-[#303030] font-[500] leading-[14.52px]   ">
              <HoverCard>
                <HoverCardTrigger>
                  <span className="underline  decoration-dashed decoration-from-font decoration-[#CCCCCC] underline-offset-2 "  >  {propsvalue[current].title}   </span>
                  
                </HoverCardTrigger>
                <HoverCardContent   className=" w-[356px]  h-[76px]"   >
                  <div
                    className="flex flex-col px-[10px] rounded-[10px]  space-y-[10px] "
                  >
                    <span> {propsvalue[current].title} </span>
                    <span  className="" >
                      
                      Your online store's traffic volume shown in sessions.
                    </span>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </span>

            <span
              className=
              
              {`${ current === hoverindex ? "visible hover:bg-[#cac9c7]" : "invisible"  } w-[23px] h-[23px] `}
            >
              <PopMenu selectid={current} />
            </span>
          </div>
          <div className="flex    w-[152px] h-[20px] rounded-sm bg-[F1F1F1] mb-[5px] mt-[5px] ml-[10px] ">
            <span className="font-semibold text-[15px] leading-[21.98px] font-[Inter]">
              {[1, 4, 5].includes(current)
                ? `$${propsvalue[current].value}`
                : propsvalue[current].value}
            </span>

            <span className="flex font-[Inter]  font-normal text-[10px] leading-[14.65px] items-center place-self-center ml-[5px] ">
              <Trendicon
                value={propsvalue[current].percentagechange < 0 ? false : true}
              />
              {Math.abs(propsvalue[current].percentagechange)} %
            </span>
          </div>
        </div>
      ))}
    </>
  );
}

export default StorepanelStats;
