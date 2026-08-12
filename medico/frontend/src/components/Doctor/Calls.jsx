import React from 'react'
import NavbarDoc from './NavbarDoc'
import { useNavigate } from 'react-router-dom'
const Calls = () => {
     const navigate = useNavigate()
    const gotoqueue=()=>{
        navigate("/queueVideoCall")
       
    }
    const gotoschedule=()=>{
        navigate("/video_call_doc")
    }
  return (
    <div className="flex gap-4 bg-whitesmoke-400 overflow-hidden">
    <NavbarDoc />
    <main className="flex-1 ">
     <div className='flex flex-row h-screen w-full gap-1 p-2 mt-[100px] '>

            <div className=' w-full flex flex-col gap-1'>
                  <img className='w-[650px] h-[350px] shadow-2xl ' src="https://www.agilecrm.com/blog/wp-content/uploads/2016/07/appointment-scheduling.png" />
                  <div onClick={gotoschedule} className='cursor-pointer hover:bg-slate-600 bg-slate-400 rounded-md font-extrabold text-center pt-[40px] text-[40px] h-[150px]'>Scheduled Appointments</div>
            </div>

            <div className=' w-full flex flex-col gap-1'>
                <img className='w-full h-[350px] shadow-2xl ' src="https://webprint.in/wp-content/uploads/2023/04/Queue-Management-System-or-Token-Generation-Software-scaled.jpg" alt="" />
                <div onClick={gotoqueue} className=' cursor-pointer hover:bg-slate-600 bg-slate-400 h-[150px] rounded-md font-extrabold text-center pt-[40px] text-[40px]'>Queued Appointments</div>
            </div>
            
            </div>
    </main>
  </div>
   
  )
}

export default Calls