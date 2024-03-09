import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useDateRange } from '../../context/Datecontext';
import storedataWithMonthYear from '../../mockdata/storedata';
import { format, parse } from 'date-fns';
import { sortedDataForChartState } from '../../context/storeDataState';
import { useRecoilValue , atom, selector, useRecoilState} from 'recoil';





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

const numberOfElements = 4;

let totalIds = [0, 1, 2, 3, 4, 5, 6, 7];
let currentIds = [0, 1, 2, 3];


const currentidState = atom({
  key :'currentidState',
  default:currentIds
})

const residueidState= selector({
  key:'residueidState',
  get:({get})=>{
    const current = get(currentidState)
    let  residueIds = totalIds.filter(id => !current.includes(id));
  }
})






function StorepanelStats() {


    const [current , setCurrent]= useRecoilState(currentidState);
    
    const residueIds = useRecoilValue(residueidState)

    const sortedDataForChart = useRecoilValue(sortedDataForChartState);
    let propsvalue: {id: number, title: string, firstday: number, value: number, percentagechange: number}[] = []

    if (sortedDataForChart.length > 0){
    
     for (const item in headtitles){
      
      const id = headtitles[item].id;
      const title = headtitles[item].title;
      const key = headtitles[item].key;
      const firstday = sortedDataForChart[0][key];
      const value = sortedDataForChart[sortedDataForChart.length-1][key];
      const change = value - firstday;
      const percentagechange = Math.round( ((change/firstday)*100) );
      console.log('key is', key);
     
      console.log(percentagechange);
      console.log(title);
      console.log('firstday is ',firstday)

      

      let titlearray :  {id: number, title: string, firstday: number, value: number, percentagechange: number} = {
        id: id,
        title: title,
        firstday: firstday,
        value: value,
        percentagechange: percentagechange
      }
      
      
      titlearray['id'] = id
      titlearray['title'] = title
      titlearray['firstday'] = firstday
      titlearray['value'] = value
      titlearray['percentagechange'] = percentagechange
      propsvalue.push(titlearray)


    }
    //return propsvalue;
    
  
  }

 // console.log('propsvalue',propsvalue)
    
 function onResidueClick(selectid:number, menuid:number)  {
      
    const  indextoremove = current.indexOf(selectid)
    
    setCurrent(current.splice(indextoremove,1,menuid))

 }








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