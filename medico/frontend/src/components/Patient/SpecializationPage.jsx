import React from 'react'
import AuthContext from '../../../Context/AuthContext'
import { useContext } from 'react'
import Header from './Header'
import Navbar from './Navbar'
import { useState,useEffect } from 'react'
import Link from 'antd/es/typography/Link'
import { Select, Space } from 'antd';
import DoctorCard from './DoctorCard'
import { useNavigate } from "react-router-dom";

const SpecializationPage = () => {
    const navigate = useNavigate()

    const {specializationId} = useContext(AuthContext)
   
    const {specialization} = useContext(AuthContext)
    const {doctorBySpecialization} = useContext(AuthContext)
    const {doctorList1} = useContext(AuthContext)
    const {getSepecificSpecialization} =useContext(AuthContext)
    const [filter,setFilter] = useState('rating')
    const handleChange = (value) => {
        
        console.log(`selected ${value}`);
        if(value==="Price"){
          setFilter('price')
           navigate("/specialization2")
        }
        
      };
    useEffect(() => {
        getSepecificSpecialization();
        doctorBySpecialization();
        console.log(doctorList1);
    }, [filter]);
    
  return (
    <>
     <div className="w-full relative bg-whitesmoke-400 overflow-hidden flex flex-row items-start justify-start gap-[0px_32px] tracking-[normal] mq750:gap-[0px_32px] mq1025:pl-5 mq1025:pr-5 mq1025:box-border">
        <Navbar/>
        <main className="flex-1 flex flex-col items-start justify-start pt-5 px-0 pb-0 box-border max-w-[calc(100%_-_254px)] mq1025:max-w-full">
      <section className="self-stretch flex flex-col items-start justify-start gap-[30px_0px] max-w-full">
      <div className="self-stretch flex flex-col items-start justify-start gap-[22px_0px] max-w-full text-left text-xs text-navy-100 font-nunito">
      <Header/>
      </div>
      <div className='w-full grid grid-cols-2'>
        <div className='mr-[320px]'>
            <div className='flex justify-center text-center  '>
                <div className='text-[50px] text-center '></div>
            </div>
            <div className='text-xl w-[1200px] text-center justify-center font-bold bg-pink-500 text-white p-3 rounded-lg'>
            To cure sometimes, to relieve often, to comfort always <span><br /><img src="https://img.icons8.com/?size=80&id=Vk43dZKkJDPx&format=png" alt="" /></span>
            </div>
        </div>
        <div className='flex flex-row relative left-[300px] top-[150px] pb-[50px]'>
        <div className='sort font-bold text-[20px]  '>
            SORT BY : 
        </div>
            <div className='px-2 pb-5'>
    <Select
      defaultValue="By Rating"
      style={{
        width: 120,
      }}
      onChange={handleChange}
      options={[
        {
          value: 'rating',
          label: 'By rating',
        },
        {
          value: 'Price',
          label: 'By Price',
        }
       
      ]}
    />
            </div>
        </div>

      </div>

 <div class="grid grid-cols-3 gap-4 mt-[30px]">
 
        {doctorList1.map(doctor => (
          <DoctorCard key={doctor.id} doctor={doctor} propWidth="unset" />
        ))}
      
</div>
     
      </section>
      </main>
     </div>
    </>
  )
}

export default SpecializationPage