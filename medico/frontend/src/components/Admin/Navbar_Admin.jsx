import React from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../../Context/AuthContext'
import { useContext } from 'react'

const Navbar_Admin = () => {
    const {logoutAPICall} = useContext(AuthContext)    
    const logout=async (e)=>{
      e.preventDefault();
     logoutAPICall()
    
   }
  return (
    <div className=" h-[1186px] flex flex-col items-center justify-center py-0   box-border mq1025:hidden ">
    <div className="flex-1 flex flex-row items-start justify-start relative">
      <div className="h-12 w-[82px] absolute my-0 mx-[!important] top-[234px] ">
        <div className="absolute top-[0px] left-[0px] rounded-tl-none rounded-tr-8xs rounded-br-8xs rounded-bl-none w-full h-full z-[1]" />
       
      </div>
      <nav className=" m-0 self-stretch bg-gradient-to-r from-sky-500 to-indigo-500 flex flex-col items-center justify-start py-[193px] pr-[92px] pl-[27px] gap-[33px_0px] text-left text-base text-gray-1100 font-nunito mq750:pt-[125px] mq750:pb-[125px] mq750:box-border">
  <div className="w-[218px] h-screen relative hidden" />
 
  <div className="flex flex-row items-start justify-start py-0 ">
    <div className="flex flex-row items-start justify-start gap-[0px_13px]">
      <img
        className="h-[17px] w-5 relative z-[1]"
        loading="eager"
        alt=""
        src="/home.svg"
      />
      <Link to="/admin" className="relative font-semibold z-[1] no-underline text-black">Home</Link>
    </div>
  </div>

  <div className="flex flex-row items-start justify-start py-0 ">
    <div className="flex flex-row items-start justify-start gap-[0px_13px]">
      <img
        className="h-[17px] w-5 relative z-[1]"
        loading="eager"
        alt=""
        src="https://cdn-icons-png.flaticon.com/128/1348/1348448.png"
      />
      <Link to="/admin" onClick={logout} className="relative font-semibold z-[1] no-underline text-black">Log Out</Link>
    </div>
  </div>
  
  <div className="flex flex-row items-center justify-start gap-[0px_13px]">
    <img
      className="h-6 w-6 relative object-cover min-h-[24px] z-[1]"
      loading="eager"
      alt=""
      src="/iconlybolddocument@2x.png"
    />
    <Link to="/adminApproval" className="relative font-semibold z-[1] no-underline text-black">Approvals</Link>
    
  </div>
  <div className="flex flex-row items-center justify-start gap-[0px_13px]">
    <img
      className="h-6 w-6 relative object-cover min-h-[24px] z-[1]"
      loading="eager"
      alt=""
      src="https://cdn-icons-png.flaticon.com/128/11472/11472723.png"
    />
    <Link to="/Hospital_Detail" className="relative font-semibold z-[1] no-underline text-black">Hospital</Link>
    
  </div>
 
</nav>
    </div>
  </div>
  )
}

export default Navbar_Admin