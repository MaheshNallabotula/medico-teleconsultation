import React from 'react'
import { useMemo } from "react";

const HospitalCard = ({ container, imageIcon, cardHeading, propWidth,address }) => {
    const cardHeadingStyle = useMemo(() => {
        return {
          width: propWidth,
        };
      }, [propWidth]);
  return (
    <div className="w-[392px] rounded-3xl bg-gray-200 flex flex-col items-center justify-start pt-6 pb-[50px] pr-[23px] pl-6 box-border gap-[24px] max-w-full z-[1] text-left text-5xl text-mediumpurple-200 font-text-single-200-regular mq750:pt-5 mq750:pb-8 mq750:box-border">
    <div className="w-[391.8px] h-[506px] relative rounded-3xl bg-gray-200 hidden max-w-full" />
    <img
      className="w-5 h-5 relative overflow-hidden shrink-0 hidden"
      alt=""
      src="/line-roundedpassword.svg"
    />
    <div className="self-stretch flex flex-row items-center justify-center p-[75px] relative z-[1]">
      <img
        className="h-full w-full absolute my-0 mx-[!important] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-3xs max-w-full overflow-hidden max-h-full object-cover"
        alt=""
        src={container}
      />
      <img
        className="h-[70.5px] w-20 relative z-[1]"
        loading="eager"
        alt=""
        src={imageIcon}
      />
    </div>
    <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[3px] pl-0 box-border max-w-full">
      <div className="flex-1 flex flex-col items-start justify-start gap-[12px_0px] max-w-full">
        <b
          className="w-[324px] relative leading-[34px] inline-block max-w-full z-[1] mq450:text-lgi mq450:leading-[27px]"
          style={cardHeadingStyle}
        >
          {cardHeading}
        </b>
        <div className="self-stretch flex flex-col items-start justify-start gap-[32px_0px] text-lg text-dimgray mq450:gap-[32px_0px]">
          <div className="self-stretch relative leading-[30px] z-[1]">
             Hospiatl Address: {address}
          </div>
          <button className="cursor-pointer">
          <div className="flex flex-row items-center justify-start gap-[0px_5px] text-center text-mediumpurple-200">
            <b className="relative leading-[18px] whitespace-nowrap z-[1]">
              View Details
            </b>
            <img
              className="h-5 w-5 relative overflow-hidden shrink-0 min-h-[20px] z-[1]"
              loading="eager"
              alt=""
              src="/line-roundedarrow-right.svg"
            />
          </div>
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default HospitalCard