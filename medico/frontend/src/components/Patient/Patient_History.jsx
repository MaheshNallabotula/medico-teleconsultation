import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import axios from 'axios';
import { Rate, Input, Button, Modal } from 'antd';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const Patient_History = () => {
  const { TextArea } = Input;
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [rating, setRating] = useState(0);
  const [isRated, setIsRated] = useState(false);
  const [review, setReview] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      const patId = parseInt(localStorage.getItem('patId'));
      try {
        const response = await axios.get(`${import.meta.env.REACT_APP_BACKEND_URL}/api/patient/getAllConsultationsOfPat/${patId}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const openDetailsPopup = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const closeDetailsPopup = () => {
    setSelectedOrder(null);
    setModalVisible(false);
  };

  const handleRateChange = (value) => {
    setRating(value);
    setIsRated(false);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
    setIsRated(false);
  };

  const handleDownload = async () => {
    try {
        const response = await axios.get(`${import.meta.env.REACT_APP_BACKEND_URL}/api/patient/downloadPrescription/${selectedOrder?.consultationId}`, {
            responseType: 'arraybuffer', // Set responseType to 'arraybuffer'
        });
        let uint8Array = new Uint8Array(response.data);
        let stringifiedArray = uint8Array.reduce((data, byte) => data + String.fromCharCode(byte), '');
        let parsedObject = JSON.parse(stringifiedArray);

        const pdf = new jsPDF();
        const logoUrl = '/logo.png'; // Your logo URL
        const logoData = await getBase64Image(logoUrl);

        pdf.addImage(logoData, 'PNG', 10, 10, 30, 30); // Add logo
        pdf.setTextColor(255, 0, 0); // Set text color to red
        pdf.setFontSize(18); // Set font size for headings
        pdf.text('Medico Prescription', 50, 20); // Add website name
        pdf.setFontSize(12); // Reset font size
        pdf.setTextColor(0); // Reset text color
        pdf.text(`Patient: ${selectedOrder?.patient.patName}`, 10, 50); // Add patient name
        pdf.text(`Doctor: ${selectedOrder?.doctor.docName}`, 10, 60); // Add doctor name
        pdf.text(`Date: ${selectedOrder?.date}`, 10, 70); // Add date
        pdf.text(`Time: ${selectedOrder?.time}`, 10, 80); // Add time

        // Add observations
        if (parsedObject.observations) {
            pdf.setFont('helvetica', 'italic'); // Set font style to italic for observations
            pdf.text('Observations:', 10, 100);
            pdf.setFont('helvetica', 'normal'); // Reset font style
            pdf.text(parsedObject.observations, 10, 110);
        }

        // Add medicines and dosages
        if (parsedObject.medicinesAndDosages.length > 0) {
            // If medicines are prescribed, add them in a table
            pdf.setTextColor(0, 0, 255); // Set text color to blue for medicines
            pdf.text('Medicines Prescribed:', 10, 130);
            pdf.setTextColor(0); // Reset text color
            const medicinesData = parsedObject.medicinesAndDosages.map(item => [item.medicine, item.dosage]);
            pdf.autoTable({
                startY: 140,
                head: [['Medicine', 'Dosage']],
                body: medicinesData,
                theme: 'grid', // You can change the theme as per your preference
            });
        } else {
            // If no medicines prescribed, display a message
            pdf.setTextColor(255, 0, 0); // Set text color to red
            pdf.text('No medicines prescribed', 10, 130);
        }

        pdf.save(`prescription_${selectedOrder?.consultationId}.pdf`);
    } catch (error) {
        console.error('Error downloading file:', error);
    }
};



  
  

  const getBase64Image = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.height = img.naturalHeight;
        canvas.width = img.naturalWidth;
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/png');
        resolve(dataURL);
      };
      img.onerror = function (error) {
        reject(error);
      };
      img.src = url;
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post(import.meta.env.REACT_APP_BACKEND_URL +'/api/patient/setRating', {
        consultationId: selectedOrder.consultationId,
        rating: rating,
        review: review,
      });
      setIsRated(true);
    } catch (error) {
      console.error('Error submitting rating and review:', error);
    }
  };

  return (
    <>
      <div className="flex gap-4 bg-gray-100 min-h-screen">
        <Navbar />
        <main className="flex-1 p-5">
          <h1 className="text-3xl font-semibold mb-8 text-center">Appointment History</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {orders.map((order) => (
              <div
                key={order.consultationId}
                onClick={() => openDetailsPopup(order)}
                className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition duration-300 relative"
              >
                <div className="bg-gradient-to-b from-blue-400 to-blue-500 px-6 py-4 text-white ">
                  <h2 className="text-[30px] font-extrabold text-white ">Order #{order.consultationId}</h2>
                  <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs">Completed</span>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 font-bold "><span className="font-extrabold">Patient:</span> {order.patient.patName}</p>
                  <p className="text-gray-600 font-bold "><span className="font-extrabold">Doctor:</span> {order.doctor.docName}</p>
                  <p className="text-gray-600 font-bold "><span className="font-extrabold">Date:</span> {order.date}</p>
                  <p className="text-gray-600 font-bold "><span className="font-extrabold">Time:</span> {order.time}</p>
                </div>
              </div>
            ))}
          </div>
          <Modal
            title={`Order #${selectedOrder?.consultationId}`}
            visible={modalVisible}
            onCancel={closeDetailsPopup}
            footer={null}
            className="max-w-md "
          >  
            <p className="text-[25px] font-bold mb-4">Appointment Details</p>
            <p><span className="font-semibold ">Patient:</span> {selectedOrder?.patient.patName}</p>
            <p><span className="font-semibold ">Doctor:</span> {selectedOrder?.doctor.docName}</p>
            <p><span className="font-semibold ">Date:</span> {selectedOrder?.date}</p>
            <p><span className="font-semibold ">Time:</span> {selectedOrder?.time}</p>
            <p><span className="font-semibold ">Amount Paid:</span> ₹ {selectedOrder?.doctor.rate}</p>
            <p><span className="font-semibold">Prescription:</span> <button onClick={handleDownload} className='bg-blue-500 text-white font-semibold rounded p-1 cursor-pointer'>Download</button></p>
            {selectedOrder?.doctor.rating !== null ? (
              <p>You have already rated this doctor.</p>
            ) : (
              <div>
                <p className="text-lg font-semibold mt-6">Rate the doctor:</p>
                <Rate
                  onChange={handleRateChange}
                  className='text-purple-600 mt-2'
                  allowHalf
                  defaultValue={2.5}
                />
                <p className="text-lg font-semibold mt-4">Write a review:</p>
                <TextArea
                  rows={4}
                  value={review}
                  onChange={handleReviewChange}
                  className="mt-2"
                />
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  className="mt-4"
                >
                  Submit
                </Button>
                {isRated && (
                  <p className="mt-2 text-green-600">Thank you for your feedback!</p>
                )}
              </div>
            )}
          </Modal>
        </main>
      </div>
    </>
  );
};

export default Patient_History;
