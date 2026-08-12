import React, { useState, useEffect } from 'react';
import moment from 'moment'; // for date and time manipulation
import axios from 'axios';
import { Table, Button } from 'antd';
import Header from './Header';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
const Appointments = () => {
  const [consultations, setConsultations] = useState([]);

  useEffect(() => {
    // Fetch data from the API endpoint
    fetchData();
  }, []);

  const storeId = (value,value2)=>{
       console.log("doc id stored is",value);
       localStorage.setItem("detailToDisplayOnVideoCall",JSON.stringify(value2))
       localStorage.setItem("consulId",value);
  }


  const fetchData = async () => {
    try {
      const patId = (localStorage.getItem('patId'));
      const response = await axios.get(`${import.meta.env.REACT_APP_BACKEND_URL}/api/patient/getAllConsultationsOfPat/${patId}`);
      const data = response.data;

      setConsultations(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const calculateTimeRemaining = (date, time) => {
    const consultationDateTime = moment(`${date} ${time}`);
    const now = moment();
    const duration = moment.duration(consultationDateTime.diff(now));

    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
  };

  const columns = [
    {
      title: 'Doctor',
      dataIndex: 'doctor',
      key: 'doctor',
      render: doctor => <strong>{doctor.docName}</strong>,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        moment().isBefore(moment(`${record.date} ${record.time}`)) ? (
          <div>
            You can join in: <span className='font-semibold '>{calculateTimeRemaining(record.date, record.time)}</span> 
          </div>
        ) : moment().isBefore(moment(`${record.date} ${record.time}`).add(30, 'minutes')) ? (
          <Button  className=' bg-mediumpurple-100'>
          <Link onClick={storeId(consultations[0].doctor.docId,consultations[0])} to="/videoCallPatient"> Join Now </Link> 
          </Button>
        ) : null
      ),
    },
  ];

  return (
    <div className="w-full relative bg-whitesmoke-400 overflow-hidden flex flex-row items-start justify-start gap-[0px_32px] tracking-[normal] mq750:gap-[0px_32px] mq1025:pl-5 mq1025:pr-5 mq1025:box-border">
    <Navbar />
    <main className="flex-1 flex flex-col items-start justify-start pt-5 px-0 pb-0 box-border max-w-[calc(100%_-_254px)] mq1025:max-w-full">
      <section className="self-stretch flex flex-col items-start justify-start gap-[30px_0px] max-w-full">
        <div className="self-stretch flex flex-col items-start justify-start gap-[22px_0px] max-w-full text-left text-xs text-navy-100 font-nunito">
          <Header />
        </div>
        <div>
      <h1>Upcoming Consultations</h1>
      <Table style={{ backgroundColor: 'blue' }} dataSource={consultations} columns={columns} pagination={false} />
    </div>
      </section>
    </main>
  </div>
    
  );
};

export default Appointments;