import React, { useState, useEffect,useContext } from 'react';
import AuthContext from '../../../Context/AuthContext';

import { Spin } from 'antd';
import Header from './Header';
import {
    CustomerServiceOutlined,
    CreditCardOutlined,
    DesktopOutlined
} from '@ant-design/icons';
import axios from 'axios';
import { Carousel, Card, Typography } from 'antd';

const EnterHospital = () => {
    const { Meta } = Card;
    const { Title, Paragraph } = Typography;

    const { getAllHospitals, hospitals } = useContext(AuthContext);
    const [hospData, setHospData] = useState(null);
    const [skinDiseaseData, setSkinDiseaseData] = useState(null);
   
    useEffect(() => {
        const fetchData = async () => {
            try {
                const hospId = parseInt(localStorage.getItem("hospId"));
                const foundHospital = hospitals.find(hospital => hospital.hospitalId === hospId);
                setHospData(foundHospital);

                // Fetch skin disease data from the API
                // const formData = new FormData();
            //     // Append image data to the FormData object
            //     // Replace 'imageData' with your actual image data
            //     formData.append('image', ImageData);

            //     const options = {
            //         method: 'POST',
            //         url: 'https://detect-skin-disease.p.rapidapi.com/facebody/analysis/detect-skin-disease',
            //         headers: {
            //             'X-RapidAPI-Key': '1488ab25d9mshae650167b1eae1dp108cebjsn9ac3e0d91e08',
            //             'X-RapidAPI-Host': 'detect-skin-disease.p.rapidapi.com'
                       
            //         },
            //         data: formData,
            //     };
             
            //     const response = await axios.request(options);
            //     setSkinDiseaseData(response.data);
            //     console.log("skin", skinDiseaseData);
            } catch (error) {
                console.error('Error fetching skin disease data:', error);
            }
        };

        fetchData();
    }, []);
    if (!hospData) {
        return <div className='text-center mt-[300px]'><Spin size='large'  /></div>;
    }
  return (
    <>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
      <link href="https://demos.creative-tim.com/soft-ui-design-system/assets/css/nucleo-icons.css" rel="stylesheet" />
      <link href="https://demos.creative-tim.com/soft-ui-design-system/assets/css/nucleo-svg.css" rel="stylesheet" />
      <link rel="stylesheet" href="./assets/css/theme.css" />
      <link rel="stylesheet" href="./assets/css/loopple/loopple.css" />
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet" />

      
      {/* Include the Font Awesome script */}
      <script src="https://kit.fontawesome.com/42d5adcbca.js" crossorigin="anonymous"></script>
<Header/>
 <header className="position-relative">
        <div className="page-header min-vh-50 border-radius-xl py-5">
            <div className="container h-100">
                <div className="row">
                    <div className="col-lg-5 mb-3  ">
                        <h1 className="fadeIn2 fadeInBottom mb-0 display-4 text-center font-bold ">{hospData.hospitalName} <span className="text-info text-gradient">{hospData.hospitalAddress}</span></h1>
                    </div>
                    <div className="font-bold col-lg-7 text-right pr-[250px]">
            </div>
                </div>
                <div className="row mt-5">
                    <div className="col-lg-3 my-auto">
                        <h6 className="fadeIn2 fadeInBottom mb-0 font-bold text-info text-gradient">Our Schedule </h6>
                        <ul className="list-unstyled mt-3 mb-5">
                            <li><strong className="text-dark font-extrabold">Mon – Fri:</strong> 10:00 am – 22:00 pm</li>
                            <li><strong className="text-dark font-extrabold">Sat – Sun:</strong> 10:00 am – 16:00 pm</li>
                        </ul>
                        <a href="javascript:;" className="btn bg-gradient-to-r from-gray-800 to-gray-900 mb-5 text-white py-2 px-4 rounded-lg shadow-md hover:from-gray-900 hover:to-gray-800">Contact us</a>
                    </div>
                    <div className="col-lg-9 mt-auto">
    <div className="relative ms-4 lg:ms-5 mb-0 mb-md-7 mb-lg-0 h-3/4">
        <div className="bg-gradient-to-r from-blue-400 to-purple-600 opacity-75 lg:block hidden w-full h-full rounded-md absolute top-0"></div>
        <img style={{ boxShadow: "0 0 5px 5px #1F51FF" }} src="https://images.unsplash.com/photo-1571772996211-2f02c9727629?ixlib=rb-1.2.1&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=2070&amp;q=80" className="w-full rounded-md -mt-2 lg:-mt-3 relative z-10" alt="" />
      
    </div>
</div>
                </div>
            </div>
        </div>
    </header>
    <section className="mt-4">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 py-md-5 py-3">
                            <div className="p-4 text-start border border-3 border-info border-radius-xl rounded-xl">
                                <div className="icon icon-shape icon-md bg-gradient-info shadow text-center text-white ">
                                    {/* <CreditCard sx={{ fontSize: 40, opacity: 0.1 }} /> Use Material-UI CreditCard icon */}
                                    <CreditCardOutlined className='text-[30px] opacity-0.1  bg-gradient-to-r from-sky-500 to-indigo-500 text-white p-2 rounded-lg' />
                                </div>
                                <h5 className="mt-3 font-extrabold">Fast</h5>
                                <p className="mb-0 font-bold">Creativity starts with an empty calendar and ends with a full one.</p>
                            </div>
                        </div>
                        <div className="col-md-4 py-md-5 py-3">
                            <div className="p-4 text-start border border-3 border-info border-radius-lg rounded-xl">
                                <div className="icon icon-shape icon-md bg-gradient-info shadow text-center">
                                    {/* <Phone sx={{ fontSize: 40, opacity: 0.1 }} /> Use Material-UI Phone icon */}
                                    <CustomerServiceOutlined className='text-[30px] opacity-0.1  bg-gradient-to-r from-sky-500 to-indigo-500 text-white p-2 rounded-lg' />
                                </div>
                                <h5 className="mt-3 font-extrabold">Better Support Service</h5>
                                <p className="mb-0 font-bold">We have a team which provide excellent support service .</p>
                            </div>
                        </div>
                        <div className="col-md-4 py-md-5 py-3">
                            <div className="p-4 text-start border border-3 border-info border-radius-lg rounded-xl">
                                <div className="icon icon-shape icon-md bg-gradient-info shadow text-center">
                                    {/* <Comment sx={{ fontSize: 40, opacity: 0.1 }} /> Use Material-UI Comment icon */}
                                    <DesktopOutlined className='text-[30px] opacity-0.1  bg-gradient-to-r from-sky-500 to-indigo-500 text-white p-2 rounded-lg'   />
                                </div>
                                <h5 className="mt-3 font-extrabold">Online Appointments</h5>
                                <p className="mb-0 font-bold">You can book book online appointments with the doctors.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section class="py-0">
        <div class="row">
            <div class="col-6 text-center mx-auto mt-5 mb-4">
                <h2 spellcheck="false" className='font-extrabold'>See Our Mission</h2>
                <p className='font-bold'>See what people from all around the world are saying about <span className=' text-blue-600 font-extrabold text-[20px]'>{hospData.hospitalName} </span>
                </p>
            </div>
        </div>
        <div class="row">
            <div class="col-10 mx-auto">
                <div class="card border-radius-md">
                    <video controls="true" class="border-radius-md shadow-sm">
                        <source src="https://www.youtube.com/embed/nAgCrYrmH3I?si=Tw3j_Vl1lkoIzxNo" 
 type="video/mp4" />
                    </video>
                </div>
            </div>
        </div>
    </section>

    


    </>
  );
}

export default EnterHospital;
