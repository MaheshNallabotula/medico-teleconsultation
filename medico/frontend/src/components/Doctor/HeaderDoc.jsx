import React from 'react'
import AuthContext from '../../../Context/AuthContext'
import { useContext } from 'react'
import {useState, useEffect } from 'react'

const HeaderDoc = () => {
    const {getDoctorProfile} =  useContext(AuthContext)
    const {docProfile} = useContext(AuthContext)
    useEffect(() => {
        getDoctorProfile();
    }, []);
   const {logoutAPICall} = useContext(AuthContext)
  return (
    <div className="self-stretch flex flex-row items-start justify-start gap-[0px_5px] top-[0] z-[99] sticky max-w-full">
        <div className="flex-1 rounded-8xs bg-neutral-colors-white flex flex-row items-center justify-start p-[23px] box-border gap-[10px] max-w-full">
          <div className="h-[62px] w-[980px] relative rounded-8xs bg-neutral-colors-white hidden max-w-full" />
          <img
            className="h-3.5 w-3.5 relative object-cover z-[1]"
            alt=""
            src="/icon@2x.png"
          />
          <input
            className="w-[35px] [border:none] [outline:none] font-nunito text-xs bg-[transparent] h-4 relative text-navy-200 text-left inline-block z-[1]"
            placeholder="Search"
            type="text"
          />
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
            <div className="absolute top-[20px] left-[0px] w-[82px] flex flex-col items-start justify-start">
              <div className="self-stretch h-[17px] flex flex-row items-start justify-start pt-0 px-0 pb-0 box-border">
                <b className="mb-[-3px] h-[19.5px] flex-1 relative inline-block whitespace-nowrap">
                  {docProfile.docName}
                </b>
              </div>
              <button onClick={()=>{logoutAPICall()}} className="bg-white cursor-pointer w-16 relative text-3xs font-light inline-block box-border whitespace-nowrap pr-5">
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

export default HeaderDoc