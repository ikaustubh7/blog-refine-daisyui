import { atom, selector } from "recoil";
import storedataWithMonthYear from "../mockdata/storedata";
import { DateRange } from "react-day-picker";



export const Daterangerecoil=atom<DateRange>({
  key:'daterangerecoil',
  default:undefined 
})


export const sortedDataForChartState = atom<any>({
  key: 'sortedDataForChartState',
  default: [], 
});

export const oldsortedDataForChartState=atom<any>({
  key:'oldSortedDataForChartState',
  default:[],
}
);

export const MergedDataForChartState=atom<any>({
  key:'MergedDataForChartState',
  default:[],
}
);

