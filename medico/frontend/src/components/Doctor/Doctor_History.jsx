import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Rate, Button } from 'antd';
import NavbarDoc from './NavbarDoc';

const Doctor_History = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const profile = JSON.parse(localStorage.getItem("userProfile"));
      const id = profile.id
      try {
        const response = await axios.get(`${import.meta.env.REACT_APP_BACKEND_URL}/api/doctor/getAllConsultationOfDoc/${id}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const openDetailsPopup = (order) => {
    setSelectedOrder(order);
  };

  const closeDetailsPopup = () => {
    setSelectedOrder(null);
  };

  return (
    <>
      <div className="flex gap-4 bg-whitesmoke-400 overflow-hidden">
        <NavbarDoc />
        <main className="flex-1 p-5">
          <h1 className="text-3xl font-semibold mb-8 text-center">Appointment Summary</h1>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => (
              <div key={order.consultationId} onClick={() => openDetailsPopup(order)} className="bg-blue-400 text-white rounded-md p-6 cursor-pointer shadow-md hover:shadow-lg transition duration-300">
                <h2 className="text-lg font-semibold mb-4 text-white">Order #{order.consultationId}</h2>
                <div className="flex flex-row">
                  <div className='text-[20px]'>
                    <p><span className="font-semibold">Patient:</span> {order.patient.patName}</p>
                    <p><span className="font-semibold">Doctor:</span> {order.doctor.docName}</p>
                  </div>
                  <div className='ml-[2rem] text-[20px]'>
                    <p><span className="font-semibold">Date:</span> {order.date}</p>
                    <p><span className="font-semibold">Time:</span> {order.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {selectedOrder && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75">
              <div className="bg-white p-8 rounded-md">
                <button className="absolute top-8 right-8 text-white" onClick={closeDetailsPopup}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <h2 className="text-lg font-semibold mb-4 text-white">Order #{selectedOrder.consultationId}</h2>
                <div className="text-white">
                  <p><span className="font-extrabold">Patient:</span> {selectedOrder.patient.patName}</p>
                  <p><span className="font-extrabold">Doctor:</span> {selectedOrder.doctor.docName}</p>
                  <p><span className="font-extrabold">Date:</span> {selectedOrder.date}</p>
                  <p><span className="font-extrabold">Time:</span> {selectedOrder.time}</p>
                  <p><span className="font-extrabold">Amount Paid:</span> ₹ {selectedOrder.doctor.rate}</p>
                  <p><span className="font-extrabold">Prescription:</span> <button className='bg-mediumpurple-100 text-white font-bold rounded cursor-pointer'>Download</button></p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Doctor_History;
