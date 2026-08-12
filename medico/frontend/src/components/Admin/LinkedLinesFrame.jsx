
import React from 'react'

const LinkedLinesFrame = () => {
  return (
    <div className="self-stretch h-[163px] flex flex-col items-start justify-start pt-0 px-0 pb-[360px] box-border gap-[24px_0px] max-w-full mq750:pb-[234px] mq750:box-border">
    <div className="self-stretch h-px relative box-border border-t-[1px] border-solid border-whitesmoke-200" />
    <div className="w-[629px] h-8 flex flex-row items-start justify-start py-0 px-[38px] box-border max-w-full">
      <div className="h-0 w-0 relative">
        <img
          className="absolute top-[NaNpx] left-[NaNpx] rounded-31xl w-8 h-8 overflow-hidden object-cover hidden"
          alt=""
          src="/12@2x.png"
        />
        <div className="absolute top-[NaNpx] left-[NaNpx] w-40 h-3 flex flex-col items-start justify-start pt-[7px] px-0 pb-0 box-border">
          <div className="self-stretch h-[5.8px] relative hidden">
            <div className="absolute top-[NaNpx] left-[NaNpx] rounded bg-whitesmoke-200 w-full h-full hidden" />
            <div className="absolute top-[NaNpx] left-[NaNpx] rounded bg-dimgray w-[141.2px] h-[5.8px] hidden z-[1]" />
          </div>
        </div>
      </div>
    </div>
    <div className="self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-[55px] box-border relative max-w-full">
      <div className="h-px flex-1 relative box-border max-w-full border-t-[1px] border-solid border-whitesmoke-200" />
      <img
        className="h-8 w-8 absolute !m-[0] bottom-[-1.7px] left-[38.1px] rounded-[50%] object-cover"
        alt=""
        src="/ellipse-3-4@2x.png"
      />
    </div>
    <div className="self-stretch h-px relative box-border border-t-[1px] border-solid border-whitesmoke-200" />
  </div>
  )
}

export default LinkedLinesFrame

