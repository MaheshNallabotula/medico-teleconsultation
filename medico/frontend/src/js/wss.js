import * as store from "./store.js";
import * as ui from "./ui.js";
import * as webRTCHandler from "./webRTCHandler.js";
import * as constants from "./constants.js";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useEffect } from "react";
import React from "react";
import { notification } from "antd";
let socketIO = null;



export const registerSocketEvents = (socket) => {
  socketIO = socket;
  
  

  socket.on("connect", () => {
    const x = jwtDecode(localStorage.getItem("token"))
   if(x.role==='DOCTOR'){ 
    const profile = JSON.parse(localStorage.getItem("userProfile"))
    let payload = {
      docId:profile.id,
      socketId:socket.id
   }
   let apiResponse = axios.post(import.meta.env.REACT_APP_BACKEND_URL +"/api/doctor/putSocketOfDoctor",payload)
   console.log(apiResponse);
  }
    console.log("succesfully connected to socket.io server");
    

    store.setSocketId(socket.id);
  });

  socket.on("pre-offer", (data) => {
    webRTCHandler.handlePreOffer(data);
  });

  socket.on("pre-offer-answer", (data) => {
    webRTCHandler.handlePreOfferAnswer(data);
  });

  socket.on('user-hanged-up', () => {
    webRTCHandler.handleConnectedUserHangedUp();
  })
  socket.on("webRTC-signaling", (data) => {
    switch (data.type) {
      case constants.webRTCSignaling.OFFER:
        webRTCHandler.handleWebRTCOffer(data);
        break;
      case constants.webRTCSignaling.ANSWER:
        webRTCHandler.handleWebRTCAnswer(data);
        break;
      case constants.webRTCSignaling.ICE_CANDIDATE:
        webRTCHandler.handleWebRTCCandidate(data);
        break;
      default:
        return;
    }
  });

  // API CALLL
  socket.on("user-otp-request", () => {
    const profile = JSON.parse(localStorage.getItem("userProfile"));
    const id = profile.id
    axios.get(`${import.meta.env.REACT_APP_BACKEND_URL}/api/patient/getOtp/${id}`)
    .then(response => {
      const password = response.data.password;
      console.log("Password:", password); 
      notification.success({
        message: 'OTP Received',
        description: `The OTP for documents sharing is: ${password}`,
        duration: 15
      });

      webRTCHandler.patientid();
    })
    .catch(error => {
      // Handle any errors
      console.error("Error:", error);
    });
  });

  socket.on("patient-id", (data) => {
    console.log(data.patientId);
    localStorage.setItem("vcPatId",data.patientId)
  })
};

export const sendPreOffer = (data) => {
  console.log("emmiting to server pre offer event");
  socketIO.emit("pre-offer", data);
};

export const sendPreOfferAnswer = (data) => {
  socketIO.emit("pre-offer-answer", data);
};

export const sendDataUsingWebRTCSignaling = (data) => {
  socketIO.emit("webRTC-signaling", data);
}


export const sendUserHangUp = (data) => {
  socketIO.emit("user-hanged-up", data);
}

// otp
export const sendUserOTPRequest = (data) => {
  socketIO.emit("user-otp-request", data);
}

// sending patient id
export const sendPatientId = (data) => {
  socketIO.emit("send-patient-id",data);
}