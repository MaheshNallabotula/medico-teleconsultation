import React from 'react'
import { Link,useNavigate,useLocation } from 'react-router-dom'

import { useState } from 'react'
import AuthContext from '../../../Context/AuthContext';
import { useContext } from 'react';

const Register_admin = () => {
    const navigate = useNavigate()
    const location = useLocation()
   

    const [adminName,setAdminName]=useState('');
    const [adminEmail,setAdminEmail] = useState('');
    const [adminPassword,setAdminPassword] = useState('');
    const {registerAdmin} = useContext(AuthContext)

    

    const handleRegisterAdmin=async (e)=>{
           e.preventDefault();
           console.log(adminName);
           console.log(adminEmail);
           console.log(adminPassword);
           let payload={
            adminName:adminName,
            adminEmail:adminEmail,
            adminPassword:adminPassword,
            role:'ADMIN'
           }
           await registerAdmin(payload)

    }

  return (
    
  <>
  <div className="w-full relative bg-whitesmoke-100 overflow-hidden flex flex-row items-center justify-start pt-[67px] px-0 pb-36 box-border [row-gap:20px] tracking-[normal] mq1325:flex-wrap">
      <img
        className="h-[607.4px] w-[726px] relative max-w-full mq1325:flex-1"
        loading="eager"
        alt=""
        src="/vector.svg"
      />


<form   className="m-0 w-[670px]  overflow-visible rounded-6xl bg-gainsboro flex flex-col items-center justify-start pt-[5px] pb-[388px] pr-[63px] pl-[66px] box-border gap-[4px] min-w-[370px] max-w-full mq800:pl-[38px] mq800:pr-[31px] mq800:box-border mq800:min-w-full mq450:pb-[21px] mq450:box-border mq1125:pt-5 mq1125:pb-8 mq1125:box-border mq1325:flex-1">
      <div className="w-[670px]  relative rounded-6xl  hidden max-w-full" />
      <div className="self-stretch flex flex-col items-center justify-start pt-0 px-0 pb-[21px] gap-[1px_0px]">
        <div className="w-[237px] flex flex-row items-start justify-start py-0 pr-0 pl-[35px] box-border">
          <img
            className="h-[115px] flex-1 relative max-w-full overflow-hidden object-cover z-[1]"
            loading="eager"
            alt=""
            src="/logo@2x.png"
          />
        </div>

        
        <div className="self-stretch rounded-11xl bg-mediumblue overflow-hidden flex flex-row items-start justify-between py-0 pr-[61px] pl-[81px] gap-[20px] z-[1] mq800:pl-10 mq800:pr-[30px] mq800:box-border mq450:flex-wrap">
        
          <div className="h-[74px] w-[131px] flex flex-col items-start justify-end pt-0 px-0 pb-0 box-border">
            <div className="mt-[-8px] self-stretch h-[82px] flex flex-col items-start justify-start pt-0 px-0 pb-0 box-border">
              <div className="mb-[-26px] self-stretch h-[108px] relative text-5xl leading-[125px] font-semibold font-inter text-black text-left flex items-end shrink-0 mq450:text-lgi mq450:leading-[100px]">
              <Link to="/login" className='no-underline'> Login</Link> 
              </div>
            </div>
          </div>
          <div className="h-[74px] w-[74px] flex flex-col items-start justify-end pt-0 px-0 pb-0 box-border">
            <div className="mt-[-8px] self-stretch h-[82px] flex flex-col items-start justify-start pt-0 px-0 pb-0 box-border">
              <div className="self-stretch flex flex-row items-start justify-start relative">
                <div className="h-[60px] w-[263px] absolute my-0 mx-[!important] top-[15px] right-[-49px] rounded-26xl bg-gray-100" />
                <div className="mb-[-80px] flex-1 relative right-[30px] text-5xl leading-[90px] font-semibold font-inter text-black text-left z-[1] mq450:text-lgi mq450:leading-[100px]">
                 <Link className='no-underline text-black '>Register</Link> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className="self-stretch flex flex-col  items-center justify-center max-w-full">
        <div className="flex flex-row items-start justify-start py-0 px-[11px]">
          <div className="relative text-3xl leading-[100px] font-inter text-black text-left z-[1] mq450:text-lgi mq450:leading-[80px]">
                Admin Name
          </div>
        </div>
        <div className="  bg-white box-border flex flex-row items-center justify-start py-0 px-[19px] max-w-full z-[1] mt-[-30px] border-[2px] border-solid border-neutral-colors-white">
          <div className="h-[95px] w-[531px] relative rounded-3xs bg-gray-500 box-border hidden max-w-full border-[1px] border-solid border-neutral-colors-white" />
          <input  type="text"
          autoComplete="off"
          onChange={(e) => setAdminName(e.target.value)}
          value={adminName}
                    className="outline-none relative text-lg  font-inter text-gray-300 text-left z-[2] mq450:text-lgi mq450:leading-[80px]"/>
            
        </div>
      </div>


      <div className="self-stretch h-[226px] relative max-w-full mq450:h-auto mq450:min-h-[226]">

      <div className="self-stretch flex flex-col items-center justify-center max-w-full">
        <div className="flex flex-row items-start justify-start py-0 px-[11px]">
          <div className="relative text-3xl leading-[100px] font-inter text-black text-left z-[1] mq450:text-lgi mq450:leading-[80px]">
               Contact Number
          </div>
        </div>
        <div className="  bg-white box-border flex flex-row items-center justify-start py-0 px-[19px] max-w-full z-[1] mt-[-30px] border-[2px] border-solid border-neutral-colors-white">
          <div className="h-[95px] w-[531px] relative rounded-3xs bg-gray-500 box-border hidden max-w-full border-[1px] border-solid border-neutral-colors-white" />
          <input   type="tel"
                    required className="outline-none relative text-lg  font-inter text-gray-300 text-left z-[2] mq450:text-lgi mq450:leading-[80px]"/>
            
        </div>
       
      
       <div className='flex flex-row h-[30px] mt-10'>
        <div className="flex flex-row items-center justify-start py-0 px-[11px]">
          <div className="relative text-3xl leading-[100px] font-inter text-black text-left z-[1] mq450:text-lgi mq450:leading-[80px]">
               Email ID
          </div>
        </div>
        <div className="   bg-white border-white  flex flex-row items-center justify-start py-[-20px] px-[19px] max-w-full z-[1] border-[1px] border-solid ">
          <div className="w-[531px] h-[20px] relative bg-gray-500 box-border hidden max-w-full border-[1px] border-solid " />
          <input   type="email"
          autoComplete="off"
          onChange={(e) => setAdminEmail(e.target.value)}
          value={adminEmail}
                    required className="outline-none  text-lg  font-inter text-gray-300 text-left z-[2] mq450:text-lgi mq450:leading-[80px]"/>
            
        </div>
        </div>

        <div className='flex flex-row h-[30px] py-3'>
        <div className="flex flex-row items-center justify-start py-0 px-[11px]">
          <div className="relative text-3xl leading-[100px] font-inter text-black text-left z-[1] mq450:text-lgi mq450:leading-[80px]">
                Password
          </div>
        </div>
        <div className="   bg-white border-white  flex flex-row items-center justify-start py-[-20px] px-[19px] max-w-full z-[1] border-[1px] border-solid ">
          <div className="w-[531px] h-[20px] relative bg-gray-500 box-border hidden max-w-full border-[1px] border-solid " />
          <input   type="email"
          autoComplete="off"
          onChange={(e) => setAdminPassword(e.target.value)}
          value={adminPassword}
                    required className="outline-none  text-lg  font-inter text-gray-300 text-left z-[2] mq450:text-lgi mq450:leading-[80px]"/>
            
        </div>
        </div>

        <div className='flex flex-row h-[30px]  relative right-[40px] '>
        <div className="flex  flex-row items-center justify-start py-0 px-[11px]">
          <div className="relative text-3xl leading-[100px] font-inter text-black text-left z-[1] mq450:text-lgi mq450:leading-[80px]">
                Confirm Password
          </div>
        </div>
        <div className="  border-white bg-white  flex flex-row items-center justify-start py-[-20px] px-[19px] max-w-full z-[1] border-[1px] border-solid ">
          <div className="w-[531px] h-[20px] relative bg-gray-500 box-border hidden max-w-full border-[1px] border-solid " />
          <input   type="email"
                    required className="outline-none  text-lg  font-inter text-gray-300 text-left z-[2] mq450:text-lgi mq450:leading-[80px]"/>
            
        </div>
        </div>

        {/* <div className='flex flex-row h-[30px]  relative right-[40px] '>
        <div className="flex  flex-row items-center justify-start py-0 px-[11px]">
          <div className="relative text-3xl leading-[100px] font-inter text-black text-left z-[1] mq450:text-lgi mq450:leading-[80px]">
                Confirm Password
          </div>
        </div>
        <Flex vertical gap="middle">
    <Radio.Group onChange={onChange} defaultValue="a" className='mt-2'>
      <Radio.Button value="a">Hangzhou</Radio.Button>
      <Radio.Button value="b">Shanghai</Radio.Button>
      <Radio.Button value="c">Beijing</Radio.Button>
      <Radio.Button value="d">Chengdu</Radio.Button>
    </Radio.Group>
    </Flex>
        </div> */}
        


        
        <Link to="/register_doctor" className='py-3 mt-7 text-black no-underline'>Register as Doctor</Link>
        <Link to="/register_admin" className='text-black no-underline'>Register as a Admin</Link>
      </div>


        {/* <div className="absolute top-[178px] left-[200px] text-xl leading-[125%] font-inter text-black text-left z-[1] mq450:text-base mq450:leading-[20px]">
          Forgot password?
        </div> */}

<div className="cursor-pointer self-stretch flex flex-row items-start justify-start py-10 pr-0 pl-[13px] box-border max-w-full">
        <div className="flex-1 flex flex-row items-center justify-start max-w-full">
          <div className="h-[72px] w-[518px] relative rounded-6xl bg-mediumpurple-100 max-w-full z-[1]" />
          <button onClick={handleRegisterAdmin} className="relative text-17xl bg-transparent font-inter text-neutral-colors-white text-left z-[2] ml-[-321px]">
            Register
          </button>
        </div>
      </div>
      </div>


    
    </form>
    </div>
  </>
  )
}

export default Register_admin