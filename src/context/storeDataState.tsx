import { atom } from "recoil";
import storedataWithMonthYear from "../mockdata/storedata";


export const sortedDataForChartState = atom<any>({
  key: 'sortedDataForChartState',
  default: [], 
});
