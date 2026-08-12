import { Navigate } from "react-router-dom"
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { jwtDecode } from "jwt-decode";
const PatientRoutes = ({children}) => {
       
//    && user.role=="PATIENT"
 
    let userProfle = localStorage.getItem("userProfile");
    const decodedToken = jwtDecode(JSON.parse(userProfle).token);
    console.log("inside patient route",decodedToken);

        if (decodedToken) {
            
            if (!decodedToken || !decodedToken.role) {
                
                localStorage.clear();
                return <Navigate to="/loginPatinet" />;
            }

    // Check if role is "PATIENT"
    if (decodedToken.role !== "PATIENT") {
        // If role is not "PATIENT", clear local storage and redirect to login
        localStorage.clear();
        return <Navigate to="/loginPatient" />;
    }

    // If decodedToken exists, has a role property, and role is "PATIENT", allow access to children
    console.log("children is", children);
    return children;
}
    else{
        localStorage.clear();
        return <Navigate to="/loginPatinet" />
    }
   
   
}

export default PatientRoutes