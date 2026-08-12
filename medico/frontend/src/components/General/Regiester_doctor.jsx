import React, { useEffect,useState } from 'react'
import { Link,useNavigate,useLocation } from 'react-router-dom'
import { Select } from 'antd';
import AuthContext from '../../../Context/AuthContext';
import { useContext } from 'react';
import { DatePicker, Space } from 'antd';
import { Flex, Radio } from 'antd';
import { Checkbox } from 'antd';
import axios from 'axios';

const Regiester_doctor = () => {
    const [spec,setSpec] = useState([])
    const [specId,setSpecId] = useState(0)
    useEffect(()=>{
          const fetchData=async()=>{
              let apiResponse = await axios.get(import.meta.env.REACT_APP_BACKEND_URL+"/api/home/allSpecialities")
              setSpec(apiResponse.data)
          }
          fetchData()
    },[])
   
   
    const [user,setUser]=useState('');
    const [pwd,setPwd]=useState('');
      const navigate = useNavigate()
      const location = useLocation()
     const [phoneNo,setPhoneNo] = useState('')
      const [docDob,setDocDob] = useState('')
      const [docName,setdocName]=useState('');
      const [docEmail,setdocEmail] = useState('');
      const [gender,setGender]=useState('M')
      const [docPassword,setdocPassword] = useState('');
      const {registerDoc} = useContext(AuthContext)
      const plainOptions = ['M', 'F', 'O'];

      function handleChange(value) {
        console.log('Selected:', value);
        setGender(value);
      }
      const radioStyle = {
        color: 'white',
    };

      const onChange = (e) => {
        console.log(`radio checked: ${e.target.value}`);
    };
    
      
      const dob = (date, dateString) => {
        console.log(date, dateString);
        setDocDob(dateString)
      };

  
      const handleRegister_doctor=async (e)=>{
             e.preventDefault();
             console.log("register him");
             let payload={
              docName:docName,
              docDob:docDob,
              phoneNo:phoneNo,
              gender:gender,
              rate: 100.0,
              email:docEmail,
              password:docPassword,
              specialityId: specId,
              profilePicture:"",
              

             }
             await registerDoc(payload)
  
      }
      const handleSpecialityChange = (value) => {
        // Transfer the selected specialityId to a function
        console.log('Selected specialityId:', value);
        setSpecId(value)
        // Call your function here with the selected specialityId
    };

    return (
        <div className="w-full bg-gray-800 h-[1400px]">
            <div className=" bg-gradient-to-b from-blue-800 to-blue-600 h-96"></div>
          
              <div className='text-center relative bottom-[370px]'><img src="/logo.png"  alt="" /></div>
            <div className="max-w-5xl relative bottom-[70px] mx-auto px-6 sm:px-6 lg:px-8 ">
                <div className="bg-gray-900 w-full shadow rounded p-8 sm:p-12 -mt-72">
                    <p className="text-3xl font-bold leading-7 text-center text-white">Doctor Sign Up</p>
                    <form onSubmit={handleRegister_doctor}>
                        <div className="md:flex items-center mt-12">
                            <div className="w-full md:w-1/2 flex flex-col">
                                <label className="font-semibold leading-none text-gray-300">Doctor Name</label>
                                <input type="text" className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded" onChange={(e) => setdocName(e.target.value)} value={docName} />
                            </div>
                            <div className="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                                <label className="font-semibold leading-none text-gray-300">Contact Number</label>
                                <input type="tel" className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded" onChange={(e) => setPhoneNo(e.target.value)} value={phoneNo} />
                            </div>
                        </div>
                        <div className="md:flex items-center mt-8">
                            <div className="w-full flex flex-col">
                                <label className="font-semibold leading-none text-gray-300">Email ID</label>
                                <input type="email" className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded" onChange={(e) => setdocEmail(e.target.value)} value={docEmail} />
                            </div>
                        </div>
                        <div className='flex flex-row mt-8 text-gray-300'>
                            <div className="flex flex-row items-center justify-start py-0 px-[11px]">
                            <Select
                                style={{ width: 200,backgroundColor:'black' }}
                                placeholder="Select Speciality"
                                onChange={handleSpecialityChange}
                            >
                                {spec.map(speciality => (
                                    <Option key={speciality.specialityId} value={speciality.specialityId}>
                                        {speciality.specialityName}
                                    </Option>
                                ))}
                                </Select>
                            </div>
                           
                        </div>
                        <div className='flex flex-row mt-8 text-gray-300'>
                            <div className="flex flex-row items-center justify-start py-0 px-[11px]">
                                <div className="relative text-[18px] leading-[100px] font-normal text-gray-300 text-left z-[1] mq450:text-lgi mq450:leading-[80px]">
                                    Gender:
                                </div>
                            </div>
                            <div>
                                <Radio.Group style={radioStyle}className=' pt-10 ' options={['M', 'F', 'O']} value={gender} onChange={onChange} />
                            </div>
                        </div>
                        <div className='flex flex-row pb-3 mb-3 pr-[11px] '>
                            <div className="flex flex-row items-center justify-start py-0 px-[5px]">
                                <div className="relative text-[18px] leading-[-50px] font-normal text-gray-300 text-left z-[1] mq450:text-lgi mq450:leading-[80px]">
                                    fees:
                                </div>
                            </div>
                            <div>
                               
                            </div>
                        </div>
                        <div className='flex flex-row pb-3 mb-3 pr-[11px] '>
                            <div className="flex flex-row items-center justify-start py-0 px-[5px]">
                                <div className="relative text-[18px] leading-[-50px] font-normal text-gray-300 text-left z-[1] mq450:text-lgi mq450:leading-[80px]">
                                    Date Of Birth:
                                </div>
                            </div>
                            <div>
                                <Space direction="vertical" size={12}>
                                    <DatePicker onChange={dob} needConfirm />
                                </Space>
                            </div>
                        </div>
                        <div className="w-full flex flex-col mt-8">
                            <label className="font-semibold leading-none text-gray-300">Password</label>
                            <input type="password" className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded" onChange={(e) => setdocPassword(e.target.value)} value={docPassword} />
                        </div>
                        <div className="flex items-center justify-center w-full">
                            <button type="submit" className="mt-9 font-semibold leading-none text-white py-4 px-10 bg-blue-700 rounded hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 focus:outline-none">
                                Register
                            </button>
                        </div>
                    </form>
                </div>
              
            </div>
        </div>
    );
};

export default  Regiester_doctor ;
