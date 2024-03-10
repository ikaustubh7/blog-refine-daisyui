import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import PenIcon from "../../ui/PenIcon";
import { residueidState } from "./StorepanelStats";
import { headtitleState } from "./StorepanelStats";
import Charticon from "../../ui/Charticon";
import Questionmarkicon from "../../ui/Questionmarkicon";
import { currentidState } from "./StorepanelStats";
import { useRecoilState ,useRecoilValue } from "recoil";



interface PopMenuProps{
  selectid:number;
}





const PopMenu: React.FC<PopMenuProps> = ({ selectid }) =>{
  const [currentid , setCurrentid]= useRecoilState(currentidState);
    
  const residueIds = useRecoilValue(residueidState);
  const headtitles=useRecoilValue(headtitleState);

  console.log('residueid--',residueIds)

  function onResidueClick(selectid:number, menuid:number)  {
    setCurrentid(current => {

      const indexToReplace = current.indexOf(selectid);
      const menuidIndex = current.indexOf(menuid);
  
      // If selectid is not found, there's no action needed.
      if (indexToReplace === -1) return current;
  
      // Create a copy of the current array to avoid direct mutation.
      const updatedCurrent = [...current];
  
      if (menuidIndex !== -1) {
        // If menuid is found, swap positions of selectid and menuid.
        updatedCurrent[indexToReplace] = menuid;
        updatedCurrent[menuidIndex] = selectid;
      } else {
        // If menuid is not found, replace selectid with menuid.
        updatedCurrent[indexToReplace] = menuid;
      }
  
      return updatedCurrent;


    });
   }
  


  return (
    <Popover>
      <PopoverTrigger>
        <PenIcon />
      </PopoverTrigger>
      <PopoverContent
        align={"start"}
        className="bg-[#FFFFFF] w-[212px] h-[167px] rounded-[10px] p-[5px] space-y-[5px]  "
      >


        
{residueIds.map((item,index)=>  (

      
<div className="flex  w-[202px]h-[22px] rounded-[3px]  hover:bg-[#F1F1F1] hover:cursor-pointer   " 
onClick={()=>onResidueClick(selectid ,item)}  key={index}  >



<div className="w-[10px] h-[10px] ml-[10px] mt-[6px]">
  <Charticon />
</div>



<div
  className="w-[142px] h-[12px] ml-[10px] py-[1px] mt-[5px] mb-[5px]  
  
  font-[Inter]
text-[10px]
font-[400]
leading-[12px] tracking-normal

text-left  

  "
>
  {headtitles[item].title}


</div>




<div
  className="w-[10px]
h-[10px]  font-[Font Awesome 6 Free]
text-[10px]
font-[400]
leading-[10px] tracking-normal
text-center
mt-[6px] mb-[6px] mr-[10px] ml-[10px]

"
>
  <Questionmarkicon />
</div>
</div>

))
        
      }








      </PopoverContent>
    </Popover>
  );
}

export default PopMenu;
