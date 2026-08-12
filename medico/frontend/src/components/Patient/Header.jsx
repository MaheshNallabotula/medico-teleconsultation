import React from 'react'
import AuthContext from '../../../Context/AuthContext'
import { useContext } from 'react'
const Header = () => {
   const {logoutAPICall} = useContext(AuthContext)
  return (
    <div className="self-stretch  flex flex-row items-start justify-start gap-[0px_5px] top-[0] z-[99]  max-w-full">
        <div className="flex-1 rounded-8xs bg-neutral-colors-white flex flex-row items-center  box-border  max-w-full">
          <div className=" text-center   w-[980px] relative rounded-8xs bg-blue-600 hidden max-w-full" />
            {/* <div className='text-center relative left-[50%] bottom-5 font-bold text-[30px]'>Medico</div> */}
            <img className='bg-blue-500 relative left-[50%] bottom-5 rounded-full h-[100px] shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] ' src="/logo.png" alt="" />
        </div>
        <div className="w-[204px] flex flex-row items-center justify-between gap-[20px]">
          <div className="h-[60px] w-[140px] relative">
            <div className="absolute h-[calc(100%_-_0.3px)] top-[0px] bottom-[0.3px] left-[80px] w-[59.7px]">
              <div className="absolute w-[calc(100%_-_4.8px)] top-[7.3px] right-[2.4px] left-[2.4px] rounded-10xl-5 bg-goldenrod h-[52.4px]" />
              <img
                className="absolute top-[0px] left-[0px] rounded-[50%] w-full h-full object-cover z-[1]"
                loading="eager"
                alt=""
                src="/ellipse-58@2x.png"
              />
            </div>
            <div className="absolute top-[20px] left-[0px] w-[82px] flex flex-col items-start justify-start ">
              <div className="self-stretch h-[17px] flex flex-row items-start justify-start pt-0 px-0 pb-0 box-border">
                <b className="mb-[-3px] h-[19.5px] flex-1 relative inline-block whitespace-nowrap">
                  {/* {patient.firstName} <span> </span> {patient.lastName} */}
                </b>
              </div>
              <button onClick={()=>{logoutAPICall()}} className="bg-white font-bold cursor-pointer w-16 relative text-3xs  inline-block box-border whitespace-nowrap pr-5">
                Log out
              </button>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start pt-[9px] pb-0 pr-px pl-0">
            <img
              className="w-[21.1px] h-[20.3px] relative object-cover"
              loading="eager"
              alt=""
              src="/logout@2x.png"
            />
          </div>
        </div>
      </div>
  )
}

export default Header