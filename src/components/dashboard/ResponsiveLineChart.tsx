import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDateRange } from '../../context/Datecontext';
import storedataWithMonthYear from '../../mockdata/storedata';
import { addDays, addYears, format, parse } from 'date-fns';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { sortedDataForChartState } from '../../context/storeDataState';
import { useEffect } from 'react';
import { DateRange } from 'react-day-picker';
import { oldsortedDataForChartState } from '../../context/storeDataState';
import { useMemo,useState } from 'react';
import { clickedCurrent } from './StorepanelStats';
import { headtitleState } from './StorepanelStats';


interface oldDateRange {
  type:DateRange|undefined;
}

interface CustomLegendProps {
  currentRange: string;
  previousRange: string;
}


type VisibilityKey = 'uv1' | 'pv1' | 'uv2' | 'pv2';


const headtitles = [
  { id: 0, title: "Online store sessions", key: "online store session" },
  { id: 1, title: "Net return value", key: "net return value" },
  { id: 2, title: "Total orders", key: "total orders" },
  { id: 3, title: "Conversion rate", key: "conversion rate" },
  { id: 4, title: "Average Order Value", key: "average order value" },
  { id: 5, title: "Gross sales", key: "gross sales" },
  { id: 6, title: "Store search conversion", key: "store search conversion" },
  { id: 7, title: "Return rate", key: "return rate" },
]


const ResponsiveLineChart = () => {


  const { dateRange } = useDateRange();
  const [sortedDataForChart, setSortedDataForChart] = useRecoilState(sortedDataForChartState);
  const [oldDataForChartState,setOldDataForChart] =useRecoilState(oldsortedDataForChartState)


  function getPreviousYearDateRange(date :DateRange |undefined ){

      const startDate :Date |undefined    = date?.from;  
      const endDate:Date |undefined =date?.to

      const oldStartDate: Date | undefined = startDate ? addYears(startDate, -1) : undefined;
    const oldEndDate: Date | undefined = endDate ? addYears(endDate, -1) : undefined;

    return { from: oldStartDate, to: oldEndDate };
}

    const  oldPrevDateRange = getPreviousYearDateRange(dateRange);
    const oldDateRange = useMemo(() => getPreviousYearDateRange(dateRange), [dateRange]);



  useEffect(() => {
    const fetchData = async () => {


      function convertdate(date: string) {
        const formdate = parse(date, 'dd/MM/yyyy', new Date());

        return format(formdate, 'dd-MM-yyyy');

      }
      const formattedFromDate = convertdate(dateRange?.from?.toLocaleDateString('en-GB') ?? '');
      const formattedToDate = convertdate(dateRange?.to?.toLocaleDateString('en-GB') ?? '');

      const filteredData = storedataWithMonthYear.filter((item) => {
        const convertToDate = (dateString: string) => {
          const parts = dateString.split('-');
          return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
        };
        const itemDate = convertToDate(item.date);
        return itemDate >= convertToDate(formattedFromDate) && itemDate <= convertToDate(formattedToDate);
      });

      setSortedDataForChart(filteredData);
    };

    fetchData();
  }, [dateRange, setSortedDataForChart]);

  useEffect(() => {
    const fetchOldData = async () => {
      // Your data fetching logic for the old date range
      
      function convertdate(date: string) {
        const formdate = parse(date, 'dd/MM/yyyy', new Date());

        return format(formdate, 'dd-MM-yyyy');

      }
      const formattedFromDate = convertdate(oldDateRange?.from?.toLocaleDateString('en-GB') ?? '');
      const formattedToDate = convertdate(oldDateRange?.to?.toLocaleDateString('en-GB') ?? '');

      const filteredData = storedataWithMonthYear.filter((item) => {
        const convertToDate = (dateString: string) => {
          const parts = dateString.split('-');
          return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0]));
        };
        const itemDate = convertToDate(item.date);
        return itemDate >= convertToDate(formattedFromDate) && itemDate <= convertToDate(formattedToDate);
      });

      setOldDataForChart(filteredData);
    };     
    if (oldDateRange) {
      fetchOldData();
    }
  }, [oldDateRange]);
   
  function getrangevalue(date:DateRange|undefined){
    if (!date?.from || !date?.to) return ''; // Add this line to guard against undefined dates

const startDate:Date = date.from;
const endDate:Date = date.to;
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const formattedStartDate = `${months[startDate.getMonth()]} ${startDate.getDate()}, ${startDate.getFullYear()}`;
const formattedEndDate = `${months[endDate.getMonth()]} ${endDate.getDate()}, ${endDate.getFullYear()}`;

const formattedDateRange = `${formattedStartDate} - ${formattedEndDate}`;
    return formattedDateRange;
  }


  const value = {
    currentRange: getrangevalue(dateRange),
    previousRange: getrangevalue(oldDateRange)
  };
  


    const current = useRecoilValue(clickedCurrent);
    const title = headtitles[current].key
     console.log("current",current) 
     console.log(title)

     const combinedData= sortedDataForChart.map((item,index)=>{
      const oldItem = oldDataForChartState[index];
  return {
    uv1: item[title], // Assuming 'title' is a valid property of items in sortedDataForChart
    pv1: item['monthYear'], // Access 'monthYear' property from the current item
    uv2: oldItem ? oldItem[title] : '', // Safely access 'title' from the old data, default to empty string if not found
    pv2: oldItem ? oldItem['monthYear'] : '' // Safely access 'monthYear' from the old data, default to empty string if not found
  };
    })
  

    console.log("combineddate",combinedData)
    console.log(oldDateRange)  

  

    {/*  const CustomLegend = ({ currentRange, previousRange }: CustomLegendProps) => (
      <Legend 
        verticalAlign="bottom"
        align="right"
        iconSize={20}
        iconType="plainline"
        formatter={(value, entry) => {
          const legendText = `${value} (${currentRange} | ${previousRange})`;
          return <span style={{color: entry.color}}>{legendText}</span>;
        }}
      />
    );
  */}

   




  if (combinedData.length === 0) {
    return <div>No data found for the selected date range.</div>;
  }




  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={combinedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="pv1" />
        <YAxis />
        <Tooltip cursor={{ stroke: 'grey', strokeWidth: 1 }} />
        
        <Legend 
          verticalAlign="bottom"
          align="right"
          iconSize={20}
          iconType="plainline"
          formatter={(value,entry)=> {
            // Assuming you want to display the date ranges as part of the legend text
            return <span style={{color: entry.color}}>{value}</span>;
          }}

        
        
        
        
        />
        
        <Line type="monotone" dataKey="uv1" stroke="#8884d8" dot={false} activeDot={false} />
        <Line type="monotone" dataKey="uv2" stroke="#82ca9d" strokeDasharray="5 5" dot={false} activeDot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ResponsiveLineChart;
