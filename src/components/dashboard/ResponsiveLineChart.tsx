import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDateRange } from '../../context/Datecontext';
import storedataWithMonthYear from '../../mockdata/storedata';
import { format, parse } from 'date-fns';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { sortedDataForChartState } from '../../context/storeDataState';
import { useEffect } from 'react';





const ResponsiveLineChart = () => {

  
  const { dateRange } = useDateRange();
  const [sortedDataForChart, setSortedDataForChart] = useRecoilState(sortedDataForChartState);







  

  useEffect(() => {
    const fetchData = async () => {
      

      function convertdate(date: string){
        const formdate = parse(date, 'dd/MM/yyyy', new Date());
        
        return format(formdate,'dd-MM-yyyy' );
    
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



















  if (sortedDataForChart.length === 0) {
    return <div>No data found for the selected date range.Please select range from  2021 to 2024</div>;
  }


  

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={sortedDataForChart}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="monthYear" />
        <YAxis />
        <Tooltip cursor={{ stroke: 'blue', strokeWidth: 3 }} />
        <Legend />
        <Line type="monotone" dataKey="online store session" stroke="#8884d8" dot={false} activeDot={false} />
        <Line type="monotone" dataKey="net return value" stroke="#82ca9d" strokeDasharray="5 5" dot={false} activeDot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ResponsiveLineChart;
