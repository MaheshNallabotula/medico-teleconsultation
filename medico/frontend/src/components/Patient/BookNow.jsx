import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Header from './Header'
import { Card, Form, Input, Button } from 'antd';
import DoctorDetails from './DoctorDetails';
import {Divider} from 'antd'
import axios from "axios";
import {message} from 'antd'
import { useNavigate } from "react-router-dom";


const BookNow = () => {
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage();
    const [renderSuccess,setRenderSuccess] = useState(false)
    const details = JSON.parse(localStorage.getItem('docDetails'))
    const [success,setSuccess] = useState()

    const navi =()=>{
         
    }   

    useEffect(() => {
        if (success) {
            message.loading({ content: 'Loading...', key: 'loading' }); // Display loading message
            setTimeout(() => {
                message.success({ content: 'Appointment Booked successfully', key: 'loading', duration: 2 }); // Display success message after delay
            }, 1000);
            navi()
            
        }

    }, [success]);
    useEffect(() => {
        console.log(details);
      }, []);
      const book = async()=>{
        const patId = parseInt(localStorage.getItem('patId'))
        const date = localStorage.getItem('dateChoosed')
        const time = localStorage.getItem('timeChoosed')
        const id = parseInt(localStorage.getItem('doctor'))
           let payload={
              "patientID":patId,
              "docID":id,
              "consultationDate":date,
              "consultationTime":time
           }
         
          let apiResponse = await axios.post(import.meta.env.REACT_APP_BACKEND_URL +'/api/patient/bookConsultation',payload);
          console.log(apiResponse);
          setSuccess(apiResponse)
          localStorage.setItem('bookedAppointment',JSON.stringify(apiResponse.data))
      }
  return (
   <>
      <div className="w-full relative bg-whitesmoke-400 overflow-hidden flex flex-row items-start justify-start gap-[0px_32px] tracking-[normal] mq750:gap-[0px_32px] mq1025:pl-5 mq1025:pr-5 mq1025:box-border">
        <Navbar />
        <main className="flex-1 flex flex-col items-start justify-start pt-5 px-0 pb-0 box-border max-w-[calc(100%_-_254px)] mq1025:max-w-full">
          <section className="self-stretch flex flex-col items-start justify-start gap-[30px_0px] max-w-full">
            <div className="self-stretch flex flex-col items-start justify-start gap-[22px_0px] max-w-full text-left text-xs text-navy-100 font-nunito">
              <Header />
            </div>
           <div>
           <div className="flex items-center justify-center min-h-screen  w-full ml-[350px] bg-gray-100 mb-[50px]">
      <Card className="max-w-lg w-full bg-blue-300 font-semibold text-center "  title={<div className="text-center text-[30px] font-extrabold">Checkout</div>}>
        {/* Order Summary */}
        <div className="mb-6">
          <h3 className="text-lg font-extrabold pb-[15px] text-center">Order Summary</h3>
          <div className="flex justify-between mb-2">
            <span>Doctor Name:</span>
            <span className=' text-whitesmoke-300 font-extrabold'>{details.docName}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Slot Time:</span>
            <span  className=' text-whitesmoke-300 font-extrabold'>{localStorage.getItem('timeChoosed')}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Date:</span>
            <span  className=' text-whitesmoke-300 font-extrabold'> {localStorage.getItem('dateChoosed')}</span>
          </div>
        </div>
        <Divider className='bg-white'></Divider>
        {/* Payment Information */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-center font-extrabold">Payment Information</h3>
        </div>
        {/* Checkout Form */}
        <Form layout="vertical">
          <Form.Item label="Card Number">
            <Input />
          </Form.Item>
          <Form.Item label="Expiry Date">
            <Input />
          </Form.Item>
          <Form.Item label="CVV">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button onClick={book} type="primary" htmlType="submit" block>
              Checkout
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
           </div>
          </section>
        </main>
      </div>
   </>
  )
}

export default BookNow