import { Navigate } from "react-router-dom"
import { useContext } from "react"
import AuthContext from "../Context/AuthContext"
import { jwtDecode } from "jwt-decode"
const DoctorRoutes = ({children}) => {

    const {user} = useContext(AuthContext)
   //  && user.role=="ADMIN"
   let token = localStorage.getItem("token");
   let userProfle = localStorage.getItem("userProfile");
   let decodedToken = null;
   
   // Check if user profile exists and decode the token
   if (userProfle) {
       decodedToken = jwtDecode(JSON.parse(userProfle).token);
   }

   // Check if user is logged in or if token is present
   if (user || token) {
       // Check if decoded token is null or if it doesn't have a role property
       if (!decodedToken || !decodedToken.role) {
           // If decodedToken is null or if it doesn't have a role property, redirect to login
           localStorage.clear();
           return <Navigate to="/loginPatient" />;
       }

       // Check if role is "DOCTOR"
       if (decodedToken.role !== "DOCTOR") {
           // If role is not "DOCTOR", clear local storage and redirect to login
           localStorage.clear();
           return <Navigate to="/loginPatient" />;
       }

       // If decodedToken exists, has a role property, and role is "DOCTOR", allow access to children
       return children;
   }
   else{
   localStorage.clear();
   return <Navigate to="/loginPatient" />
   }
   

}

export default DoctorRoutes