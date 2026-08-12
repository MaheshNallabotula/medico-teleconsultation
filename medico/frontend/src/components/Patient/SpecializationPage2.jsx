import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom";
import AuthContext from '../../../Context/AuthContext';
import { useEffect } from 'react';
import Header from './Header'
import Navbar from './Navbar'
import { Select, Space } from 'antd';
import DoctorCard from './DoctorCard';
const SpecializationPage2 = () => {
    const navigate = useNavigate()
     const {sortDoctorByPrice} = useContext(AuthContext)
    const {specializationId} = useContext(AuthContext)
    const {spec} = useContext(AuthContext)
    const {specialization} = useContext(AuthContext)
    const {doctorBySpecialization} = useContext(AuthContext)
    const {doctorList1} = useContext(AuthContext)
    const {getSepecificSpecialization} =useContext(AuthContext)
    const [filter,setFilter] = useState('price')
    const handleChange = (value) => {
        console.log(`selected ${value}`);
        if(value==="rating"){
            setFilter('rating')
            navigate("/specialization")
        }
       
      };
    useEffect(() => {
        getSepecificSpecialization();
        sortDoctorByPrice();
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
                <div className='text-[50px] text-center '>{spec.specialityName}</div>
            </div>
            <div className='text-xl text-center justify-center pos'>
                Our best doctors in {spec.specialityName}
            </div>
        </div>
        <div className='flex flex-row'>
        <div className='sort  '>
            Sort by: 
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

 <div class="grid grid-cols-3 gap-4">
 
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

export default SpecializationPage2