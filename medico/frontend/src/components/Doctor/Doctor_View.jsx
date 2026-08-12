import React, { useState, useEffect, useContext, useRef } from 'react';
import { NavbarDoc } from './NavbarDoc';
import HeaderDoc from './HeaderDoc';
import AuthContext from '../../../Context/AuthContext';
import { Table, Card, Space, Divider,Button } from 'antd';
import axios from 'axios';
import Chart from 'chart.js/auto';
import './style.css';
import BarChart from '../Patient/BarChart';
import { Modal,Select } from 'antd';
import { useNavigate } from "react-router-dom";


const Doctor_View = () => {
    const navigate = useNavigate();
    const { getDocConsultation, docConsultation } = useContext(AuthContext);
    const [monthlyData, setMonthlyData] = useState({});
    const chartRef = useRef(null);
    const [consultations, setConsultations] = useState([]);
    const [doctorDetails, setDoctorDetails] = useState({});
    const [hospitals, setHospitals] = useState([]);
    const [selectedHospital, setSelectedHospital] = useState('');
    const isDoctorSenior = localStorage.getItem("isDoctorSenior")
    const specialityOfDoctor = localStorage.getItem("specialityOfDoctor")
    const [seinor,setSenior]= useState(0)

    useEffect(() => {
      // Fetch doctor details
      const fetchDoctorDetails = async () => {
        const profile = JSON.parse(localStorage.getItem('userProfile'));
            const id = profile.id;
          try {
              const response = await axios.get(`${import.meta.env.REACT_APP_BACKEND_URL}/api/doctor/getDoctorDetails/${id}`);
              if(response.data.isSenior){
                 setSenior(1)
              }
              setDoctorDetails(response.data);
          } catch (error) {
              console.error('Error fetching doctor details:', error);
          }
      };

      // Fetch hospitals
      const fetchHospitals = async () => {
          try {
              const response = await axios.get(import.meta.env.REACT_APP_BACKEND_URL +'/api/patient/getAllHospitals');
              setHospitals(response.data);
          } catch (error) {
              console.error('Error fetching hospitals:', error);
          }
      };

      fetchDoctorDetails();
      fetchHospitals();
  }, []);

  const handleHospitalChange = (value) => {
      setSelectedHospital(value);
  };

  const handleJoinHospital = async() => {
    // Handle join hospital logic here
    const profile = JSON.parse(localStorage.getItem('userProfile'));
    const id = profile.id;
    console.log('Join Hospital:', selectedHospital);

    try {
        const response = await axios.get(`${import.meta.env.REACT_APP_BACKEND_URL}/api/doctor/applyToHospital/${id}/${selectedHospital}`);
        console.log(response.data);
        Modal.success({
            title: 'Request Sent!',
            content: 'Your request to join the hospital has been sent to the admin. Please wait for the approval. Thank you!!',
        });
    } catch (error) {
        console.error('Error fetching hospitals:', error);
        Modal.error({
            title: 'Error',
            content: 'An error occurred while sending the request. Please try again later.',
        });
    }
};

  const handleResignHospital = () => {
      // Handle resign hospital logic here
      console.log('Resign from Hospital');
  };

    useEffect(() => {
        const fetchData = async () => {
            const profile = JSON.parse(localStorage.getItem('userProfile'));
            const id = profile.id;
            try {
                const response = await axios.get(`${import.meta.env.REACT_APP_BACKEND_URL}/api/doctor/getPendingConsultationsOfDoc/${id}`);
                console.log(response.data);
                setConsultations(response.data);
            } catch (error) {
                console.error('Error fetching consultations:', error);
            }
        };

        fetchData();
    }, []);

    const dataSource = consultations.map((consultation, index) => ({
        key: index.toString(),
        patientName: consultation.patient.patName,
        date: consultation.date,
        time: consultation.time,
    }));


    const columns = [
        {
            title: 'Patient Name',
            dataIndex: 'patientName',
            key: 'patientName',
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
    ];

    useEffect(() => {
        getDocConsultation();
    }, []);

    useEffect(() => {
        const data = {};
        docConsultation.forEach((consultation) => {
            const date = new Date(consultation.date);
            const month = date.toLocaleString('default', { month: 'long' });
            if (!data[month]) {
                data[month] = 0;
            }
            data[month]++;
        });

        setMonthlyData(data);
    }, [docConsultation]);

    useEffect(() => {
        if (chartRef.current !== null) {
            chartRef.current.destroy();
        }

        const ctx = document.getElementById('consultationsBarGraph');
        if (ctx) {
            chartRef.current = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: Object.keys(monthlyData),
                    datasets: [
                        {
                            label: 'Number of Consultations',
                            data: Object.values(monthlyData),
                            backgroundColor: '#7900dc',
                            borderColor: '#7900dc',
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            });
        }
    }, [monthlyData]);

    const inspect=()=>{
          navigate("/inspection")
    }

    return (
        <>
            <div className="w-full relative bg-gray-100  flex flex-row items-start justify-start gap-0 tracking-normal">
                <NavbarDoc />
                <main className="flex-1 flex flex-col items-start justify-start pt-5 px-5 pb-0 box-border max-w-[calc(100% - 254px)]">
                    <section className="self-stretch flex flex-col items-start justify-start gap-5 max-w-full">
                        <div className="self-stretch flex flex-col items-start justify-start gap-5 max-w-full text-left text-xs text-navy-100 font-nunito">
                            <HeaderDoc />
                        </div>

               {/* Join Hospital and Senior Doctor */}

                    <div className='w-full flex flex-row gap-4'>

                        <Card title="Join/Resign from Hospital" className=" text-center w-[90%] ml-[40px]  bg-gradient-to-tr from-sky-300 via-sky-400 to-blue-500">
            {doctorDetails.hospitalName === null ? (
                <>
                    <div className="text-center"><span className='text-blue-900 font-extrabold text-[20px]'> Select the Hospital you want to Join: </span></div>
                    <Select
                        className="w-full"
                        placeholder="Select Hospital"
                        onChange={handleHospitalChange}
                        value={selectedHospital}
                    >
                        {hospitals.map((hospital) => (
                            <Option key={hospital.id} value={hospital.hospitalId}>
                                {hospital.hospitalName}
                            </Option>
                        ))}
                    </Select>
                    <Button type="primary" className="mt-3 font-bold" onClick={handleJoinHospital}>
                        Join Hospital
                    </Button>
                </>
            ) : (
                 <div>
                  <div className='text-center pb-[10px] '> Doctor in <span className='text-[20px] font-extrabold text-blue-600'> {doctorDetails.hospitalName} Hospital</span> </div>
                <Button type="primary" danger className='w-full h-[50px] font-bold ' onClick={handleResignHospital}>
                    Resign from Hospital
                </Button>
                </div>
            )}
        </Card>

        {seinor && (
              <div className='w-full text-center'>
                <Card title="Senior Doctor Inspection" className=' bg-gradient-to-tr from-sky-300 via-sky-400 to-blue-500'>
                    <div className='font-extrabold text-white text-[20px]'>
                        <div className='text-blue-900'>You can inspect the senior doctors of your specializtion</div>
                        <div>Specialization : <span className=' text-[25px]'>{specialityOfDoctor}</span></div>
                        <Button onClick={inspect} type='primary' className='font-bold mt-[20px]'>Inspect</Button>
                    </div>

                </Card>
              </div>
        )}

        </div>


       
                        <Card title="Upcoming Appointments" className="text-center ml-10    bg-gradient-to-tr from-sky-300 via-sky-400 to-blue-500" style={{ width: '97%' }}>
                            <Table dataSource={dataSource} columns={columns} pagination={false} />
                        </Card>
                        <Card title="Past Appointment Stats" className=" text-center bg-gradient-to-l from-gray-200 via-fuchsia-200 to-stone-100 ml-10" style={{ width: '90%' }}>
                            <Divider orientation="left">Number of Consultations</Divider>
                            <div style={{ width: '100%', height: '400px' }}>
                                <canvas id="consultationsBarGraph"></canvas>
                            </div>
                        </Card>
                    </section>
                </main>
            </div>
        </>
    );
};

export default Doctor_View;
