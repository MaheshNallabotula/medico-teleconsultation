import React from 'react'
import "../../js/jquery.min.js"
import "../../js/bootstrap.bundle.min.js"
import "../../js/owl.carousel.min.js"
import "../../js/scrollspy.min.js"
import "../../js/custom.js"
import "../../css/owl.carousel.min.css"
import "../../css/owl.theme.default.min.css"
import "../../css/templatemo-medic-care.css"
import "../../css/bootstrap-icons.css"
import "../../css/bootstrap.min.css"
import { Link } from 'react-router-dom'
import Phone from './Phone.jsx'
import Chat from './chat.jsx'
import {WechatOutlined} from '@ant-design/icons'


const Landing2 = () => {
  return (
    <>
 
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
  <link
    href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap"
    rel="stylesheet"
  />
    <div id="top">
 <main>
    <nav className="navbar-custom navbar navbar-expand-lg bg-light fixed-top shadow-lg">
      <div className="container">
        <a className="navbar-brand mx-auto d-lg-none">
        
          <strong className="d-block">Health Specialist</strong>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        
      <Chat  />

        <div className="navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#hero">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#about">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#timeline">
                Help
              </a>
            </li>
            <a className="navbar-brand d-none d-lg-block" href="index.html">
              Medico
              <strong className="d-block">Health Specialist</strong>
            </a>
            <li className="nav-item">
              <Link to="/loginPatient" className="nav-link" href="#reviews">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register_patient">
                Register
              </Link>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact">
                Contact
              </a>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link relative left-[400px]" href="#contact">
                Admin Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <section className="hero" id="hero">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div
              id="myCarousel"
              className="carousel slide carousel-fade"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    src="/portrait-successful-mid-adult-doctor-with-crossed-arms.jpg"
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="/young-asian-female-dentist-white-coat-posing-clinic-equipment.jpg"
                    className="img-fluid"
                    alt=""
                  />
                </div>
                <div className="carousel-item">
                  <img
                    src="/doctor-s-hand-holding-stethoscope-closeup.jpg"
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="heroText d-flex flex-column justify-content-center">
              <h1 className="mt-auto mb-2">
                Better
                <div className="animated-info">
                  <span className="animated-item">health</span>
                  <span className="animated-item">days</span>
                  <span className="animated-item">lives</span>
                </div>
              </h1>
              <p className="mb-4 font-extrabold">
              Welcome to Medico: Your Trusted Healthcare Companion. Connecting Patients with Expert Care, Anytime, Anywhere
              </p>
              <div className="heroLinks d-flex flex-wrap align-items-center">
                <a
                  className="custom-link me-4"
                  href="#about"
                  data-hover="Learn More"
                >
                  Learn More
                </a>
                <Phone/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="section-padding" id="about">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-12 font-extrabold">
            <h2 className="mb-lg-3 mb-3">Meet Dr. Carson</h2>
            <p className='font-bold'>
            This website offers essential advice on maintaining personal health and preventing the spread of illnesses. By emphasizing the importance of wearing masks and practicing frequent handwashing, it promotes simple yet effective measures for safeguarding oneself and others from common diseases. The recommendation for outdoor gatherings over indoor events aligns with current understanding of airborne transmission risks
            </p>
            <p className='font-extrabold'>
            Medico not only provides invaluable tips for maintaining personal health but also adapts to the evolving landscape of healthcare delivery. The emphasis on wearing masks and frequent handwashing echoes essential preventive measures
            
            </p>
          </div>
          <div className="col-lg-4 col-md-5 col-12 mx-auto">
            <div className="featured-circle bg-white shadow-lg d-flex justify-content-center align-items-center">
              <p className="featured-text">
                <span className="featured-number">12</span> Years
                <br /> of Experiences
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="gallery">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-6 ps-0">
            <img
              src="/medium-shot-man-getting-vaccine.jpg"
              className="img-fluid galleryImage"
              alt="get a vaccine"
              title="get a vaccine for yourself"
            />
          </div>
          <div className="col-lg-6 col-6 pe-0">
            <img
              src="/female-doctor-with-presenting-hand-gesture.jpg"
              className="img-fluid galleryImage"
              alt="wear a mask"
              title="wear a mask to protect yourself"
            />
          </div>
        </div>
      </div>
    </section>
    <section className="section-padding pb-0" id="timeline">
      <div className="container">
        <div className="row">
          <h2 className="text-center mb-lg-5 mb-4">How easy it is to book an appointment?</h2>
          <div className="timeline">
            <div className="row g-0 justify-content-end justify-content-md-around align-items-start timeline-nodes">
              <div className="col-9 col-md-5 me-md-4 me-lg-0 order-3 order-md-1 timeline-content bg-white shadow-lg">
                <h3 className=" text-light">Register Yourself</h3>
                <p className='font-bold'>
                 Register yourself as a patient by clicking the register button on the navigation and ready for be disease free.
                </p>
              </div>
              <div className="col-3 col-sm-1 order-2 timeline-icons text-md-center">
                <i className="bi-patch-check-fill timeline-icon" />
              </div>
              <div className="col-9 col-md-5 ps-md-3 ps-lg-0 order-1 order-md-3 py-4 timeline-date">
                <time></time>
              </div>
            </div>
            <div className="row g-0 justify-content-end justify-content-md-around align-items-start timeline-nodes my-lg-5 my-4">
              <div className="col-9 col-md-5 ms-md-4 ms-lg-0 order-3 order-md-1 timeline-content bg-white shadow-lg">
                <h3 className=" text-light">Login for consultation</h3>
                <p className='font-bold'>
                  Login and take the first step towards the healtiest website of the country and make yourself disease free. Click here to 
                  <a
                    href="https://www.google.com/search?q=free+css"
                    target="_blank"
                  >
                    Login
                  </a>{" "}
                  now.
                </p>
              </div>
              <div className="col-3 col-sm-1 order-2 timeline-icons text-md-center">
                <i className="bi-book timeline-icon" />
              </div>
              <div className="col-9 col-md-5 pe-md-3 pe-lg-0 order-1 order-md-3 py-4 timeline-date">
                <time></time>
              </div>
            </div>
            <div className="row g-0 justify-content-end justify-content-md-around align-items-start timeline-nodes">
              <div className="col-9 col-md-5 me-md-4 me-lg-0 order-3 order-md-1 timeline-content bg-white shadow-lg">
                <h3 className=" text-light">Choose the specilization </h3>
                <p className='font-bold'>
                  Choose the certain specilization according to your need. We have the best doctors in every specilization you can choose according to ratings and price specifically.
                </p>
              </div>
              <div className="col-3 col-sm-1 order-2 timeline-icons text-md-center">
                <i className="bi-file-medical timeline-icon" />
              </div>
              <div className="col-9 col-md-5 ps-md-3 ps-lg-0 order-1 order-md-3 py-4 timeline-date">
                <time></time>
              </div>
            </div>
            <div className="row g-0 justify-content-end justify-content-md-around align-items-start timeline-nodes my-lg-5 my-4">
              <div className="col-9 col-md-5 ms-md-4 ms-lg-0 order-3 order-md-1 timeline-content bg-white shadow-lg">
                <h3 className=" text-light">Upload your documents</h3>
                <p className="mb-0 pb-0 font-bold">
                 Upload the nescessary documents which are useful when you are consulting with doctors for better understanding of your health query.
                </p>
                <p className='font-bold text-black'>
                  Your documents are safely stored within the medico database.
                </p>
              </div>
              <div className="col-3 col-sm-1 order-2 timeline-icons text-md-center">
                <i className="bi-globe timeline-icon" />
              </div>
              <div className="col-9 col-md-5 pe-md-3 pe-lg-0 order-1 order-md-3 py-4 timeline-date">
                <time></time>
              </div>
            </div>
            <div className="row g-0 justify-content-end justify-content-md-around align-items-start timeline-nodes">
              <div className="col-9 col-md-5 me-md-4 me-lg-0 order-3 order-md-1 timeline-content bg-white shadow-lg">
                <h3 className=" text-light">Book an appointment</h3>
                <p className='font-bold'>
                  Simply you can book the appointment by choosing specilization or hospital.You can book appointment according to your comfert time.
                  
                 
                </p>
              </div>
              <div className="col-3 col-sm-1 order-2 timeline-icons text-md-center">
                <i className="bi-person timeline-icon" />
              </div>
              <div className="col-9 col-md-5 ps-md-3 ps-lg-0 order-1 order-md-3 py-4 timeline-date">
                <time></time>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  
    <section className="section-padding" id="booking">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 col-12 mx-auto">
            <div className="booking-form">
              <h2 className="text-center mb-lg-3 mb-2">Register if you have any query, We will reach you shortly!</h2>
              <form role="form" action="#booking" method="post">
                <div className="row">
                  <div className="col-lg-6 col-12">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="form-control"
                      placeholder="Full name"
                      required=""
                    />
                  </div>
                  <div className="col-lg-6 col-12">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      pattern="[^ @]*@[^ @]*"
                      className="form-control"
                      placeholder="Email address"
                      required=""
                    />
                  </div>
                  <div className="col-lg-6 col-12">
                    <input
                      type="telephone"
                      name="phone"
                      id="phone"
                      pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                      className="form-control"
                      placeholder="Phone: 123-456-7890"
                    />
                  </div>
                  <div className="col-lg-6 col-12">
                    <input
                      type="date"
                      name="date"
                      id="date"
                      defaultValue=""
                      className="form-control"
                    />
                  </div>
                  <div className="col-12">
                    <textarea
                      className="form-control"
                      rows={5}
                      id="message"
                      name="message"
                      placeholder="Additional Message"
                      defaultValue={""}
                    />
                  </div>
                  <div className="col-lg-3 col-md-4 col-6 mx-auto">
                    <button
                      type="submit"
                      className="form-control"
                      id="submit-button"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
  <footer className="site-footer section-padding" id="contact">
    <div className="container">
      <div className="row">
        <div className="col-lg-5 me-auto col-12">
          <h5 className="mb-lg-4 mb-3">Opening Hours</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex">Sunday : Closed</li>
            <li className="list-group-item d-flex">
              Monday, Tuesday - Firday
              <span>8:00 AM - 3:30 PM</span>
            </li>
            <li className="list-group-item d-flex">
              Saturday
              <span>10:30 AM - 5:30 PM</span>
            </li>
          </ul>
        </div>
        <div className="col-lg-2 col-md-6 col-12 my-4 my-lg-0">
          <h5 className="mb-lg-4 mb-3">Our Clinic</h5>
          <p>
            <a href="mailto:hello@company.co">hello@company.co</a>
          </p>
          <p></p>
          <p>123 Digital Art Street, San Diego, CA 92123</p>
        </div>
        <div className="col-lg-3 col-md-6 col-12 ms-auto">
          <h5 className="mb-lg-4 mb-2">Socials</h5>
          <ul className="social-icon">
            <li>
              <a href="#" className="social-icon-link bi-facebook" />
            </li>
            <li>
              <a href="#" className="social-icon-link bi-twitter" />
            </li>
            <li>
              <a href="#" className="social-icon-link bi-instagram" />
            </li>
            <li>
              <a href="#" className="social-icon-link bi-youtube" />
            </li>
          </ul>
          <div>
            <p className="copyright-text">
              Copyright © Medic Care 2021
              <br />
              <br />
              Design:{" "}
              <a href="https://templatemo.com" target="_parent">
                TemplateMo
              </a>
            </p>
            <p className="copyright-text">
              Distributed By:{" "}
              <a href="https://themewagon.com" target="_parent">
                Themewagon
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
  </div>


  
    </>
  )
}

export default Landing2