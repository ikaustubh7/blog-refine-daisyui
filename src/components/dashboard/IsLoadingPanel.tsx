import React from 'react'


const numberOfElements = 4;



function IsLoadingPanel() {
  return (
    <>
    <div className="w-[793px] h-[276px] bg-white mt-[30px] ml-[22px] p-[10px] gap-[10px] rounded-[10px]  drop-shadow-md ">
      <div className="flex  w-[773px] h-[54px]  gap-1  ">
        {/* Render elements dynamically */}
        {Array.from({ length: numberOfElements }).map((_, index) => (
          <div key={index} className="w-[183px] rounded-[10px]   bg-[#F1F1F1]">
            <div className="w-[124px] h-[15px] rounded-sm bg-[#D9D9D9] ml-[9px] mt-[7px] "></div>
            <div className="w-[152px] h-[20px] rounded-sm bg-[#D9D9D9] mb-[7px] mt-[5px] ml-[9px] mr-[22px]"></div>
          </div>
        ))}

        <div className="mt-[18.5px] mb-[18.5px] ml-[9px] ">
          <svg
            width="11"
            height="7"
            viewBox="0 0 11 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.5 6.75C5.28906 6.75 5.10156 6.67969 4.96094 6.53906L0.460938 2.03906C0.15625 1.75781 0.15625 1.26562 0.460938 0.984375C0.742188 0.679688 1.23438 0.679688 1.51562 0.984375L5.5 4.94531L9.46094 0.984375C9.74219 0.679688 10.2344 0.679688 10.5156 0.984375C10.8203 1.26562 10.8203 1.75781 10.5156 2.03906L6.01562 6.53906C5.875 6.67969 5.6875 6.75 5.5 6.75Z"
              fill="black"
              fillOpacity="0.5"
            />
          </svg>
        </div>
      </div>

      {/* 2nd part */}
      <div className="w-[773px] h-[150px] rounded-[10px] mt-[10px]  bg-[#E3E3E3]"></div>
    </div>
    
    
    
    
    </>
  )
}

export default IsLoadingPanel