import React from 'react'
import { Link } from 'react-router-dom'

export const NavbarDoc = () => {
  return (
    <>
    <div className="sticky top-0 h-full ">
      <div className="flex flex-col items-center justify-center py-0  mq1025:hidden h-full">
        <div className="flex-1 flex flex-row items-start justify-start sticky">
          <div className="h-12 w-[82px] absolute my-0 mx-[!important] top-[234px] ">
            <div className="absolute top-[0px] left-[0px] rounded-tl-none rounded-tr-8xs rounded-br-8xs rounded-bl-none [background:linear-gradient(90deg,_rgba(236,_13,_255,_0.2)_60%,_rgba(255,_255,_255,_0))] w-full h-full z-[1]" />
          </div>
          <nav className="m-0 self-stretch bg-gradient-to-r from-sky-500 to-indigo-500 flex flex-col items-center justify-start py-[193px] pr-[92px] pl-[27px] gap-[33px_0px] text-left text-base text-gray-1100 font-nunito mq750:pt-[125px] mq750:pb-[125px] mq750:box-border h-screen">
            <div className="w-[218px] h-screen relative bg-mediumpurple-200 hidden" />
            <div className="flex flex-row items-start justify-start py-0 ">
              <div className="flex flex-row items-start justify-start gap-[0px_13px]">
                <img
                  className="h-[17px] w-5 relative z-[1]"
                  loading="eager"
                  alt=""
                  src="https://cdn-icons-png.flaticon.com/128/619/619153.png"
                />
                <Link to="/doctor_home" className="relative font-semibold z-[1] no-underline text-black">Home</Link>
              </div>
            </div>
            <div className="flex flex-row items-start justify-start py-0 ">
              <div className="flex flex-row items-start justify-start gap-[0px_13px]">
                <img
                  className="h-[17px] w-5 relative z-[1]"
                  loading="eager"
                  alt=""
                  src="https://cdn-icons-png.flaticon.com/128/11472/11472723.png"
                />
                <Link to="/doctor" className="relative font-semibold z-[1] no-underline text-black">Profile</Link>
              </div>
            </div>
            <div className="flex flex-row items-start justify-start py-0 ">
              <div className="flex flex-row items-start justify-start gap-[0px_13px]">
                <img
                  className="h-[17px] w-5 relative z-[1] text-white"
                  loading="eager"
                  alt=""
                  src="https://cdn-icons-png.flaticon.com/128/942/942759.png"
                />
                <Link to="/calls" className="relative font-semibold z-[1] no-underline text-black">Calls</Link>
              </div>
            </div>
            <div className="flex flex-row items-center justify-start gap-[0px_13px]">
              <img
                className="h-6 w-6 relative object-cover min-h-[24px] z-[1]"
                loading="eager"
                alt=""
                src="https://cdn-icons-png.flaticon.com/128/6981/6981234.png"
              />
              <Link to="/doctor_history" className="relative font-semibold z-[1] no-underline text-black">History</Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
    </>
  )
}
export default NavbarDoc