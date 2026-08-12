import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Header from './Header';
import ReactPlayer from 'react-player';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const WaitingQueue = () => {
  const navigate=useNavigate()
    const [waitingList, setWaitingList] = useState(0);
    const [doctor,setDoctor] = useState([])
    useEffect(() => {
        const fetchData = async () => {
          try {
            const docId = parseInt(localStorage.getItem("queuedDoctorId"))
            const profile = JSON.parse(localStorage.getItem('userProfile'));
            const id = profile.id;
            let payload={
              docId:docId,
              patientId:id
            }
            console.log("payload is",payload);
            const response = await axios.post(import.meta.env.REACT_APP_BACKEND_URL +'/api/patient/getWaitingList',payload);
            setWaitingList(response.data);
          } catch (error) {
            console.error('Error fetching waiting list:', error);
          }
        };
    
        fetchData();
      }, []);

      useEffect(() => {
        const fetchData = async () => {
            const docId = parseInt(localStorage.getItem("queuedDoctorId"))
            const response = await axios.get(`${import.meta.env.REACT_APP_BACKEND_URL}/api/doctor/getDoctorDetails/${docId}`)
            setDoctor(response.data)
        };
    
        fetchData();
      }, []);

      const gothere =()=>{
          navigate("/videoCallQueue")
      }


  return (
    <>
    
      <div className="w-full relative bg-whitesmoke-400 overflow-hidden flex flex-row items-start justify-start gap-[0px_32px] tracking-[normal] mq750:gap-[0px_32px] mq1025:pl-5 mq1025:pr-5 mq1025:box-border">
    <Navbar />
    <main className="flex-1 flex flex-col items-start justify-start pt-5 px-0 pb-0 box-border max-w-[calc(100%_-_254px)] mq1025:max-w-full">
      <section className="self-stretch flex flex-col items-start justify-start gap-[30px_0px] max-w-full">
        <div className="self-stretch flex flex-col items-start justify-start gap-[22px_0px] max-w-full text-left text-xs text-navy-100 font-nunito">
          <Header />
        </div>

       <div className='flex flex-row w-full gap-4 '>

        <div
        style={{ fontFamily: "'Alfa Slab One', 'Changa', 'Platypi', 'Roboto', 'Rowdies', 'Varela Round', 'Zeyada', sans-serif" }}
        className=' shadow-2xl w-full  bg-gradient-to-tr from-sky-300 via-sky-400 to-blue-500 text-center pt-5 text-white rounded-lg tracking-wide'>
            <div className='text-blue-900'>Your position at the queue</div>
            <div className='pt-3 text-[80px] font-extrabold'>{waitingList}</div>
            {waitingList === 0 && (
                <Button onClick={gothere} type='primary'>Join Now</Button>
            )}
        </div>

        <div 
        style={{ fontFamily: "'Alfa Slab One', 'Changa', 'Platypi', 'Roboto', 'Rowdies', 'Varela Round', 'Zeyada', sans-serif" }}
        className='shadow-2xl w-full bg-gradient-to-tr from-sky-300 via-sky-400 to-blue-500 text-center pt-5 text-gray-200 rounded-lg tracking-wider'>
             <div className=' text-blue-900 text-[30px]'>Waiting for...</div>
             <div className='text-[25px] pt-[10px]'>Dr. {doctor.docName?doctor.docName:"Loading..."}</div>
             <div className=' font-extralight text-[15px] pt-[10px]'>Specialized in <span>{doctor.speciality?doctor.speciality.specialityName:"loading..."} </span> </div>
            <div className='font-extralight text-[15px]'>{doctor.hospitalName?doctor.hospitalName:"loading..."}</div>
        </div>
       </div>
       <div className='pt-[-80px]'>
      <img className='w-[1330px] h-[317px] relative right-[32px] ' src="https://static.vecteezy.com/system/resources/previews/020/869/126/non_2x/hospital-or-medical-clinic-hall-interior-free-vector.jpg" alt="" />
       </div>
      </section>
    </main>
  </div>
    </>
    
  )
}

export default WaitingQueue