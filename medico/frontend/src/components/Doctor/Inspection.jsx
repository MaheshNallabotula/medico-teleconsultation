import React, { useState, useEffect } from 'react';
import { Layout, Typography, List, Avatar, Button, Space, Modal } from 'antd';
import NavbarDoc from './NavbarDoc';
import axios from 'axios';

const { Content } = Layout;
const { Title } = Typography;

const Inspection = () => {
  const [juniorDoctors, setJuniorDoctors] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [doctorRecords, setDoctorRecords] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = JSON.parse(localStorage.getItem('userProfile'));
        const id = profile.id;
        const response = await axios.get(`${import.meta.env.REACT_APP_BACKEND_URL}/api/doctor/getJrDoctorsOfSrDoctor/${id}`);
        setJuniorDoctors(response.data);
      } catch (error) {
        console.error('Error fetching junior doctors:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const handleInspectRecords = async (docId) => {
    try {
      const response = await axios.get(`${import.meta.env.REACT_APP_BACKEND_URL}/api/doctor/getAllConsultationOfDoc/${docId}`);
      setDoctorRecords(response.data);
      setModalVisible(true);
    } catch (error) {
      console.error('Error fetching doctor records:', error);
    }
  };

  return (
    <div className="flex gap-4  overflow-hidden">
      <NavbarDoc />
      <main className="flex-1 p-5">
        <Layout className=' bg-blue-400 shadow-3xl rounded-md ' style={{ padding: '24px' }}>
          <Content>
            <Title style={{ fontWeight: 'bold', color: '#333', marginBottom: '24px' }} level={2}>Junior Doctors Assigned</Title>
            <List    
              itemLayout="horizontal"
              dataSource={juniorDoctors}
              renderItem={juniorDoctor => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src="/doctor2.jpg" size={64} />}
                    title={<a style={{ color: '#333', fontWeight: 'bold', fontSize: '20px', textDecoration: 'none' }} href={`/doctor/${juniorDoctor.docId}`}>{juniorDoctor.docName}</a>}
                    description={
                      <Space className='text-white font-normal' direction="vertical" style={{ color: '#555', fontSize: '16px' }}>
                        <div>Speciality: {juniorDoctor.speciality.specialityName}</div>
                        <div>Hospital: {juniorDoctor.hospital ? juniorDoctor.hospital.hospitalName : "Not found"}</div>
                        <div>Phone: {juniorDoctor.phoneNo}</div>
                      </Space>
                    }
                  />
                  <Button className='font-extrabold py-[5px] text-[20px]' type="primary" onClick={() => handleInspectRecords(juniorDoctor.docId)}>Inspect Records</Button>
                </List.Item>
              )}
            />
          </Content>
        </Layout>
        <Modal
          title="Doctor Records"
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={null}
        >
          <List
            itemLayout="horizontal"
            dataSource={doctorRecords}
            renderItem={record => (
              <List.Item>
                  <div>Patient Name: {record.patient.patName}</div>
                      <div>Date: {record.date}</div>
                      <div>Time: {record.time}</div>
              </List.Item>
            )}
          />
        </Modal>
      </main>
    </div>
  );
}

export default Inspection;

