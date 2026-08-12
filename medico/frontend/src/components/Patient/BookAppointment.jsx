import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../../Context/AuthContext';
import Slots from './Slots'; // Assuming Slots component handles displaying slots
import Header from './Header';
import Navbar from './Navbar';
import { DatePicker, Space } from 'antd';

const BookAppointment = () => {
 
  
   
  return (
    <>
       <div className="w-full relative bg-whitesmoke-400 overflow-hidden flex flex-row items-start justify-start gap-[0px_32px] tracking-[normal] mq750:gap-[0px_32px] mq1025:pl-5 mq1025:pr-5 mq1025:box-border">
        <Navbar />
        <main className="flex-1 flex flex-col items-start justify-start pt-5 px-0 pb-0 box-border max-w-[calc(100%_-_254px)] mq1025:max-w-full">
          <section className="self-stretch flex flex-col items-start justify-start gap-[30px_0px] max-w-full">
            <div className="self-stretch flex flex-col items-start justify-start gap-[22px_0px] max-w-full text-left text-xs text-navy-100 font-nunito">
              <Header />
            </div>
         
            <div className="slots-availability text-center ">
              <h2 className='ml-[50%]'>Available Time Slots</h2>
              <Slots  /> {/* Pass availableSlots to Slots component */}
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default BookAppointment;