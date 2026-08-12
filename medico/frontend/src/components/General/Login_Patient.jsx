import React from 'react'
import { Link,useLocation,useNavigate} from 'react-router-dom'
import { useRef,useState,useEffect,useContext} from 'react'
import AuthContext from '../../../Context/AuthContext'

const Login_Patient = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const {loginApiCallPatient} = useContext(AuthContext)

    const [user,setUser]=useState('');
    const [pwd,setPwd]=useState('');
    

   const handleSubmit=async (e)=>{
      e.preventDefault();
      console.log(user,pwd);    
     let payload={
      email:user,
      password:pwd
     }
     
     await loginApiCallPatient(payload)
    
   }
   const handleHome=async (e)=>{
      navigate("/")
  
 }
  return (
    <div className='flex lg:flex-row sm:flex-col md:flex-col'>
      <div className='sm:hidden md:hidden opacity-100 bg-slate-300'>
        <img className='mt-[110px] ' src="/vector.svg" alt="" />
      </div>
     
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gradient-to-r from-sky-500 to-indigo-500 px-5 sm:px-0 ">
      <div onClick={handleHome} className='text-white font-extrabold cursor-pointer hover:bg-blue-600 hover:shadow-2xl p-2 '>Back to Home</div>
     <img src="/logo.png" alt="" />
    <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
      <div
        className="hidden md:block bg-cover bg-center"
        style={{
          backgroundImage: `url('/vector.svg')`,
        }}
      ></div>
      
      <div className="w-full p-8 ">
        <div className="text-[25px] text-center mb-4 font-bold space-x-1 " style={{ fontFamily: '"Alfa Slab One", serif' }}>Patient Login</div>
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 ">
            Email Address
          </label>
          <input
            className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
            type="text"
            id="username"
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />
        </div>
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
            type="password"
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
          <a
            href="#"
            className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
          >
            Forget Password?
          </a>
        </div>
        <div className="mt-8">
          <button
            onClick={handleSubmit}
            className=" bg-blue-800 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600"
          >
            Login
          </button>
        </div>
        <div className="flex justify-center mt-8">
          <Link
            to="/loginDoctor"
            className=" bg-blue-600 hover:bg-blue-400 p-2 rounded-sm text-white no-underline"
          >
            Login as Doctor
          </Link>
        </div>
      </div>
    </div>
  </div>
  </div>
  )
}

export default Login_Patient