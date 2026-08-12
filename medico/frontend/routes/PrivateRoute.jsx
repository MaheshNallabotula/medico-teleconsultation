import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { useContext } from "react"
import AuthContext from "../Context/AuthContext"
import { jwtDecode } from "jwt-decode";
import { Spin } from 'antd';


const PrivateRoute = ({ children, accessBy }) => {
  const [decodedToken, setDecodedToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userProfileString = localStorage.getItem("userProfile");
        if (userProfileString) {
          const userProfile = JSON.parse(userProfileString);
          if (userProfile && userProfile.token) {
            const decoded = jwtDecode(userProfile.token);
            console.log("Decoded token:", decoded);
            setDecodedToken(decoded);
          } else {
            setDecodedToken(null); // If token is removed from local storage (e.g., after logging out)
          }
        } else {
          setDecodedToken(null);
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        setDecodedToken(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [pathname]); // Refetch token when pathname changes (e.g., after logging out)

  if (loading) {
    return <Spin />;
  }

  console.log("Accessing route:", pathname);

  if (accessBy === "non-authenticated" && decodedToken === null) {
    console.log("Non-authenticated route");
    return children;
  } else if (accessBy === "authenticated") {
    if (decodedToken) {
      console.log("Authenticated route entered by");
      console.log("Decoded token:", decodedToken);
      return children;
    } else {
      return <Navigate to="/loginPatient" />;
    }
  } else {
    if (decodedToken) {
      switch (decodedToken.role) {
        case "ADMIN":
          return <Navigate to="/admin" />;
        case "PATIENT":
          return <Navigate to="/patient" />;
        case "DOCTOR":
          return <Navigate to="/doctor" />;
        default:
          localStorage.clear();
          return <Navigate to="/loginPatient" />;
      }
    } else {
      localStorage.clear();
      return <Navigate to="/loginPatient" />;
    }

  }
};

export default PrivateRoute;
