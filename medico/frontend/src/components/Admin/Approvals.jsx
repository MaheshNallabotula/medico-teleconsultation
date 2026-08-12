import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button,Card } from 'antd';
import Navbar_Admin from './Navbar_Admin';

const Approvals = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    // Fetch the list of doctors when the component mounts
    const profile = JSON.parse(localStorage.getItem("userProfile"));
    const id = profile.id
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${import.meta.env.REACT_APP_BACKEND_URL}/api/admin/getAppliedDoctorsList/${id}`);
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []); // Empty dependency array ensures the effect runs only once

  const handleApproval = async (docId, accept) => {
    try {
      // Call the acceptOrRejectDoctor API with the appropriate payload
      await axios.post(import.meta.env.REACT_APP_BACKEND_URL +'/api/admin/acceptOrRejectDoctor', {
        docId: docId,
        accept: accept,
      });
      // Update the UI after approval/rejection
      setDoctors(prevDoctors => prevDoctors.filter(doc => doc.docId !== docId));
    } catch (error) {
      console.error('Error approving/rejecting doctor:', error);
    }
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'docName',
      key: 'docName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNo',
      key: 'phoneNo',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <span>
          <Button type="primary" className='mx-3' onClick={() => handleApproval(record.docId, true)}>Approve</Button>
          <Button type="primary" danger onClick={() => handleApproval(record.docId, false)}>Reject</Button>
        </span>
      ),
    },
  ];

  return (
    <div className="flex h-screen">
      <Navbar_Admin />
      <main className="flex-1 p-5 overflow-auto">
        <Card title={<span style={{ fontSize: '40px' }}>Doctor's Approval</span>} className=' bg-slate-300'>
       
        <Table  columns={columns} dataSource={doctors} pagination={false} />
        </Card>
      </main>
    </div>
  );
};

export default Approvals;
