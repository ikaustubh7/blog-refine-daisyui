"use client"

import React, { useState, useEffect } from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "../../lib/utils";
import { Button } from "../../ui/button";
import { Calendar } from "../../ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../ui/popover";

import { useDateRange } from "../../context/Datecontext";
import { Daterangerecoil } from "../../context/storeDataState";
import { useRecoilState } from "recoil";

export function DatePickerWithRange({
  className,
}: React.HTMLAttributes<HTMLDivElement>) {
  const [fromDate, setFromDate] = useState<Date | undefined>(new Date(2022, 3, 20));
  const [toDate, setToDate] = useState<Date | undefined>(new Date(2022, 8, 20));

  const {dateRange, setDateRange } = useDateRange();


  const [daterangerecoil, setDaterangerecoil]=useRecoilState(Daterangerecoil);

  useEffect(() => {
    // Update the external date range state/context when fromDate or toDate changes
    if (fromDate && toDate) {
      setDateRange({ from: fromDate, to: toDate });
      //console.log('Date range changed:', { from: fromDate, to: toDate });
    }
  }, [fromDate, toDate, setDateRange]);

 

  // Handler for selecting the "from" date
  const handleSelectFromDate = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setFromDate(selectedDate);
      // Optionally, update toDate if it's before fromDate
      if (toDate && selectedDate > toDate) {
        setToDate(undefined);
      }
      if (selectedDate && toDate) {
        setDateRange({ from: selectedDate, to: toDate });
        setDaterangerecoil({from:selectedDate,to:toDate})
      }
    }
  };

  // Handler for selecting the "to" date
  const handleSelectToDate = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setToDate(selectedDate);
    }
  };




  
  




    const defaultMonth = fromDate ? fromDate : new Date();
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="default"
            className={cn("w-[300px] justify-start text-left font-normal", !(fromDate && toDate) && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {fromDate && toDate ? (
              `${format(fromDate, "LLL dd, y")} - ${format(toDate, "LLL dd, y")}`
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="flex w-auto p-0 bg-white" align="start">
          <div>
            
            <Calendar
              initialFocus
              mode="single"
              defaultMonth={fromDate}
              fromDate={new Date(2019,1,1)}
              toMonth={toDate}
              selected={fromDate}
              onSelect={handleSelectFromDate}
              numberOfMonths={1}
            />
          </div>
          <div>
            
            <Calendar
              initialFocus
              mode="single"
              defaultMonth={toDate ? toDate : addDays(new Date(fromDate || new Date()), 1)}
              fromMonth={fromDate}
              toDate={new Date(2024, 12, 20)}
              selected={toDate}
              onSelect={handleSelectToDate}
              numberOfMonths={1}
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}




//console.log(displayDateRange(date)