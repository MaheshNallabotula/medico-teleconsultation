// import * as store from "./store.js";
// import * as wss from "./wss.js";
// import * as webRTCHandler from "./webRTCHandler.js";
// import * as constants from "./constants.js";
// import * as ui from "./ui.js";
// import * as recordingUtils from "./recordingUtils.js";
// import io from "socket.io-client";
// import axios from "axios";
// import { useState } from "react";
// // initialization of socketIO connection




 




// document.addEventListener("DOMContentLoaded", function() {
//   // if(window.location.pathname === '/video_call_doc')
//   // {
//   //   webRTCHandler.getLocalPreview();
//   // }
// //register event listener for personal code copy button

// webRTCHandler.getLocalPreview();

// // register event listeners for connection buttons

// const personalCodeChatButton = document.getElementById(
//   "personal_code_chat_button"
// );

// const personalCodeVideoButton = document.getElementById(
//   "personal_code_video_button"
// );

// personalCodeChatButton.addEventListener("click", () => {
//   console.log("chat button clicked");

//   //axios call to fetch socket id 
//   let fetchedSocketId = "";
//   let x = localStorage.getItem("consulId");
//   let response = axios.get(`${import.meta.env.REACT_APP_BACKEND_URL}/api/patient/getSocketOfDoctor/${x}`);
//   response.then(response => {
//     if (response && response.data) {
//       fetchedSocketId = response.data.socketId;
//       console.log("Fetched socket ID:", fetchedSocketId); // This will log the fetched socket ID correctly
//       const calleePersonalCode = fetchedSocketId;
//       const callType = constants.callType.CHAT_PERSONAL_CODE;
//       console.log("test socket", calleePersonalCode);
//       webRTCHandler.sendPreOffer(callType, calleePersonalCode);
//     } else {
//       console.log("Response or data is missing.");
//     }
//   }).catch(error => {
//     console.error("Error fetching socket ID:", error);
//   });
// });

// personalCodeVideoButton.addEventListener("click", () => {
//   console.log("video button clicked");
//   var fetchedSocketId=""
//   let x = localStorage.getItem("consulId")
//   let response = axios.get(`${import.meta.env.REACT_APP_BACKEND_URL}/api/patient/getSocketOfDoctor/${x}`)
//   response.then(response => {
  
//     if (response && response.data) {
//       fetchedSocketId = response.data.socketId;
//       console.log(fetchedSocketId);
//       const calleePersonalCode = fetchedSocketId
//       const callType = constants.callType.VIDEO_PERSONAL_CODE;
    
//       webRTCHandler.sendPreOffer(callType, calleePersonalCode);
//     } else {
//       console.log("Response or data is missing.");
//     }
//   })
// });
// //// this is for queue butttons

// const currentEvent = document.getElementById("current_video_button");
// const nextEvent = document.getElementById("next_video_button")

// // event listner for video call buttons

// const micButton = document.getElementById('mic_button');
// micButton.addEventListener('click', () => {
//   const localStream = store.getState().localStream;
//   const micEnabled = localStream.getAudioTracks()[0].enabled;
//   localStream.getAudioTracks()[0].enabled = !micEnabled;
//   ui.updateMicButton(micEnabled);
// });

// const cameraButton = document.getElementById( 'camera_button' );
// cameraButton.addEventListener('click', ()=>{
//   const localStream = store.getState().localStream;
//   const cameraEnabled = localStream.getVideoTracks()[0].enabled;

//   localStream.getVideoTracks()[0].enabled = !cameraEnabled;
//   ui.updateCameraButton(cameraEnabled);
// });

// const switchForScreenSharingButton = document.getElementById('screen_sharing_button');
// switchForScreenSharingButton.addEventListener('click', () => {
//   const screenSharingActive = store.getState().screenSharingActive;
//   webRTCHandler.switchBetweenCameraAndScreenSharing(screenSharingActive);
// });

// /// messenger

// const newMessageInput = document.getElementById( 'new_message_input' );
// newMessageInput.addEventListener('keydown', (event) => {
//   console.log('change occured');
//   const key = event.key;

//   if(key === "Enter"){
//     webRTCHandler.sendMessageUsingDataChannel(event.target.value);
//     ui.appendMessage(event.target.value, true);
//     newMessageInput.value = "";
//   }
// });

// const sendMessageButton = document.getElementById('send_message_button');
// sendMessageButton.addEventListener('click', () =>{
//   const message = newMessageInput.value;
//   webRTCHandler.sendMessageUsingDataChannel(message);
//   ui.appendMessage(message, true);
//   newMessageInput.value = "";
// });


// // recording

// const startRecordingButton = document.getElementById("start_recording_button");
// startRecordingButton.addEventListener( "click", ()=>{
//   recordingUtils.startRecording();
//   ui.showRecordingPannel();
// });

// const stopRecordingButton = document.getElementById( "stop_recording_button" );
// stopRecordingButton.addEventListener("click", ()=>{
//   recordingUtils.stopRecording();
//   ui.resetRecordingButtons();
// });

// const pauseRecordingButton = document.getElementById("pause_recording_button");
// pauseRecordingButton.addEventListener("click", ()=>{
//   recordingUtils.pauseRecording();
//   ui.switchRecordingButtons(true);  

// });

// const resumeRecordingButton = document.getElementById("resume_recording_button");
// resumeRecordingButton.addEventListener( "click", ()=> {
//   recordingUtils.resumeRecording();
//   ui.switchRecordingButtons()
// });


// //hang up

// const hangUpButton =  document.getElementById('hang_up_button');
// hangUpButton.addEventListener('click', ()=>{
//   webRTCHandler.handleHangUp();
// });

// const hangUpChatButton = document.getElementById('finish_chat_call_button');
// hangUpChatButton.addEventListener('click', () => {
//   webRTCHandler.handleHangUp();
// });
// });

