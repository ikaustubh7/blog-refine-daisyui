import React from 'react'

interface TrendiconProps{
  value:boolean;
}


function Trendicon({value}:TrendiconProps) {
  return (
    <>
    <svg  className={value ? "" : "rotate-180  translate-y-[1px]"} width="7" height="5" viewBox="0 0 7 5" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.550781 3.44531L3.03125 0.945312C3.16797 0.828125 3.32422 0.75 3.5 0.75C3.65625 0.75 3.8125 0.828125 3.92969 0.945312L6.41016 3.44531C6.58594 3.62109 6.64453 3.89453 6.54688 4.12891C6.44922 4.36328 6.23438 4.5 5.98047 4.5H1C0.746094 4.5 0.511719 4.36328 0.414062 4.12891C0.316406 3.89453 0.375 3.62109 0.550781 3.44531Z" fill="#616161"/>
</svg>

    </>
  )
}

export default Trendicon