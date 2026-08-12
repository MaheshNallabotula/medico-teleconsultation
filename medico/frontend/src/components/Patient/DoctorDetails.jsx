import React, { useState } from 'react'
import AuthContext from '../../../Context/AuthContext'
import { useContext } from 'react'
import Navbar from './Navbar'
import Header from './Header'
import { Rate } from 'antd';
import BarChart from './BarChart'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import axios from 'axios'

const DoctorDetails = ({ docId }) => { // Destructure docId from props
  const navigate = useNavigate();
  const [docDetails, setDocDetails] = useState([]);
  const { appointment } = useContext(AuthContext);
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  const isMounted = useRef(true);

  // Patient reviews for this doctor. The profile card already shows the
  // average star rating, but patients had no way to read what previous
  // patients actually wrote before booking - this fills that gap.
  const [reviews, setReviews] = useState([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState(false);

  const loadDataFromLocalStorage = () => {
    try {
      const storedDocDetails = JSON.parse(localStorage.getItem('docDetails'));
      console.log("details");
      console.log(storedDocDetails);
      if (storedDocDetails && isMounted.current) {
        setDocDetails(storedDocDetails);
      }
    } catch (error) {
      console.error('Error loading data from local storage:', error);
    }
  };

  useEffect(() => {
    loadDataFromLocalStorage();

    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!docId) return;
      try {
        setReviewsLoading(true);
        setReviewsError(false);
        const response = await axios.get(
          `${import.meta.env.REACT_APP_BACKEND_URL}/api/patient/getDoctorReviews/${docId}`
        );
        if (isMounted.current) {
          setReviews(response.data || []);
        }
      } catch (error) {
        console.error('Error fetching doctor reviews:', error);
        if (isMounted.current) {
          setReviewsError(true);
        }
      } finally {
        if (isMounted.current) {
          setReviewsLoading(false);
        }
      }
    };

    fetchReviews();
  }, [docId]);

  const bookAp = () => {
    let payload = {
      docId: docDetails.docId,
      date: formattedDate
    };
    appointment(payload, docId);
    navigate("/bookSlot");
  };

  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://unpkg.com/popper.js@1/dist/umd/popper.min.js";
    script1.async = true;
    document.body.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://unpkg.com/tippy.js@4";
    script2.async = true;
    document.body.appendChild(script2);
  }, []);

  const handleToggleTheme = () => {
    const body = document.querySelector('body');
    const profile = document.getElementById('profile');
    const toggle = document.querySelector('.js-change-theme');

    if (body.classList.contains('text-gray-900')) {

      toggle.innerHTML = "☀️";

      body.classList.remove('text-gray-900');
      body.classList.add('text-white');
      profile.classList.remove('bg-white');
      profile.classList.add('bg-gray-900');
    } else {
      toggle.innerHTML = "🌙";
      body.classList.remove('text-gray-100');
      body.classList.add('text-gray-900');
      profile.classList.remove('bg-gray-900');
      profile.classList.add('bg-white');
    }
  };

   
  return (
    <>
     <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <meta name="description" content="" />
          <meta name="keywords" content="" />
          <meta name="author" content="" />
          <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet" />
          <link rel="stylesheet" href="https://unpkg.com/tailwindcss@2.2.19/dist/tailwind.min.css" />
        </head>
    <div className="w-full relative bg-whitesmoke-400 overflow-hidden flex flex-row items-start justify-start gap-[0px_32px] tracking-[normal] mq750:gap-[0px_32px] mq1025:pl-5 mq1025:pr-5 mq1025:box-border">
   <Navbar/>
   <main className="flex-1 flex flex-col items-start justify-start pt-5 px-0 pb-0 box-border max-w-[calc(100%_-_254px)] mq1025:max-w-full">
      <section className="self-stretch flex flex-col items-start justify-start gap-[30px_0px] max-w-full">
      <div className="self-stretch flex flex-col items-start justify-start gap-[22px_0px] max-w-full text-left text-xs text-navy-100 font-nunito">
    <Header/>
  </div>
  <div className="font-roboto ml-[200px]  h-screen antialiased text-gray-900 leading-normal tracking-wider bg-cover"  >
          <div className="max-w-4xl flex items-center h-auto lg:h-screen flex-wrap mx-auto lg:my-0 ">
            <div id="profile" className="w-full relative lg:w-3/5 rounded-lg lg:rounded-l-lg lg:rounded-r-none shadow-2xl bg-white opacity-75 mx-6 lg:mx-0">
              <div className="p-4 md:p-12 text-center lg:text-left">
                <div className="block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/MP0IUfwrn0A')" }}></div>
                <h1 className="text-3xl font-bold pt-8 lg:pt-0"> {docDetails.docName}</h1>
                <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-blue-600 opacity-25">
                </div>
                <p className="pt-4 text-base font-bold flex items-center justify-center lg:justify-start">
                  <svg className="h-4 fill-current text-blue-700 pr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                  </svg> Specialization
                </p>
                {docDetails&&docDetails.speciality ? (
                <p className="text-[20px] text-gray-600 text-center font-extrabold  lg:text-left relative bottom-[30px] left-[90px] ">{docDetails.speciality.specialityName}</p>
                 ) : (
                <p>Loading...</p> )}      

                <p className=" text-base font-bold flex items-center justify-center lg:justify-start">
                   <img className='h-4 fill-current text-blue-700 pr-4 ' src="https://cdn-icons-png.flaticon.com/128/4006/4006511.png" alt="" /> Hospital
                </p>
                {docDetails? (
                <p className="text-[20px] text-gray-600 text-center font-extrabold  lg:text-left relative bottom-[30px] left-[90px] ">{docDetails.hospitalName}</p>
                 ) : (
                <p>Loading...</p> )} 

                  <p className=" text-base font-bold flex items-center justify-center lg:justify-start">
                   <img className='h-4 fill-current text-blue-700 pr-4 ' src="https://cdn-icons-png.flaticon.com/128/2178/2178616.png" alt="" /> Charge 
                </p>
                {docDetails? (
                <p className="text-[20px] text-gray-600 text-center font-extrabold  lg:text-left relative bottom-[38px] left-[90px] "><span className='text-[30px] text-blue-700'>₹</span> {docDetails.rate}</p>
                 ) : (
                <p>Loading...</p> )}  

             {docDetails.rating? (
                  // <p className=" text-base font-bold flex items-center justify-center lg:justify-start">
                  <Rate  className=' text-blue-700 mr-[80px]' disabled allowHalf defaultValue={docDetails.rating ?? 0}  />
                // </p>
                 ) : (
                  <p>Loading Rating...</p> )}  
                   <br />
                  <button onClick={bookAp} className='pt-2 mr-[80px]'>Book an Appointment</button>
              </div>

              
            </div>
            <div className="w-full lg:w-2/5">
              <img src="https://i.pinimg.com/736x/b9/97/a5/b997a530822d0f2c03259070d4590d45.jpg" className="h-[500px] w-[500px] rounded-none lg:rounded-lg shadow-2xl hidden lg:block" alt="Profile" />
            </div>
            <div className="absolute top-0 right-0 h-12 w-18 p-4">
              <button className="js-change-theme focus:outline-none" onClick={handleToggleTheme}>🌙</button>
            </div>
          </div>
        </div>

        {/* Patient reviews - shows what past patients wrote, not just the average star rating */}
        <div className="max-w-4xl mx-auto mt-8 mb-12 px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Patient Reviews</h2>

          {reviewsLoading && (
            <p className="text-gray-500">Loading reviews...</p>
          )}

          {!reviewsLoading && reviewsError && (
            <p className="text-gray-500">Couldn't load reviews right now. Please try again later.</p>
          )}

          {!reviewsLoading && !reviewsError && reviews.length === 0 && (
            <p className="text-gray-500">No reviews yet for this doctor.</p>
          )}

          {!reviewsLoading && !reviewsError && reviews.length > 0 && (
            <div className="flex flex-col gap-4">
              {reviews.map((rev) => (
                <div
                  key={rev.consultationId}
                  className="bg-white rounded-lg shadow-md p-4 border border-gray-100"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-gray-800">
                      {rev.patientName || 'Anonymous Patient'}
                    </span>
                    {rev.consultationDate && (
                      <span className="text-xs text-gray-400">
                        {new Date(rev.consultationDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <Rate disabled allowHalf value={rev.rating ?? 0} className="text-sm text-blue-700" />
                  <p className="text-gray-600 mt-2">{rev.review}</p>
                </div>
              ))}
            </div>
          )}
        </div>

  </section>
  </main>
   </div>
   </html>
   </>
    )
}

export default DoctorDetails