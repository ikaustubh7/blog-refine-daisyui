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
  ReferenceLine
} from "recharts";
import { useDateRange } from "../../context/Datecontext";
import storedataWithMonthYear from "../../mockdata/storedata";
import { addDays, addYears, format, parse } from "date-fns";
import { atom, selector, useRecoilState, useRecoilValue } from "recoil";
import { sortedDataForChartState } from "../../context/storeDataState";
import { useEffect } from "react";
import { DateRange } from "react-day-picker";
import { oldsortedDataForChartState } from "../../context/storeDataState";
import { useMemo, useState } from "react";
import { clickedCurrent } from "./StorepanelStats";
import { headtitleState } from "./StorepanelStats";
import { storedataType } from "../../interfaces";
import Arrowicon from "../../ui/Arrowicon";
import Upperline from "../../ui/Upperline";
import Lowerline from "../../ui/Lowerline";


interface oldDateRange {
  type: DateRange | undefined;
}

interface CustomLegendProps {
  currentRange: string;
  previousRange: string;
}

type VisibilityKey = "uv1" | "pv1" | "uv2" | "pv2";

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

const ResponsiveLineChart = () => {
  const { dateRange } = useDateRange();
  const [sortedDataForChart, setSortedDataForChart] = useRecoilState(
    sortedDataForChartState
  );
  const [oldDataForChartState, setOldDataForChart] = useRecoilState(
    oldsortedDataForChartState
  );

  function getPreviousYearDateRange(date: DateRange | undefined) {
    const startDate: Date | undefined = date?.from;
    const endDate: Date | undefined = date?.to;

    const oldStartDate: Date | undefined = startDate
      ? addYears(startDate, -1)
      : undefined;
    const oldEndDate: Date | undefined = endDate
      ? addYears(endDate, -1)
      : undefined;

    return { from: oldStartDate, to: oldEndDate };
  }

  const oldPrevDateRange = getPreviousYearDateRange(dateRange);
  const oldDateRange = useMemo(
    () => getPreviousYearDateRange(dateRange),
    [dateRange]
  );

  useEffect(() => {
    const fetchData = async () => {
      function convertdate(date: string) {
        const formdate = parse(date, "dd/MM/yyyy", new Date());

        return format(formdate, "dd-MM-yyyy");
      }
      const formattedFromDate = convertdate(
        dateRange?.from?.toLocaleDateString("en-GB") ?? ""
      );
      const formattedToDate = convertdate(
        dateRange?.to?.toLocaleDateString("en-GB") ?? ""
      );

      const filteredData:storedataType   = storedataWithMonthYear.filter((item) => {
        const convertToDate = (dateString: string) => {
          const parts = dateString.split("-");
          return new Date(
            Number(parts[2]),
            Number(parts[1]) - 1,
            Number(parts[0])
          );
        };
        const itemDate = convertToDate(item.date);
        return (
          itemDate >= convertToDate(formattedFromDate) &&
          itemDate <= convertToDate(formattedToDate)
        );
      });

      setSortedDataForChart(filteredData);
    };

    fetchData();
  }, [dateRange, setSortedDataForChart]);

  useEffect(() => {
    const fetchOldData = async () => {
      // Your data fetching logic for the old date range

      function convertdate(date: string) {
        const formdate = parse(date, "dd/MM/yyyy", new Date());

        return format(formdate, "dd-MM-yyyy");
      }
      const formattedFromDate = convertdate(
        oldDateRange?.from?.toLocaleDateString("en-GB") ?? ""
      );
      const formattedToDate = convertdate(
        oldDateRange?.to?.toLocaleDateString("en-GB") ?? ""
      );

      const filteredData = storedataWithMonthYear.filter((item) => {
        const convertToDate = (dateString: string) => {
          const parts = dateString.split("-");
          return new Date(
            Number(parts[2]),
            Number(parts[1]) - 1,
            Number(parts[0])
          );
        };
        const itemDate = convertToDate(item.date);
        return (
          itemDate >= convertToDate(formattedFromDate) &&
          itemDate <= convertToDate(formattedToDate)
        );
      });

      setOldDataForChart(filteredData);
    };
    if (oldDateRange) {
      fetchOldData();
    }
  }, [oldDateRange]);

  function getrangevalue(date: DateRange | undefined) {
    if (!date?.from || !date?.to) return ""; // Add this line to guard against undefined dates

    const startDate: Date = date.from;
    const endDate: Date = date.to;
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const formattedStartDate = `${
      months[startDate.getMonth()]
    } ${startDate.getDate()}, ${startDate.getFullYear()}`;
    const formattedEndDate = `${
      months[endDate.getMonth()]
    } ${endDate.getDate()}, ${endDate.getFullYear()}`;

    const formattedDateRange = `${formattedStartDate} - ${formattedEndDate}`;
    return formattedDateRange;
  }

  const value = {
    currentRange: getrangevalue(dateRange),
    previousRange: getrangevalue(oldDateRange),
  };

  const current = useRecoilValue(clickedCurrent);
  const title = headtitles[current].key;
  console.log("current", current);
  console.log(title);

  const combinedData = sortedDataForChart?.map((item, index) => {
    const oldItem = oldDataForChartState[index];
    return {
      [value.currentRange]: item[title as keyof typeof item ], // Assuming 'title' is a valid property of items in sortedDataForChart
      pv1: item["monthYear"], // Access 'monthYear' property from the current item
      [value.previousRange]: oldItem ? oldItem[title as keyof typeof oldItem] : "", // Safely access 'title' from the old data, default to empty string if not found
      pv2: oldItem ? oldItem["monthYear"] : "", // Safely access 'monthYear' from the old data, default to empty string if not found
    };
  });

  console.log("combineddate", combinedData);
  console.log(oldDateRange);


  function subtractYear(dateStr:string ) {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [month, year] = dateStr.split(' ');
  
    // Get the index of the month for calculations
    const monthIndex = months.indexOf(month);
  
    // Subtract one year
    const newYear = parseInt(year, 10) - 1;
  
    // Calculate new month (handle December wraparound)
    const newMonthIndex = (monthIndex - 1 + 12) % 12;  
  
    // Construct the new date string
    const newDateStr = `${months[newMonthIndex]} ${newYear}`;
    return newDateStr;
  }

  const divStyle = {
    width: '180px',
    height: '62px',
    marginTop: '23px',
    marginLeft: '17px',
    padding: '5px',
    borderRadius: '10px',
    backgroundColor: 'white',
    
    opacity:1

   
  };

  
  const CustomTooltip = ({ active, payload, label }: { active: boolean, payload: any[], label: string  }) => {
    if (active && payload && payload.length) {

          const change =((payload[0].value-payload[1].value)/(payload[1].value)*100).toFixed(0).concat('%')          


      return (
        <div    style={divStyle} className="flex-col shadow-md  h-[62px]  "  >
          <div className="flex space-x-[10px] w-[170px] h-[25px]
px-[10px] py-[5x]
border-radius: 2px  items-center

  ">


            <span className=""  ><Upperline/></span>
            
                  <span  className="w-[48px] h-[12px]  font-[Inter]
text-[10px]
font-[400]
leading-[12px]
tracking-normal  
text-left
 "  > {`${label}`} </span>


        <span  className="w-[33px] h-[12px]  font-[Inter]
text-[10px] font-[500]
leading-[12px]
tracking-normal
text-left
   " >   {`${payload[0].value}`}      </span>            
            
            
            
              <span className="w-[29px]
h-[15px]
flex flex-row 
"   > 

<span className="  w-[12px]
h-[10px] mt-[2.5px] mb-[2.5px]
 "  > <Arrowicon/>  </span>

 <span  className=" w-[15px]
h-[15px]  font-[Inter]
text-[10px]
font-[400]
leading-[15px]
tracking-normal text-left  text-[#616161]

 " >  {change}    
   </span>
 
 
 
   </span>  
            
            
            
             </div>



          <div className="  w-[129px]
h-[22px] py-[5px] px-[10px]
space-x-[10px]  items-center flex flex-row
       "> 
             <span> <Lowerline/> </span>
              <span className="w-[48px]
h-[12px]   font-[Inter]
text-[10px]
font-[400]
leading-[12px] tracking-normal text-left 


"   >  {`${subtractYear(label)}`}  </span>


              <span  className="w-[31px]
h-[12px]  font-[Inter]
text-[10px]
font-[500]
leading-[12px] tracking-normal text-left

   "  >    {`${payload[1].value}   `}    </span>
       
       
           </div>
          
        </div>
      );
    }
  
    return null;
  };
  


  if (combinedData == undefined || combinedData.length==0) {
    return <div>No data found for the selected date range.</div>;
  }



  const spanStyle = {
    width: '149px',
    height: '12px',
    backgroundColor: '#F6F6F7',
    fontFamily: 'Inter',
    fontSize: '10px',
    fontWeight: 400,
    lineHeight: '12px',
    letterSpacing: 'normal',
    color: '#70707A',
  };


  
  

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={780}
        height={150}
        data={combinedData}
        margin={{
          top: 5,
          right: 15,
          left: -15,
          bottom: 5,
        }}
      >
        
        <XAxis dataKey="pv1"  axisLine={false}  tickLine={false}  />
        <YAxis  hide={false} 
            tickLine={false}
        axisLine={false}
        tickFormatter={(value) =>{
          
            if (value >1000){
             return `${value / 1000}K` ;
            }
           else{
           return `${value}`
           }
        
        
         } }
        
        
        />
        <Tooltip cursor={{ stroke: "grey", strokeWidth: 1 }}  content={<CustomTooltip
        active={true} payload={[]} label="Your Label"  
        
        />}   />

        <Legend
          verticalAlign="bottom"
          align="right"
          iconSize={10}
          iconType="plainline"
          formatter={(value, entry) => {


            return (

               <span
              style={spanStyle}
                
              >
                          
          
          
                {value}
              </span>  
              
    );
  }
          
}   
          
          
        />
        <ReferenceLine y={5000}  stroke="#ECF0F1"  />
        <ReferenceLine y={10000}  stroke="#ECF0F1"  />
        <ReferenceLine y={20000}  stroke="#ECF0F1"  />
        
        <ReferenceLine y={25000}  stroke="#ECF0F1"  />
        <ReferenceLine y={50}  stroke="#ECF0F1"  />






        

        



        <Line
          type="monotone"
          dataKey={value.currentRange}
          stroke="#64b7ea"
          dot={false}
          activeDot={false}
        />
        <Line
          type="monotone"
          dataKey={value.previousRange}
          stroke="#DFF0FA"
          strokeDasharray="4  4"
          dot={false}
          activeDot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ResponsiveLineChart;
