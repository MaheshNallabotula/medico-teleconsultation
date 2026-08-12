import React from 'react';
import { Link } from 'react-router-dom';
import ContentCardsV from '../General/ContentCardsV';
import Header from './Header';
import AllHospitals from './AllHospitals';
import FooterContainer from '../General/FooterContainer';
import FootersV from '../General/FootersV';
import Hosp from './Hosp';
import Navbar from './Navbar';
import { Card } from 'antd';
import axios from 'axios';
import { useState ,useEffect} from 'react';
import { useNavigate } from "react-router-dom";

const Patient_View = () => {
  const [waitingList, setWaitingList] = useState(-1);
  const navigate = useNavigate();
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

  const gothere =()=>{
    navigate("/waitingArea")
  }

  return (
    <>
      <div className="w-full relative bg-whitesmoke-400 flex flex-row items-start justify-start gap-[0px_32px] tracking-[normal] mq750:gap-[0px_32px] mq1025:pl-5 mq1025:pr-5 mq1025:box-border">
       <Navbar/>
        <main className="flex-1 flex flex-col items-start justify-start pt-5 px-0 pb-0 box-border max-w-[calc(100%_-_254px)] mq1025:max-w-full">
        
          <section className="self-stretch flex flex-col items-start justify-start gap-[30px_0px] max-w-full">
            <div className="self-stretch flex flex-col items-start justify-start gap-[22px_0px] max-w-full text-left text-xs text-navy-100 font-nunito">
              {/* Header section */}
              <Header />

            <div className='w-full py-10 text-center'>
            {(waitingList>=0) && (
                  <Card title="You are in a waiting queue, please join from here" className='w-full text-[20px] bg-gradient-to-l from-gray-200 via-fuchsia-200 to-stone-100'>
                  <button onClick={gothere} className='text-white bg-gradient-to-r w-full h-[70px] from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800  shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'>Click here to go to waiting area</button>
                  </Card>
                )}
            </div>

              <div className='h-full '>
                <ContentCardsV />
                <Hosp />
              </div>
            </div>
          </section>
        </main>
      </div>
      <div className='mt-[350px]'>
        <FootersV />
      </div>
    </>
  );
}

export default Patient_View;
