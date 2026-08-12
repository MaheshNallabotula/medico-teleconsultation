import React from 'react'
import { useState,useEffect } from "react";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../../Context/AuthContext';
import axios from 'axios';
import jwtInterceptor from '../../../helper/jwtInterceptor';
import { CoffeeOutlined } from '@ant-design/icons';
import { Button, Upload, message, Modal,Input,Table } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { DownloadOutlined } from '@ant-design/icons';


import Navbar from './Navbar';
const Patient_Home = () => {
  const [messageIconChecked, setMessageIconChecked] = useState(true);
  const {patientProfile} = useContext(AuthContext)
  const {getPatientDetails} = useContext(AuthContext)
  const [patient, setPatient] = useState([]);
 const {logoutAPICall} = useContext(AuthContext)
 const [isEditModalOpen, setIsEditModalOpen] = useState(false);
 const [docStatus,setDocStatus] = useState("")
 const [documentName ,setDocumentName] = useState("")
 const [documents, setDocuments] = useState([]);

 const [editedDetails, setEditedDetails] = useState({
   
   editName:'',
   editBloodGroup:'',
   editPhone:''
  
 });

 //List of documents
 useEffect(() => {
  // Fetch documents from API
  fetchDocuments();
}, []);

const fetchDocuments = async () => {
  try {
    const profile = JSON.parse(localStorage.getItem('userProfile'));
    const id = profile.id;
    const response = await axios.get(`${import.meta.env.REACT_APP_BACKEND_URL}/api/patient/files/${id}`);
    const data =response.data;
    setDocuments(data);
  } catch (error) {
    console.error('Error fetching documents:', error);
  }
};

const columns = [
  {
    title: 'File Name',
    dataIndex: 'placeholder',
    key: 'fileName',
  },
  {
    title: 'Actions',
    key: 'actions',
    render: (text, record) => (
      <Button type='primary' icon={<DownloadOutlined />} onClick={() => handleDownload(record.fileName)}>
        Download
      </Button>
    ),
  },
];

const handleDownload = async (fileName) => {
  try {
    
    const response = await fetch(`${import.meta.env.REACT_APP_BACKEND_URL}/api/patient/downloadOnePatientFile/${fileName}`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    // anchor element to trigger the download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    // Append the link to the body and click it programmatically
    document.body.appendChild(link);
    link.click();
    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
    setModalVisible(true);
    setDocStatus(`Downloading ${fileName}`);
  } catch (error) {
    console.error('Error downloading file:', error);
  }
};


 //Upload Documents
 const [fileList, setFileList] = useState([]);
 const [modalVisible, setModalVisible] = useState(false);

 const handleUpload = async () => {
  try {
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('file', file.originFileObj); // Using 'file' as the key
    });

    console.log("FormData:", formData);
    if(documentName===""){return alert("Please insert the document name to continue.")}
    let res = await axios.post(`${import.meta.env.REACT_APP_BACKEND_URL}/api/patient/uploadPatientsFiles/${patientProfile.patientId}/${documentName}`, formData);
    console.log("Response:", res);
    setDocStatus(res.data)
    setModalVisible(true);
  } catch (error) {
    message.error('Failed to upload documents. Please try again.');
  }
};
const handleFileChange = ({ file, fileList }) => {
  console.log("File List:", fileList);
  setFileList(fileList);
};

const handleCloseModal = () => {
  setModalVisible(false);
};



 const openEditModal = () => {
  const heroElement = document.getElementById("hero");
    if (heroElement) {
      heroElement.style.visibility = "hidden";
    }
  // Fetch patient details or set existing details to editedDetails state
  setEditedDetails({
  editName:patientProfile.patName,
   editBloodGroup: patientProfile.patBloodGroup,
   editPhone:patientProfile.patPhoneNo
    // Set other fields as needed
  });
  
  setIsEditModalOpen(true);
  console.log(isEditModalOpen);
};

    const closeEditModal = async() => {
      
      setIsEditModalOpen(false);
      const heroElement = document.getElementById("hero");
    if (heroElement) {
      heroElement.style.visibility = "visible";
    }
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedDetails({ ...editedDetails, [name]: value });
    };

    const handleEdit = async(e) => {
      e.preventDefault();
     
      setEditedDetails({
        editName: '',
        editBloodGroup: '',
        editPhone: '',
      });

      let payload = {
          patientId:patientProfile.patientId,
          patName:editedDetails.editName,
          patBloodGroup:editedDetails.editBloodGroup,
          patPhoneNo:editedDetails.editPhone
      }
      let res = await axios.post(import.meta.env.REACT_APP_BACKEND_URL +"/api/patient/editPatientDetails",payload)
      console.log(res);
      closeEditModal();

    };


  useEffect(() => {
      getPatientDetails();
  }, []);
  return (
    <>
    
    
    <div id='hero' className="w-full  sticky  bg-whitesmoke-400 overflow-hidden flex flex-row items-start justify-start gap-[0px_32px] tracking-[normal] mq750:gap-[0px_32px] mq1025:pl-5 mq1025:pr-5 ">
   <div className=' h-full'> <Navbar/></div>
      <main className="flex-1 flex flex-col items-start justify-start pt-5 px-0 pb-0  max-w-[calc(100%_-_254px)] mq1025:max-w-full">
        <section className="self-stretch flex flex-col items-start justify-start gap-[30px_0px] max-w-full">
        <div className="self-stretch flex flex-col items-start justify-start gap-[22px_0px] max-w-full text-left text-xs text-navy-100 font-nunito">
      <div className="self-stretch flex flex-row items-start justify-start gap-[0px_5px] top-[0] z-[99] sticky max-w-full">
        <div className="flex-1 rounded-8xs bg-neutral-colors-white flex flex-row items-center justify-start p-[23px] box-border gap-[10px] max-w-full">
          <div className="h-[62px] w-[980px] relative rounded-8xs bg-neutral-colors-white hidden max-w-full" />
          <img
            className="h-3.5 w-3.5 relative object-cover z-[1]"
            alt=""
            src="/icon@2x.png"
          />
          <input
            className="w-[35px] [border:none] [outline:none] font-nunito text-xs bg-[transparent] h-4 relative text-navy-200 text-left inline-block z-[1]"
            placeholder="Search"
            type="text"
          />
        </div>
        <div className="w-[204px] flex flex-row items-center justify-between gap-[20px]">
          <div className="h-[60px] w-[140px] relative">
            <div className="absolute h-[calc(100%_-_0.3px)] top-[0px] bottom-[0.3px] left-[80px] w-[59.7px]">
              <div className="absolute w-[calc(100%_-_4.8px)] top-[7.3px] right-[2.4px] left-[2.4px] rounded-10xl-5 bg-goldenrod h-[52.4px]" />
              <img
                className="absolute top-[0px] left-[0px] rounded-[50%] w-full h-full object-cover z-[1]"
                loading="eager"
                alt=""
                src="/ellipse-58@2x.png"
              />
            </div>
            <div className="absolute top-[20px] left-[0px] w-[82px] flex flex-col items-start justify-start">
              <div className="self-stretch h-[17px] flex flex-row items-start justify-start pt-0 px-0 pb-0 box-border">
                <b className="mb-[-3px] h-[19.5px] flex-1 relative inline-block whitespace-nowrap">
                  {patientProfile.patName} 
                </b>
              </div>
              <button onClick={()=>{logoutAPICall()}} className="bg-white cursor-pointer w-16 relative text-3xs font-light inline-block box-border whitespace-nowrap pr-5">
                Log out
              </button>
            </div>
          </div>
          <div className="flex flex-col items-start justify-start pt-[9px] pb-0 pr-px pl-0">
            <img
              className="w-[21.1px] h-[20.3px] relative object-cover"
              loading="eager"
              alt=""
              src="/logout@2x.png"
            />
          </div>
        </div>
      </div>
      <div className="w-[1151px] h-[403px] relative rounded-3xs [background:linear-gradient(#fff,_#fff),_#c4c4c4] max-w-full text-11xl text-mediumpurple-200 mq450:h-auto mq450:min-h-[403]">
        <div className="absolute top-[0px] left-[0px] rounded-3xs [background:linear-gradient(#fff,_#fff),_#c4c4c4] w-full h-full hidden" />
        <div className="absolute top-[0px] left-[0px] w-full h-[313px]">
          <img
            className="absolute top-[133px] left-[56.3px] w-[179.8px] h-[179.8px] z-[2]"
            loading="eager"
            alt=""
            src="/img-bg.svg"
          />
          <div className="absolute top-[0px] left-[0px] w-full h-[280px]">
            <img
              className="absolute top-[0px] left-[0px] rounded-8xs w-full h-full object-cover"
              alt=""
              src="/xxx.jpg"
            />
            <button className="cursor-pointer [border:none] p-0 bg-neutral-colors-white absolute top-[199px] left-[925px] rounded-3xs w-[172px] h-[44.7px] whitespace-nowrap z-[2] hover:bg-gainsboro-100">
              <div className="absolute top-[0px] left-[0px] rounded-3xs bg-neutral-colors-white w-full h-full hidden" />
              <div className="absolute top-[12px] left-[24px] text-base font-semibold font-nunito text-mediumpurple-200 text-left inline-block w-32 h-5 z-[3]">
                Edit Cover Photo
              </div>
            </button>
          </div>
        </div>
        <div className="absolute top-[308px] left-[215px] w-[882px] flex flex-row items-center justify-between gap-[20px] max-w-full mq450:flex-wrap">
          <h2 className="m-0 h-[61.7px] w-[238.9px] relative text-inherit font-bold font-inherit inline-block shrink-0 z-[1] mq1025:text-5xl mq450:text-lg">
          {patientProfile.patName} 
          </h2>
          <div className="flex flex-col items-start justify-start pt-[5px] px-0 pb-0">
            <button className="cursor-pointer py-3 pr-[42px] pl-[45px] bg-[transparent] rounded-3xs flex flex-row items-center justify-center whitespace-nowrap z-[1] border-[1px] border-solid border-mediumpurple-200 hover:bg-slateblue-200 hover:box-border hover:border-[1px] hover:border-solid hover:border-slateblue-100">
              <div className="h-[44.7px] w-[172px] relative rounded-3xs box-border hidden border-[1px] border-solid border-mediumpurple-200" />
              <div onClick={openEditModal} className="relative text-base font-semibold font-nunito text-mediumpurple-200 text-left z-[2]">
                Edit Profile
              </div>
            </button>
           
          </div>
        </div>
      </div>

    </div>
    <div style={{fontFamily: '"Platypi", serif'}} className="w-[1117px] flex flex-row items-start justify-start py-0 pr-5 pl-0 box-border gap-[0px_75px] max-w-full text-left text-base text-navy-200 font-nunito mq750:gap-[0px_75px] mq1025:flex-wrap mq1125:gap-[0px_75px]">
      <div className="h-[399px] w-[260px] rounded-3xs bg-neutral-colors-white flex flex-col items-start justify-start  pb-[80px] pr-0.5 pl-[22px] box-border gap-[20px] min-w-[260px] mq1025:flex-1 mq450:pt-[25px] mq450:pb-[34px] mq450:box-border">
        <div className="w-[260px] h-[399px] relative rounded-3xs bg-neutral-colors-white hidden" />
        <div className="h-7 flex flex-row items-start justify-start pt-0 px-[3px] pb-2 box-border text-xl text-mediumpurple-200">
          <b className="self-stretch relative z-[1] mq450:text-base">About</b>
        </div>
        <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-[15px_0px]">
          <div className="flex flex-row items-start justify-start gap-[0px_4px]">
            <img
              className="h-6 w-6 relative overflow-hidden shrink-0 z-[1]"
              loading="eager"
              alt=""
              src="/person-1.svg"
            />
            <div className="flex flex-col items-start justify-start pt-0.5 px-0 pb-0">
              <div className="h-[15px] relative inline-block shrink-0 z-[1]">
              {patientProfile.patGender === 'M' ? 'Male' : 'Female'}
              </div>
            </div>
          </div>
          <div className="self-stretch h-0 flex flex-row items-start justify-start py-0 pr-0 pl-1 box-border">
            <div className="h-px flex-1 relative box-border opacity-[0.1] z-[1] border-t-[0.5px] border-solid border-text" />
          </div>
          <div className="flex flex-row items-center justify-start gap-[0px_6px]">
            <img
              className="h-6 w-6 relative overflow-hidden shrink-0 z-[1]"
              loading="eager"
              alt=""
              src="/cake.svg"
            />
            <div className="h-[15px] relative inline-block z-[1]">
            {patientProfile && patientProfile.patDob && patientProfile.patDob.split('T')[0]}
            </div>
          </div>
          <div className="self-stretch h-0 flex flex-row items-start justify-start py-0 pr-0 pl-[5px] box-border">
            <div className="h-px flex-1 relative box-border opacity-[0.1] z-[1] border-t-[0.5px] border-solid border-text" />
          </div>
        </div>
        <div className="h-12 flex flex-row items-start justify-start  px-1 pb-10 box-border">
          <div className="self-stretch flex flex-col items-start justify-start gap-[1px_0px]">
            <div className="flex flex-row items-start justify-start gap-[0px_13px]">
              <div className="flex flex-col items-start justify-start pt-1 px-0 pb-0">
                <img
                  className="w-3.5 h-[17px] relative object-cover z-[1]"
                  loading="eager"
                  alt=""
                  src="/location@2x.png"
                />
              </div>
              <div className="h-[17px] relative whitespace-pre-wrap inline-block z-[1]">
                2239 Hog Camp Road
              </div>
            </div>
            <div className="flex-1 flex flex-row items-start justify-start py-0 px-6">
              <div className="self-stretch relative z-[1]">Schaumburg</div>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-start justify-start py-0 px-1">
          <div className="flex flex-row items-start justify-start gap-[0px_8px]">
            <div className="flex flex-col items-start justify-start pt-[3px] px-0 pb-0">
              <input
                className="accent-mediumpurple-200 m-0 w-4 h-[15px] relative z-[1]"
                checked={messageIconChecked}
                type="checkbox"
                onChange={(event) =>
                  setMessageIconChecked(event.target.checked)
                }
              />
            </div>
            <div className="h-[15px] relative inline-block whitespace-nowrap z-[1]">
              {patientProfile.patEmail}
            </div>
          </div>
        </div>
        <div className="h-0 flex flex-row items-start justify-start py-0 pr-px pl-1 box-border">
          <img
            className="h-0 w-[231px] relative z-[1]"
            loading="eager"
            alt=""
            src="/line.svg"
          />
        </div>
        <div className="flex flex-row items-start justify-start py-0 px-1">
          <div className="flex flex-row items-start justify-start gap-[0px_8px]">
            <div className="flex flex-col items-start justify-start pt-0.5 px-0 pb-0">
              <img
                className="w-4 h-4 relative z-[1]"
                loading="eager"
                alt=""
                src="/call.svg"
              />
            </div>
            <div className="h-[15px] relative inline-block z-[1]">
              {patientProfile.patPhoneNo}
            </div>
          </div>
        </div>
      </div>
      <div  style={{fontFamily: '"Platypi", serif'}} className="flex-1 flex flex-col items-start justify-start pt-6 px-0 pb-0 box-border min-w-[495px] max-w-full text-base-1 text-black font-montserrat mq750:min-w-full">
        <div className="self-stretch flex flex-row items-start justify-start relative max-w-full">
          <div className="h-1 w-5 absolute my-0 mx-[!important] top-[42px] left-[227px] rounded-8xs bg-goldenrod" />
          <div className="flex-1 rounded-xl bg-neutral-colors-white overflow-hidden flex flex-col items-center justify-start pt-[49px] px-0 pb-0 box-border gap-[65px_0px] max-w-full z-[1] mq1025:gap-[65px_0px] mq450:gap-[65px_0px] mq450:pt-8 mq450:box-border">
            <div className="flex flex-row items-start justify-start py-0 pr-[3px] pl-0 box-border max-w-full">
              <div className="w-[401px] flex flex-col items-center justify-start gap-[36px_0px] max-w-full mq450:gap-[36px_0px]">
                <div className="flex flex-row items-start justify-start py-0 pr-0 pl-[3px]">
                  <div className="flex flex-col items-center justify-start gap-[12px_0px]">
                    <div className="relative">Upload Medical Documents</div>
                    <div className="w-[209.1px] relative text-3xs-8 text-gray-1200 text-center inline-block">{`Select relevant documents `}</div>
                  </div>
                </div>
                <div className="self-stretch rounded-[7.55px] flex flex-col items-center justify-center p-[42.272727966308594px] gap-[18.12px_0px] text-3xs-8 font-helvetica border-[0.8px] border-dashed border-gray-1400 mq450:pl-5 mq450:pr-5 mq450:box-border">
                  <img
                    className="w-[36.2px] h-[36.2px] relative overflow-hidden shrink-0"
                    loading="eager"
                    alt=""
                    src="/featheruploadcloud.svg"
                  />
                  <div className="flex flex-col items-center justify-center gap-[18.12px_0px]">
                    <div className="flex flex-col items-center justify-center gap-[9.06px_0px]">
                      <div className="relative">
                        Select a file or drag and drop here
                      </div>
                      <div className="relative text-3xs-1 text-gray-1300">
                        JPG, PNG or PDF, file size no more than 10MB
                      </div>
                    </div>
                    <div className="rounded-[3.77px] bg-gradient-to-r from-sky-500 to-indigo-500 flex flex-row items-center justify-start py-[9.058441162109375px] pr-2.5 pl-[12.077921867370605px] whitespace-nowrap text-5xs-5 text-steelblue-100 ">
                    <Upload
        fileList={fileList}
        onChange={handleFileChange}
        beforeUpload={() => false}
      >                       
                      <button icon={<UploadOutlined />} className="relative uppercase text-white border-none"> Select file</button>
                      </Upload>
                     
                    </div>
                    <Input
                      placeholder="Enter document name"
                      onChange={e => setDocumentName(e.target.value)}
                      value={documentName}
                    />
                  </div>
                  
                </div>
                <Table columns={columns} dataSource={documents} className='w-full font-extrabold ' />
              </div>
            </div>
            <div className="mt-[-70px] rounded-t-none rounded-b-[7.55px] bg-gradient-to-r from-sky-500 to-indigo-500 shadow-[0px_0.8px_0.75px_rgba(0,_0,_0,_0.1)_inset] overflow-hidden flex flex-row items-start justify-start py-[15px] pr-11 pl-[574px] gap-[0px_5px] mq750:flex-wrap mq1025:pl-[287px] mq1025:pr-[22px] mq1025:box-border mq450:pl-5 mq450:box-border">
              
              <button  onClick={handleUpload} className="cursor-pointer py-[9px] pr-[17px] pl-[18px] bg-neutral-colors-white rounded-[3.77px] shadow-[0px_0.8px_0.75px_rgba(0,_0,_0,_0.16)] flex flex-row items-center justify-center border-[0.8px] border-solid border-gray-1600 hover:bg-gainsboro-100 hover:box-border hover:border-[0.8px] hover:border-solid hover:border-darkslategray-200">
                <div className="relative text-2xs-6 capitalize font-helvetica text-gray-1500 text-left">
                  upload
                </div>
              </button>
              
              <Modal
        title="Upload Successful"
        visible={modalVisible}
        onOk={handleCloseModal}
        onCancel={handleCloseModal}
      >
        <p className=' text-green-500 text-start font-bold'>{docStatus}</p>
      </Modal>
            </div>
           
          </div>
        </div>
      </div>
    </div>
        </section>
      </main>
    </div>
   {/* Edit profile prompt */}
   {isEditModalOpen && (
        <div className=" fixed inset-0 flex items-center justify-center bg-gradient-to-r from-sky-500 to-indigo-500  ">
          <div className="bg-white rounded-lg p-8 w-96">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <form onSubmit={handleEdit}>
              <div className="mb-4">
                <label htmlFor="editName" className="block text-sm font-semibold">Name:</label>
                <input
                  type="text"
                  id="editName"
                  name="editName"
                  value={editedDetails.editName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="editBloodGroup" className="block text-sm font-semibold">Blood Group:</label>
                <input
                  type="text"
                  id="editBloodGroup"
                  name="editBloodGroup"
                  value={editedDetails.editBloodGroup}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="editPhone" className="block text-sm font-semibold">Phone Number:</label>
                <input
                  type="text"
                  id="editPhone"
                  name="editPhone"
                  value={editedDetails.editPhone}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mt-1"
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Submit</button>
                <button onClick={closeEditModal} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Patient_Home