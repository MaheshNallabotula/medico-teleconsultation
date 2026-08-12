import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Checkbox } from 'antd';
import { DatePicker, Space } from 'antd';
import { Select } from 'antd';
import AuthContext from '../../../Context/AuthContext';
import { Radio } from 'antd';

const Register_patient = () => {
    const { Option } = Select;
    const navigate = useNavigate();
    const location = useLocation();
    const { registerPatient } = useContext(AuthContext);
    const [patName, setPatName] = useState('');
    const [patDob, setPatDob] = useState('');
    const [bloodGroup, setBloodGroup] = useState("A+");
    const [phoneNo, setPhoneNo] = useState('');
    const [gender, setGender] = useState(null);
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    function handleChange(value) {
        console.log(`Selected: ${value}`);
        setBloodGroup(value);
    }

    const onChange = (e) => {
        console.log('Gender:', e.target.value);
        setGender(e.target.value);
    };

    const dob = (date, dateString) => {
        console.log(date, dateString);
        setPatDob(dateString);
    };

    const handleRegisterPatient = async (e) => {
        e.preventDefault();
        console.log(patName);
        console.log(patDob);
        console.log(bloodGroup);
        console.log(gender);
        console.log(email);
        console.log(pwd);
        console.log(phoneNo);
        let payload = {
            patName: patName,
            patDob: patDob,
            bloodGroup: bloodGroup,
            phoneNo: phoneNo,
            gender: gender,
            email: email,
            password: pwd
        };
        await registerPatient(payload);
    };
    const radioStyle = {
        color: 'white',
      };
    return (
        <div className="w-full bg-gray-800 h-[1400px]">
            <div className=" bg-gradient-to-b from-blue-800 to-blue-600 h-96"></div>
          
              <div className='text-center relative bottom-[370px]'><img src="/logo.png"  alt="" /></div>
            <div className="max-w-5xl relative bottom-[70px] mx-auto px-6 sm:px-6 lg:px-8 ">
                <div className="bg-gray-900 w-full shadow rounded p-8 sm:p-12 -mt-72">
                    <p className="text-3xl font-bold leading-7 text-center text-white">Patient Sign Up</p>
                    <form onSubmit={handleRegisterPatient}>
                        <div className="md:flex items-center mt-12">
                            <div className="w-full md:w-1/2 flex flex-col">
                                <label className="font-semibold leading-none text-gray-300">Patient Name</label>
                                <input type="text" className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded" onChange={(e) => setPatName(e.target.value)} value={patName} />
                            </div>
                            <div className="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0 mt-4">
                                <label className="font-semibold leading-none text-gray-300">Contact Number</label>
                                <input type="tel" className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded" onChange={(e) => setPhoneNo(e.target.value)} value={phoneNo} />
                            </div>
                        </div>
                        <div className="md:flex items-center mt-8">
                            <div className="w-full flex flex-col">
                                <label className="font-semibold leading-none text-gray-300">Email ID</label>
                                <input type="email" className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded" onChange={(e) => setEmail(e.target.value)} value={email} />
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
                                    Blood Group:
                                </div>
                            </div>
                            <div>
                                <Select defaultValue="A+" className='text-gray-300 bg-gray-300' style={{ width: 120 }} onChange={handleChange}>
                                    <Option value="A+">A+</Option>
                                    <Option value="B+">B+</Option>
                                    <Option value="A-">A-</Option>
                                    <Option value="AB+">AB+</Option>
                                    <Option value="AB-">AB-</Option>
                                    <Option value="O+">O+</Option>
                                    <Option value="O-">O-</Option>
                                </Select>
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
                            <input type="password" className="leading-none text-gray-50 p-3 focus:outline-none focus:border-blue-700 mt-4 border-0 bg-gray-800 rounded" onChange={(e) => setPwd(e.target.value)} value={pwd} />
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

export default Register_patient;
