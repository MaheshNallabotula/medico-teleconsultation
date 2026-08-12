import { useState, useEffect, useRef } from 'react'
// import * as elements from "../../js/elements"
import * as constants from "../../queuejs/constants"
import * as ui from "../../queuejs/ui"
import * as wss from "../../queuejs/wss"
import * as store from "../../queuejs/store"
import * as webRTCHandler from "../../queuejs/webRTCHandler"
// import * as main from "../../js/main"
import * as recordingUtils from "../../queuejs/recordingUtils"
import "../../css/style.css"
import io from "socket.io-client";
import axios from 'axios'
import { notification } from 'antd'
import Prescription from './Prescription'
const ENDPOINT = import.meta.env.REACT_APP_SIGNAL_URL;

// const socket = io.connect(ENDPOINT);

// wss.registerSocketEvents(socket);
// webRTCHandler.getLocalPreview();
// const defaultConstraints = {
//     audio: true,
//     video: true,
// };

// const getLocalPreview = () => {
    
//     navigator.mediaDevices
//       .getUserMedia(defaultConstraints)
//       .then((stream) => {
//         ui.updateLocalVideo(stream);
//         ui.showVideoCallButtons();
//         store.setCallState(constants.callState.CALL_AVAILABLE);
//         store.setLocalStream(stream);
//       })
//       .catch((err) => {
//         console.log("error occured when trying to get an access to camera");
//         console.log(err);
//       });
    
    
// };


function QueueVideoCallDoc() {
   const [docProfile,setDocProfile] = useState([])
   const patId = localStorage.getItem("patientId")
useEffect(()=>{
    const fetchData=async()=>{
    const profile = JSON.parse(localStorage.getItem('userProfile'));
    const id = profile.id;
    let apiResponse = await axios.get(`${import.meta.env.REACT_APP_BACKEND_URL}/api/doctor/getDoctorDetails/${id}`)
     setDocProfile(apiResponse.data)
    }
    fetchData()
},[])



    ///new way of code
    // const [personalCode, setPersonalCode] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const streamRef = useRef(null);
    const [show,setShow] = useState(false)

    const [modalVisible, setModalVisible] = useState(false);

    const handleAddPrescription = () => {
      setModalVisible(true);
    };
  
    const handleModalCancel = () => {
      setModalVisible(false);
    };
  
    const handleUploadPrescription = async(payload) => {
      // Handle prescription upload here
      console.log('Prescription payload:', payload);
      let apiResponse = await axios.post(import.meta.env.REACT_APP_BACKEND_URL +"/api/doctor/addPrescriptionToConsultation",payload)
      if(apiResponse){
        notification.success({
            message: 'Prescription Uploaded Successfully',
            duration: 15
          });
      }
      setModalVisible(false);
    };

    
    useEffect(() => {
        
        const socket = io.connect(ENDPOINT);
        wss.registerSocketEvents(socket);
        // webRTCHandler.getLocalPreview();

        const defaultConstraints = {
            audio: true,
            video: true,
        };

        const getLocalPreview = () => {
            return navigator.mediaDevices.getUserMedia(defaultConstraints);
        };

        getLocalPreview()
            .then((stream) => {
                // Assume ui and store are accessible and set up correctly
                ui.updateLocalVideo(stream);
                ui.showVideoCallButtons();
                store.setCallState(constants.callState.CALL_AVAILABLE);
                store.setLocalStream(stream);
                streamRef.current = stream;
            })
            .catch((err) => {
                console.error("Error occurred when trying to get access to camera");
                console.error(err);
            });

        

        return () => {
            // Cleanup function to disconnect socket when component unmounts
            socket.disconnect();
            streamRef.current?.getTracks().forEach(track => track.stop());

       };
    }, []);

    // event listeners for handling calls

    const handleVideoCall = async () => {
        setShow(true);
        const profile = JSON.parse(localStorage.getItem('userProfile'));
        const id = profile.id;
        
        try {
            // First Axios request
            let apiResponse = await axios.get(`${import.meta.env.REACT_APP_BACKEND_URL}/api/doctor/callNextPatientFromQueue/${id}`);
            console.log(apiResponse.data);
            localStorage.setItem("patientId", apiResponse.data.patientId);
            localStorage.setItem("consultId", apiResponse.data.consultationId);
            const patId =  localStorage.getItem("patientId")
            
    
            
            // Second Axios request
            const response2 = await axios.get(`${import.meta.env.REACT_APP_BACKEND_URL}/api/doctor/getSocketOfPatient/${apiResponse.data.patientId}`);
            const callType = constants.callType.VIDEO_PERSONAL_CODE
            webRTCHandler.sendPreOffer(callType,response2.data.socketId );
            // Handle the response of the second request here
        } catch (error) {
            notification.error({
                message:"Patient not found",
                description:"There is no patient in the queue, We will notify you through the mail when any patient is available.",
                duration:10})
            console.error("Error occurred:", error);
        }
    };

    const handleOpen =()=>{
        setModalVisible(true)
    }

    const handleNextCall = async() => {
        setShow(false)
        try {
        const profile = JSON.parse(localStorage.getItem('userProfile'));
        const id = profile.id;
        let apiResponse = await axios.get(`${import.meta.env.REACT_APP_BACKEND_URL}/api/doctor/getSocketOfNextPatient/${id}`)
        if(apiResponse){
            notification.success({
                message: 'You are redirected to next patient!!',
                description: `Please click the call button to continuoue with next patient `,
                duration: 10
              });
        }
        else{
            notification.error({
                message:"Patient not found",
                description:"There is no patient in the queue, We will notify you through the mail when any patient is available.",
                duration:10})
        }
        localStorage.setItem("patientId",null)
        localStorage.setItem("consultId",null)}
        catch (error) {
            notification.error({
                message:"Patient not found",
                description:"There is no patient in the queue, We will notify you through the mail when any patient is available.",
                duration:10})
            console.error("Error occurred:", error);
        }

    }
    
    // event listener for video call buttons
    const handleMicButtonClick = () => {
        const localStream = store.getState().localStream;
        const micEnabled = localStream.getAudioTracks()[0].enabled;
        localStream.getAudioTracks()[0].enabled = !micEnabled;
        ui.updateMicButton(micEnabled);
    };

    const handleCameraButtonClick = () => {
        const localStream = store.getState().localStream;
        const cameraEnabled = localStream.getVideoTracks()[0].enabled;
        localStream.getVideoTracks()[0].enabled = !cameraEnabled;
        ui.updateCameraButton(cameraEnabled);
    };

    const handleScreenSharingButtonClick = () => {
        const screenSharingActive = store.getState().screenSharingActive;
        webRTCHandler.switchBetweenCameraAndScreenSharing(screenSharingActive);
    };

    // messenger
    const handleNewMessageInputChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleNewMessageInputKeyDown = (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    };

    const handleSendMessageButtonClick = () => {
        sendMessage();
    };

    const sendMessage = () => {
        const message = newMessage.trim();
        if (message) {
            webRTCHandler.sendMessageUsingDataChannel(message);
            ui.appendMessage(message, true);
            setNewMessage("");
        }
    };


    /// recording
    const handleStartRecordingButtonClick = () => {
        recordingUtils.startRecording();
        ui.showRecordingPannel();
    };

    const handleStopRecordingButtonClick = () => {
        recordingUtils.stopRecording();
        ui.resetRecordingButtons();
    };

    const handlePauseRecordingButtonClick = () => {
        recordingUtils.pauseRecording();
        ui.switchRecordingButtons(true);
    };

    const handleResumeRecordingButtonClick = () => {
        recordingUtils.resumeRecording();
        ui.switchRecordingButtons();
    };

    // hang up
    const handleHangUpButtonClick = () => {
        webRTCHandler.handleHangUp();
    };

    const handleHangUpChatButtonClick = () => {
        webRTCHandler.handleHangUp();
    };

  return (
    <>
    <div>
    <div className='main_container'>
    <div className='dashboard_container '>
        <div className='logo_container'>
            <img src='logo.png' alt='logo'></img>
        </div>
        <div className=''>
            <div className='description_container text-[25px] relative bottom-[20px] left-5 text-black font-extrabold'>
            <div>General Appointments</div>
            <div className='relative left-[70px]'>Video Call</div>
            </div>
            <div className='personal_code_container text-center text-white text-[15px] font-bold'>
              
                <div className='text-[28px] font-extrabold'>{docProfile?docProfile.docName:"NOT FOUND"}</div>
                <div>{docProfile.speciality?docProfile.speciality.specialityName:""}</div>
                <div>{docProfile?docProfile.hospitalName:""}</div>
            </div>
            
            </div>
            <div>
               
                <div></div>
            </div>
            <div className='personal_code_connecting_container'>
                
            
                <div className='personal_code_connecting_buttons_container relative bottom-[80px]' >
                    <button className='connecting_button shadow-xl font-bold' id='personal_code_video_button' onClick={handleVideoCall}>
                        CALL PATIENT
                    </button>
                    <button className='connecting_button shadow-xl font-bold' id='personal_code_chat_button' onClick={handleNextCall}>
                        NEXT PATIENT
                    </button>
                </div>
                { show &&
                <div>
                <button onClick={()=>handleOpen()} className='bg-white p-3 mt-3 rounded-lg'>Add prescription</button>
                <Prescription
       open={modalVisible}  
       onCancel={handleModalCancel}
       onUpload={handleUploadPrescription}
      />
                </div>
                }
                </div>
            <div className='stranger_connecting_container'>
                
            </div>
            <div className='checkbox_container'>
               
            </div>
            <div className='dashboard_blur display_none' id='dashboard_blur'></div>
        </div>
        <div className='call_container'>
            <div className='videos_container'>
                <div id='video_placeholder' className='videos_placeholder'>
                    <img src='logo.png' alt='logo'></img>
                </div>
                <video className='remote_video display_none' muted autoPlay id='remote_video'></video>
                <div className='local_video_container'>
                    <video className='local_video' id='local_video' muted autoPlay></video>
                </div>
                <div className='call_buttons_container display_none' id='call_buttons'>
                    <button className='call_button_small' id='mic_button' onClick={handleMicButtonClick}>
                        <img src='mic.png' id='mic_button_image' alt='mic-button'></img>
                    </button>
                    <button className='call_button_small' id='camera_button' onClick={handleCameraButtonClick}>
                        <img src='camera.png' id='camera_button_image' alt='camera-button'></img>
                    </button>
                    <button className='call_button_large' id='hang_up_button' onClick={handleHangUpButtonClick}>
                        <img src='hangUp.png' alt='hang-up-button'></img>
                    </button>
                    <button className='call_button_small' id='screen_sharing_button' onClick={handleScreenSharingButtonClick}>
                        <img src='switchCameraScreenSharing.png' alt='screen-sharing'></img>
                    </button>
                    <button className='call_button_small' id='start_recording_button' onClick={handleStartRecordingButtonClick}>
                        <img src='recordingStart.png' alt='recording-start'></img>
                    </button>
                </div>
                <div className='finish_chat_button_container display_none' id='finish_chat_button_container'>
                    <button className='call_button_large' id='finish_chat_call_button' onClick={handleHangUpChatButtonClick}>
                        <img src='hangUp.png' alt='end chat call button'></img>
                    </button>
                </div>
                <div className='video_recording_buttons_container display_none' id='video_recording_buttons'>
                    <button id='pause_recording_button' onClick={handlePauseRecordingButtonClick}>
                        <img src='pause.png' alt='pause recording button'></img>
                    </button>
                    <button id='resume_recording_button' className='display_none' onClick={handleResumeRecordingButtonClick}>
                        <img src='resume.png' alt='resume recording button'></img>
                    </button>
                    <button id='stop_recording_button' onClick={handleStopRecordingButtonClick}>
                        Stop recording
                    </button>
                </div>
            </div>
        </div>
        <div className='messenger_container'>
        <div className='messages_container' id='messages_container'></div>
        <div className='new_message_container display_none' id='new_message'>
            <input className='new_message_input' id='new_message_input' type='text' placeholder="Type your message..." 
            value={newMessage}
            onChange={handleNewMessageInputChange}
            onKeyDown={handleNewMessageInputKeyDown}></input>
            <button className='send_message_button' id='send_message_button' onClick={handleSendMessageButtonClick}>
                <img className='send_message_button_image' src='sendMessageButton.png' alt='send message button'></img>
            </button>
        </div>
    </div>
    <div id='dialog'></div>    
    
    </div>
  
    </div>
    </>
  )
}

export default QueueVideoCallDoc