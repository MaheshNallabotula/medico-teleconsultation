import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import AuthContext from '../../../Context/AuthContext';
import { useContext } from 'react';
import Navbar_Admin from './Navbar_Admin';

const Hospital_Detail = () => {
  const [hospitalDetails, setHospitalDetails] = useState({});
  const [numDoctors, setNumDoctors] = useState(0);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const profile = JSON.parse(localStorage.getItem("userProfile"));
  const hospitalId = profile?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${import.meta.env.REACT_APP_BACKEND_URL}/api/admin/getDoctorsOfHospital/${hospitalId}`);
        if (response.data.length > 0) {
          setHospitalDetails(response.data[0].hospital);
          setNumDoctors(response.data.length); 
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (hospitalId) {
      fetchData();
    }
  }, [hospitalId]);

  return (
    <>
      <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700" rel="stylesheet" />
      <link href="https://demos.creative-tim.com/soft-ui-design-system/assets/css/nucleo-icons.css" rel="stylesheet" />
      <link href="https://demos.creative-tim.com/soft-ui-design-system/assets/css/nucleo-svg.css" rel="stylesheet" />
      <link rel="stylesheet" href="./assets/css/theme.css" />
      <link rel="stylesheet" href="./assets/css/loopple/loopple.css" />
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css" rel="stylesheet" />
      <script src="https://kit.fontawesome.com/42d5adcbca.js" crossorigin="anonymous"></script>

      <div className="flex h-screen">
        <Navbar_Admin />
        <div className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white py-4 px-6 absolute top-0 right-0 z-50">
          <div className="container mx-auto">
            <div className="text-[40px] font-semibold mb-2">{hospitalDetails.hospitalName}</div>
            <div>{hospitalDetails.hospitalAddress}</div>
            <div>Doctors Registered - {numDoctors}</div>
          </div>
        </div>
        <main className="flex-1 p-5 overflow-auto">
          <div className="w-full relative bg-whitesmoke-400 overflow-hidden flex flex-row items-start justify-start gap-[0px_32px] tracking-[normal] mq750:gap-[0px_32px] mq1025:pl-5 mq1025:pr-5 mq1025:box-border">
            <main className="flex-1 flex flex-col items-start justify-start pt-5 px-0 pb-0 box-border max-w-[calc(100%_-_254px)] mq1025:max-w-full">
              <section className="self-stretch flex flex-col items-start justify-start gap-[30px_0px] max-w-full">
                <header className="position-relative">
                  <div className="page-header min-vh-50 border-radius-xl py-5">
                    <div className="container h-100">
                      <div className="row">
                        <div className="col-lg-5 mb-3  ">
                          <h1 className="fadeIn2 fadeInBottom mb-0 display-4 text-center font-bold ">{hospitalDetails.hospitalName} <span className="text-info text-gradient">{hospitalDetails.hospitalAddress}</span></h1>
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
              </section>
            </main>
          </div>
        </main>
      </div>
    </>
  );
}

export default Hospital_Detail;