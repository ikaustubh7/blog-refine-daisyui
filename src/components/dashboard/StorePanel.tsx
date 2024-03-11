import React from "react";
import storedataWithMonthYear from "../../mockdata/storedata";
import { DatePickerWithRange } from "./Datepicker";
import IsLoadingPanel from "./IsLoadingPanel";
import { useDateRange } from "../../context/Datecontext";
import ResponsiveLineChart from "./ResponsiveLineChart";
import StorepanelStats from "./StorepanelStats";
import { useState } from "react";





const numberOfElements = 4;
let isLoading = false;

if (!storedataWithMonthYear) {
  const isLoading = true;
  console.log("loading", isLoading);
}

function StorePanel() {


        const[foldchart,setFoldchart]=useState<boolean> (false)




  if (isLoading) {
    
    
    
    return (<IsLoadingPanel />);
  }

  return (
    <div className="grid flex-col py-10 mb-[48px] space-y-[70px]   justify-items-center bg-white h-[480px]">
      <div>
        <DatePickerWithRange />
        
      </div>

      <div className={` ${ foldchart?"h-[80px] rounded-[10px] shadow-md absolute ":""    }     w-[793px] h-[282px] bg-white mt-[30px] ml-[22px] p-[10px]  rounded-[10px]    shadow-md   absolute `}>
        <div className="flex  w-[773px] h-[60px]   ">
          {/* Render elements dynamically */}
          
          <StorepanelStats/>

          <div className="mt-[21.5px] mb-[21.5px] bg-white ml-[17.5px] cursor-pointer   " onClick={()=>setFoldchart(!foldchart)}    >
            <svg
              width="11"
              height="7"
              viewBox="0 0 11 7"
              fill="none"
              xmlns="http://www.w3.org/2000/svg" className={ ` ${foldchart ?  "rotate-180  translate-y-[1px]":  ""}  `}
            >
              <path
                d="M5.5 6.75C5.28906 6.75 5.10156 6.67969 4.96094 6.53906L0.460938 2.03906C0.15625 1.75781 0.15625 1.26562 0.460938 0.984375C0.742188 0.679688 1.23438 0.679688 1.51562 0.984375L5.5 4.94531L9.46094 0.984375C9.74219 0.679688 10.2344 0.679688 10.5156 0.984375C10.8203 1.26562 10.8203 1.75781 10.5156 2.03906L6.01562 6.53906C5.875 6.67969 5.6875 6.75 5.5 6.75Z"
                fill="black"
                fillOpacity="0.5"
              />
            </svg>
          </div>
        </div>

        {/* chart div */}
        <div className={` ${ foldchart?"invisible":"visible"    }           w-[773px] h-[192px] rounded-[10px] mt-[10px]  bg-white    ` }   >
          <ResponsiveLineChart/>
        </div>
      </div>
    </div>
  );
}

export default StorePanel;
