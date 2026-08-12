import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../../../Context/AuthContext';
import Header from './Header';
import Navbar from './Navbar';
import { Card, Button, Modal } from 'antd';
import { DatePicker, Space } from 'antd';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { notification } from 'antd'


const BookSlot = () => {
    const navigate = useNavigate();
    const { appointment } = useContext(AuthContext);
    const [dateString, setDateString] = useState('');
    const [showModal, setShowModal] = useState(false);
  const [clicked, setClicked] = useState(true)
    useEffect(() => {
        const fetchData = async () => {
            if (dateString) {
                localStorage.setItem('dateChoosed', dateString);
                const id = localStorage.getItem('doctor');
                const payload = {
                    docId: id,
                    date: dateString
                };
                await appointment(payload);
            }
        };

        fetchData();
    }, [dateString]);
    
    const onChange = (date, dateString) => {
        setDateString(dateString);
    };

    const handleSlotSelection = (slot) => {
        if (!dateString) {
            setShowModal(true);
        } else {
            localStorage.setItem('slotChoosen', slot);
            navigate('/bookAppointment');
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleQueue = async () => {
        const docId = parseInt(localStorage.getItem('doctor'));
        const profile = JSON.parse(localStorage.getItem('userProfile'));
        const currentDate = new Date();
        const dateString = currentDate.toISOString().split('T')[0];
        const hours = String(currentDate.getHours()).padStart(2, '0');
        const minutes = String(currentDate.getMinutes()).padStart(2, '0');
        const timeString = `${hours}:${minutes}`;
        
        let payload2 = {
            patientID: profile.id,
            docID: docId,
            consultationDate: dateString,
            consultationTime: timeString
        };
    
        try {
            const response2 = await axios.post(import.meta.env.REACT_APP_BACKEND_URL +"/api/patient/bookConsultation", payload2);
            console.log(response2.data);
            const consultation = response2.data.consultationId;
            
            const id = profile.id;
            let payload = {
                docId: docId,
                patientId: id,
                consultationId: consultation
            };
    
            const response = await axios.post(`${import.meta.env.REACT_APP_BACKEND_URL}/api/patient/enterIntoQueue`, payload);
            
            if (response) {
                localStorage.setItem("queuedDoctorId", docId);
                console.log("Doctor ID set:", docId);
                notification.success({
                    message: 'You have entered in the queue please wait for your turn.',
                    duration: 15
                  });
                navigate("/waitingArea")
            }
        } catch (error) {
            console.error("Error occurred:", error);
        }
    };

    return (
        <div className="flex">
            <Navbar />
            <main className="flex-1 flex flex-col items-start justify-start p-5 max-w-[calc(100%_-_254px)]">
                <section className="flex flex-col items-start justify-start gap-6 w-full">
                    <Header />
                    <h1 className='w-full text-center relative  shadow-2xl rounded-lg   bg-blue-400 p-[10px]'>Choose the slot which suits you best!</h1>  

                    <div className="text-center items-center justify-center ml-[500px]">
                        <Space direction="vertical" size={12} className='relative right-[240px] top-[70px]'>
                            <DatePicker className='text-center font-bold bg-slate-300 text-white ' onChange={onChange} needConfirm />
                        </Space>
                        
                    </div>
                    <div className="mt-8">
                        
                        <div className="flex justify-center gap-10 relative left-[20%] font-bold ">
                            <div className='flex flex-col gap-10 text-center pt-[40px] '>

                            <div className='relative right-[60px] text-[20px] font-extrabold text-black'>Elite Calls (Scheduled Appointments)</div>

                            <div  className='flex flex-row gap-[50px] pb-[30px] relative right-[90px]  '>    
                            <Card
                                className='w-64 font-extrabold bg-slate-100'
                                title="Morning Slot"
                                hoverable
                                onClick={() => handleSlotSelection('morning')}
                            >
                                <p className='font-bold'>Between 9:30 am to 11:30am</p>
                                <Button type="primary">Select</Button>
                            </Card>
                            <Card
                                className='w-64 bg-slate-100'
                                title="Evening Slot"
                                hoverable
                                onClick={() => handleSlotSelection('evening')}
                            >
                                <p className='font-bold'>Between 3:00pm to 8:30pm</p>
                                <Button type="primary">Select</Button>
                            </Card>
                            </div>
                        <div className='text-center relative bottom-[365px] left-[480px] font-extrabold '>
                            <div className='py-[20px] text-[20px] text-black'>  General Calls (Queued Appointments)</div>
                            <Card
                                className='w-64 relative left-[160px] pt-[20px] bg-slate-100'
                                title="Noon Slot"
                                hoverable
                                onClick={handleQueue}
                            >
                                <p className='font-bold'>Between 12:00pm to 3:00 pm</p>
                                <Button type="primary">Select</Button>
                            </Card>
                            </div>
                        </div>
                        </div>
                    </div>
                </section>
            </main>
            <Modal
                title="Please Select a Date First"
                visible={showModal}
                onCancel={handleCloseModal}
                footer={[
                    <Button key="ok" type="primary" onClick={handleCloseModal}>
                        OK
                    </Button>
                ]}
            >
                <p>You must select a date before choosing an appointment slot.</p>
            </Modal>
        </div>
    );
}

export default BookSlot;
