import React, { useEffect, useState } from 'react';
import { Modal,Button,Input } from 'antd';
import { Socket } from 'socket.io-client';
import axios from 'axios';
const Prescription = ({ open, onCancel, onUpload }) => {
  const [medicines, setMedicines] = useState([{ medicine: '', dosage: '' }]);
  const [observations, setObservations] = useState('');
  const [remarks, setRemarks] = useState('');
  const [doctor,setDoctor] = useState([])
  const currentDate = new Date();
  const dateString = currentDate.toISOString().split('T')[0];
const timeString = currentDate.toTimeString().split(' ')[0];

const dateTimeString = `${dateString} ${timeString}`;
   useEffect(()=>{
    const fetchdata = async()=>{
    const profile = JSON.parse(localStorage.getItem('userProfile'));
    const id = profile.id;
    let apiResponse = await axios.get(`${import.meta.env.REACT_APP_BACKEND_URL}/api/doctor/getDoctorDetails/${id}`)
    setDoctor(apiResponse.data)
    console.log(doctor);}

    fetchdata()
   },[])
  const handleMedicineChange = (index, key, value) => {
    const updatedMedicines = [...medicines];
    updatedMedicines[index][key] = value;
    setMedicines(updatedMedicines);
  };

  const addMedicineField = () => {
    setMedicines([...medicines, { medicine: '', dosage: '' }]);
  };

  const handleObservationsChange = (event) => {
    setObservations(event.target.value);
  };

  const handleRemarksChange = (event) => {
    setRemarks(event.target.value);
  };
//Earlier add remarks
  const handleUpload = () => {
    const conId = localStorage.getItem("consultId")
    const payload = {
      consultationId:conId,
      observations: observations,
      medicinesAndDosages: medicines,
      remarks: null
    };
    onUpload(payload);
  };

  return (
    <Modal
      title="Prescription"
      open={open}
      onClose={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>Cancel</Button>,
        <Button key="upload" type="primary" onClick={handleUpload}>Upload</Button>
      ]}
    >
        <h3>Medico</h3>
        <div className='flex flex-col  items-center text-[15px]'>
            <div>Doctor: <span className='font-bold'>{doctor?doctor.docName:"NOT FOUND"}</span></div>
            <div>Date  <span className='font-bold'>{timeString}</span> </div>
            <div>Time  <span className='font-bold'>{dateString}</span> </div>

        </div>
      <div>
        <label>Observations:</label>
        <Input.TextArea rows={4} value={observations} onChange={handleObservationsChange} />
      </div>
      {medicines.map((medicine, index) => (
        <div key={index}>
          <label>Medicine:</label>
          <Input
            type="text"
            value={medicine.medicine}
            onChange={(e) => handleMedicineChange(index, 'medicine', e.target.value)}
          />
          <label>Dosage:</label>
          <Input
            type="text"
            value={medicine.dosage}
            onChange={(e) => handleMedicineChange(index, 'dosage', e.target.value)}
          />
        </div>
      ))}
      <Button onClick={addMedicineField}>+ Add Medicine</Button>
      <div>
        <label>Remarks:</label>
        <Input.TextArea rows={4} value={remarks} onChange={handleRemarksChange} />
      </div>
    </Modal>
  );
};

export default Prescription;
