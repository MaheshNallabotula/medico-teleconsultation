import { useState, useEffect } from 'react'
// import * as elements from "../../js/elements"
import * as constants from "../../js/constants"
import * as ui from "../../js/ui"
import * as wss from "../../js/wss"
import * as store from "../../js/store"
import * as webRTCHandler from "../../js/webRTCHandler"
// import * as main from "../../js/main"
import * as recordingUtils from "../../js/recordingUtils"
import "../../css/style.css"
// import { useEffect } from 'react'
import axios from "axios";
import io from "socket.io-client";


const ENDPOINT = import.meta.env.REACT_APP_SIGNAL_URL;

// const socket = io.connect(ENDPOINT);

// wss.registerSocketEvents(socket);
// webRTCHandler.getLocalPreview();


function VideoCallPatient() {
    const details = JSON.parse(localStorage.getItem("detailToDisplayOnVideoCall"))
   
    useEffect(() => {
        const socket = io.connect(ENDPOINT);
        wss.registerSocketEvents(socket);
        webRTCHandler.getLocalPreview();

        return () => {
            // Cleanup function to disconnect socket when component unmounts
            socket.disconnect();
        };
    }, []);

    ///new way of code
    const [newMessage, setNewMessage] = useState('');

   
    const handleChatButtonClick = () => {
        console.log("chat button clicked");
        //axios call to fetch socket id 
        let fetchedSocketId = "";
        let x = localStorage.getItem("consulId");
        let response = axios.get(`${import.meta.env.REACT_APP_BACKEND_URL}/api/patient/getSocketOfDoctor/${x}`);
        response.then(response => {
        if (response && response.data) {
            fetchedSocketId = response.data.socketId;
            console.log("Fetched socket ID:", fetchedSocketId); // This will log the fetched socket ID correctly
            const calleePersonalCode = fetchedSocketId;
            const callType = constants.callType.CHAT_PERSONAL_CODE;
            console.log("test socket", calleePersonalCode);
            webRTCHandler.sendPreOffer(callType, calleePersonalCode);
        } else {
            console.log("Response or data is missing.");
        }
        }).catch(error => {
        console.error("Error fetching socket ID:", error);
        });
    };

    const handleVideoButtonClick = () => {
        console.log("video button clicked");
        var fetchedSocketId=""
        let x = localStorage.getItem("consulId")
        let response = axios.get(`${import.meta.env.REACT_APP_BACKEND_URL}/api/patient/getSocketOfDoctor/${x}`)
        response.then(response => {
        
            if (response && response.data) {
            fetchedSocketId = response.data.socketId;
            console.log(fetchedSocketId);
            const calleePersonalCode = fetchedSocketId
            const callType = constants.callType.VIDEO_PERSONAL_CODE;
            
            webRTCHandler.sendPreOffer(callType, calleePersonalCode);
            } else {
            console.log("Response or data is missing.");
            }
        })
    };
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
    <div className='main_container'>
    <div className='dashboard_container'>
        <div className='logo_container'>
            <img src='logo.png' alt='logo'></img>
        </div>
        <div>
            <div className='description_container'>
               <div className='text-[20px] mt-[40px] text-white'>You are connecting with...</div>
            </div>
            <div className='personal_code_container h-[200px] shadow-md'>
               <div className=' text-center text-[20px] text-whitesmoke-300 font-light'>
                <img className='w-[65px] h-[65px] rounded-full' src="/doctor.jpeg" alt="" />
                <div className=''>Dr. {details.doctor.docName}</div>
                <div className=''>{details.doctor.speciality.specialityName}</div>
                <div className=''>{details.doctor.hospital.hospitalName}</div>
                </div>
            </div>
            </div>
                
            <div className='personal_code_connecting_container'>
            
            <div className='personal_code_connecting_buttons_container'>
                <button className='connecting_button' id='personal_code_chat_button' onClick={handleChatButtonClick}>
                    <img src='chatButton.png' className='connecting_buttons_image' alt='chat-button' />
                </button>
                <button className='connecting_button display_none' id='personal_code_video_button' onClick={handleVideoButtonClick}>
                    <img src='videoButton.png' className='connecting_buttons_image' alt='video-button' />
                </button>
            </div>
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


  );
}

export default VideoCallPatient;