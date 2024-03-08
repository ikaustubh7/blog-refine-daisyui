import React, { createContext, useContext, useState ,ReactNode } from 'react';
import { DateRange } from "react-day-picker";
import { addDays, format } from "date-fns"



interface DateRangeContexttype {
  dateRange: DateRange | undefined;
  setDateRange: (dateRange: DateRange) => void;
}

const DateRangeContext = createContext<DateRangeContexttype | undefined>(undefined);

export const useDateRange = () => {
  const context = useContext(DateRangeContext);
  if (!context) {
    throw new Error("useDateRange must be used within a DateProvider");
  }
  return context;
};





export const DateRangeProvider: React.FC<{children:ReactNode}> = ({ children }) => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(
    
    ()=>{


    const from:Date= new Date(2022, 3, 20);
    const to:Date= addDays(new Date(2022, 3, 20), 320);
    return {from,to}  


  });

  return (
    <DateRangeContext.Provider value={{dateRange, setDateRange}}>
      {children}
    </DateRangeContext.Provider>
  );
};
