import { Navigate } from "react-router-dom"
import AuthContext from "../Context/AuthContext"
import { useContext } from "react"

const AdminRoutes = ({children}) => {
    const {user} = useContext(AuthContext)
   //  && user.role=="ADMIN"
   let token = localStorage.getItem("token")
    if(user||token ){
         
      return children;
    
   }
   else{
   localStorage.clear();
   return <Navigate to="/loginPatinet" />
   }
}

export default AdminRoutes