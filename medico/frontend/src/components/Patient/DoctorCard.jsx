import React, { useContext } from 'react'
import { useMemo } from 'react';
import { Rate } from 'antd';
import { useNavigate } from "react-router-dom";
import AuthContext from '../../../Context/AuthContext';
// import DoctorDetails from './DoctorDetails';

const DoctorCard = ( doctor,propWidth) => {
    const {getDoctorDetails} = useContext(AuthContext)
    const navigate = useNavigate()
    const fontStyle = {
        fontFamily: "Changa, sans-serif",
      };
    const cardHeadingStyle = useMemo(() => {
        console.log("doctor");
        console.log(doctor);
        return {
          width: propWidth,
        };
      }, [propWidth]);
    
      const getDetails = () =>{
        console.log("log");
          console.log("doctor id at doctor card is ", doctor.doctor.docId);
          if(doctor!==null){
            localStorage.setItem('doctor',doctor.doctor.docId)
          }
           getDoctorDetails()
        //    DoctorDetails(doctor.doctor.docId)
           navigate("/docDetails")
      }
  return (
    <>
      <div className="w-[392px] rounded-3xl bg-slate-100 flex flex-col items-center justify-start pt-6 pb-[50px] pr-[23px] pl-6 box-border gap-[24px] max-w-full z-[1] text-left text-5xl text-mediumpurple-200 font-text-single-200-regular mq750:pt-5 mq750:pb-8 mq750:box-border">
      <div className="w-[391.8px] h-[506px] relative rounded-3xl bg-gray-100 hidden max-w-full" />
      <img
        className="w-5 h-5 relative overflow-hidden shrink-0 hidden"
        alt=""
        src="/"
      />
      <div className="self-stretch flex flex-row items-center justify-center p-[75px] relative z-[1]">
        <img
          className="h-full w-full absolute my-0 mx-[!important] top-[0px] right-[0px] bottom-[0px] left-[0px] rounded-3xs max-w-full overflow-hidden max-h-full object-cover"
          alt=""
          src="/doctor2.jpg"
        />
        <img
          className="h-[70.5px] w-20 relative z-[1]"
          loading="eager"
          alt=""
        //   src={imageIcon}
        />
      </div>
      <div className="self-stretch flex flex-row items-start justify-start py-0 pr-[3px] pl-0 box-border max-w-full">
        <div className="flex-1 flex flex-col items-start justify-start gap-[12px_0px] max-w-full">
          <b
            className="w-[324px] relative leading-[14px] inline-block max-w-full z-[1] mq450:text-lgi mq450:leading-[27px]"
            style={cardHeadingStyle}
          >
            {doctor.doctor.docName}
          </b>
          <div className="self-stretch flex flex-col items-start justify-start gap-[15px_0px]  mq450:gap-[32px_0px]">
            <div style={fontStyle} className="self-stretch relative text-[12px]  leading-[3px] z-[1] text-dimgray ">
              {doctor.doctor.email}
            </div>
            <div style={fontStyle} className="self-stretch relative text-[20px] mt-6  leading-[-33px]  z-[1] ">
              {doctor.doctor.hospital?doctor.doctor.hospital.hospitalName:"no hospital joined"}
            </div>
            <div className='rating position bottom-10'>
            <Rate disabled value={doctor.doctor.rating ?? 0}  style={{ color: '#9370DB' }} />
            </div>
            <div className='rating '>
            <span style={fontStyle} className='text-[35px] font-bold '>₹</span>  <span className='text-black text-[20px] pb-3'>{doctor.doctor.rate} </span>
           <span className='text-[15px] text-black'>per appointment</span>
            </div>
            <button onClick={getDetails} style={fontStyle} className="cursor-pointer text-center justify-center  bg-mediumpurple-200 text-white hover:bg-purple-700">
               See Details
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default DoctorCard