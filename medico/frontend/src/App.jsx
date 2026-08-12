import { useContext, useState,useEffect } from 'react'
import {Routes,Route,Link,useLocation} from 'react-router-dom'
import Layout from './Layout'
import Landing from './components/General/Landing'
import Login from './components/General/Login'
import Missing from './Missing'
import Admin_Home from './components/Admin/Admin_Home'
import Patient_Home from './components/Patient/Patient_Home'
import Doctor_Home from './components/Doctor/Doctor_Home'
import DoctorRoutes from '../routes/DoctorRoutes'
import AdminRoutes from '../routes/AdminRoutes'
import PatientRoutes from '../routes/PatientRoutes'
import Register_patient from './components/General/Register_patient'
import Regiester_doctor from './components/General/Regiester_doctor'
import Register_admin from './components/General/Register_admin'
import Patient_History from './components/Patient/Patient_History'
import AuthContext, { AuthContextProvider } from '../Context/AuthContext'
import Session_Out from './components/Session_out/Session_Out'
import Patient_View from './components/Patient/Patient_View'
import Login_Patient from './components/General/Login_Patient'
import Login_Doctor from './components/General/Login_Doctor'
import SpecializationPage from './components/Patient/SpecializationPage'
import SpecializationPage2 from './components/Patient/SpecializationPage2'
import DoctorDetails from './components/Patient/DoctorDetails'
import PrivateRoute from '../routes/PrivateRoute'
import BookAppointment from './components/Patient/BookAppointment'
import BookSlot from './components/Patient/BookSlot'
import BookNow from './components/Patient/BookNow'
import Success from './components/Patient/Success'
import Doctor_View from './components/Doctor/Doctor_View'
import Doctor_History from './components/Doctor/Doctor_History'
import VideoCallDoc from './components/Doctor/VideoCallDoc'
import VideoCallPatient from './components/Patient/VideoCallPatient'
import Appointments from './components/Patient/Appointments'
import Landing2 from './components/General/Landing2'
import DocDet from './components/Patient/DocDet'
import EnterHospital from './components/Patient/EnterHospital'
import Approvals from './components/Admin/Approvals'
import Hospital_Detail from './components/Admin/Hospital_Detail'
import WaitingQueue from './components/Patient/WaitingQueue'
import Inspection from './components/Doctor/Inspection'
import QueueVideoCall from './components/Patient/QueueVideoCall'
import QueueVideoCallDoc from './components/Doctor/QueueVideoCallDoc'
import Calls from './components/Doctor/Calls'
// import VideoCall from './components/Patient/video call/VideoCall'


function App() {
 
 
  const {user} = useContext(AuthContext)
  const location = useLocation();
  

  return (
    <>
     <AuthContextProvider>
    <Routes>
        <Route path="/" element={<Layout/>}  >

        
            <>
            <Route path="/" element={ <PrivateRoute  accessBy="non-authenticated"><Landing2 /></PrivateRoute>} />
              <Route path="/login" element={<PrivateRoute  accessBy="non-authenticated"><Login /></PrivateRoute>} />
              <Route path="/loginPatient" element={<PrivateRoute  accessBy="non-authenticated"><Login_Patient /></PrivateRoute>} />
              <Route path="/loginDoctor" element={<PrivateRoute  accessBy="non-authenticated"><Login_Doctor /></PrivateRoute>} />
              <Route path="/register_patient" element={<PrivateRoute  accessBy="non-authenticated"><Register_patient /></PrivateRoute>} />
              <Route path="/register_doctor" element={<PrivateRoute  accessBy="non-authenticated"><Regiester_doctor /></PrivateRoute>} />
              <Route path="/register_admin" element={<PrivateRoute  accessBy="non-authenticated"><Register_admin /></PrivateRoute>} />

            </>
        
          {/* protected Routes */}
           <Route path='/admin'  element={ <PrivateRoute  accessBy="authenticated"> <AdminRoutes>  <Admin_Home />  </AdminRoutes> </PrivateRoute> }> </Route>
           <Route path='/adminApproval'  element={ <PrivateRoute  accessBy="authenticated"> <AdminRoutes>  <Approvals />  </AdminRoutes> </PrivateRoute> }> </Route>
           <Route path='/Hospital_Detail'  element={ <PrivateRoute  accessBy="authenticated"> <AdminRoutes>  <Hospital_Detail />  </AdminRoutes> </PrivateRoute> }> </Route>

      
           <Route path='/patient'  element={ <PrivateRoute  accessBy="authenticated"> <PatientRoutes>  <Patient_Home />  </PatientRoutes> </PrivateRoute> }> </Route>
            <Route path='/patient_History'   element={ <PrivateRoute  accessBy="authenticated">  <PatientRoutes>  <Patient_History />  </PatientRoutes> </PrivateRoute>}> </Route>
            <Route path='/patient_View'   element={ <PrivateRoute  accessBy="authenticated">  <PatientRoutes>  <Patient_View />  </PatientRoutes> </PrivateRoute>}> </Route>
            <Route path='/specialization'   element={ <PrivateRoute  accessBy="authenticated">  <PatientRoutes>  <SpecializationPage />  </PatientRoutes> </PrivateRoute>}> </Route>
            <Route path='/specialization2'   element={ <PrivateRoute  accessBy="authenticated">  <PatientRoutes>  <SpecializationPage2 />  </PatientRoutes> </PrivateRoute>}> </Route>
            <Route path='/docDetails'   element={ <PrivateRoute  accessBy="authenticated">  <PatientRoutes>  <DoctorDetails />  </PatientRoutes> </PrivateRoute>}> </Route>
            <Route path='/bookSlot'   element={ <PrivateRoute  accessBy="authenticated">  <PatientRoutes>  <BookSlot />  </PatientRoutes> </PrivateRoute>}> </Route>
            <Route path='/bookAppointment'   element={ <PrivateRoute  accessBy="authenticated">  <PatientRoutes>  <BookAppointment />  </PatientRoutes> </PrivateRoute>}> </Route>
            <Route path='/checkout'   element={ <PrivateRoute  accessBy="authenticated">  <PatientRoutes>  <BookNow />  </PatientRoutes> </PrivateRoute>}> </Route>
            <Route path='/bookingDone'   element={ <PrivateRoute  accessBy="authenticated">  <PatientRoutes>  <Success />  </PatientRoutes> </PrivateRoute>}> </Route>
            <Route path='/videoCallPatient'   element={ <PrivateRoute  accessBy="authenticated">  <PatientRoutes>  <VideoCallPatient />  </PatientRoutes> </PrivateRoute>}> </Route>
            <Route path='/appointments'   element={ <PrivateRoute  accessBy="authenticated">  <PatientRoutes>  <Appointments />  </PatientRoutes> </PrivateRoute>}> </Route>
            <Route path='/details'   element={ <PrivateRoute  accessBy="authenticated">  <PatientRoutes>  <DocDet />  </PatientRoutes> </PrivateRoute>}> </Route>
            <Route path='/hospital'   element={ <PrivateRoute  accessBy="authenticated">  <PatientRoutes>  <EnterHospital />  </PatientRoutes> </PrivateRoute>}> </Route>
            <Route path='/waitingArea'   element={ <PrivateRoute  accessBy="authenticated">  <PatientRoutes>  <WaitingQueue/>  </PatientRoutes> </PrivateRoute>}> </Route>
            <Route path='/videoCallQueue'   element={ <PrivateRoute  accessBy="authenticated">  <PatientRoutes>  <QueueVideoCall/>  </PatientRoutes> </PrivateRoute>}> </Route>


            {/* <Route path='/videoCall'   element={ <PrivateRoute  accessBy="authenticated">  <PatientRoutes>  <VideoCall/>  </PatientRoutes> </PrivateRoute>}> </Route> */}
              <Route path='/doctor'   element={ <PrivateRoute  accessBy="authenticated"> <DoctorRoutes>  <Doctor_Home />  </DoctorRoutes></PrivateRoute> }> </Route>
              <Route path='/doctor_home'   element={ <PrivateRoute  accessBy="authenticated"> <DoctorRoutes>  <Doctor_View />  </DoctorRoutes></PrivateRoute> }> </Route>
              <Route path='/doctor_history'   element={ <PrivateRoute  accessBy="authenticated"> <DoctorRoutes>  <Doctor_History />  </DoctorRoutes></PrivateRoute> }> </Route>
              <Route path='/video_call_doc'   element={ <PrivateRoute  accessBy="authenticated"> <DoctorRoutes>  <VideoCallDoc />  </DoctorRoutes></PrivateRoute> }> </Route>
              <Route path='/inspection'   element={ <PrivateRoute  accessBy="authenticated"> <DoctorRoutes>  <Inspection />  </DoctorRoutes></PrivateRoute> }> </Route>
              <Route path='/queueVideoCall'   element={ <PrivateRoute  accessBy="authenticated"> <DoctorRoutes>  <QueueVideoCallDoc />  </DoctorRoutes></PrivateRoute> }> </Route>
              <Route path='/calls'   element={ <PrivateRoute  accessBy="authenticated"> <DoctorRoutes>  <Calls />  </DoctorRoutes></PrivateRoute> }> </Route>


          {/* 404 page  */}
          <Route path="*"   element={<Missing/>} />

        </Route>
    </Routes>
    </AuthContextProvider>
    </>
  )
}

export default App
