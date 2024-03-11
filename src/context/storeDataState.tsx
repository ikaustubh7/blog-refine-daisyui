import { atom, selector } from "recoil";
import storedataWithMonthYear from "../mockdata/storedata";
import { DateRange } from "react-day-picker";
import { storedataType } from "../interfaces";



export const Daterangerecoil=atom<DateRange>({
  key:'daterangerecoil',
  default:undefined 
})


export const sortedDataForChartState = atom<storedataType>({
  key: 'sortedDataForChartState',
  default:undefined
});

export const oldsortedDataForChartState=atom<storedataType>({
  key:'oldSortedDataForChartState',
  default:undefined
}
);

export const MergedDataForChartState=atom<any>({
  key:'MergedDataForChartState',
  default:[],
}
);

