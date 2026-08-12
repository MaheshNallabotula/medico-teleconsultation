import { useState, useEffect } from 'react'
// import * as elements from "../../js/elements"
// import * as constants from "../../js/constants"
import * as ui from "../../js/ui"
import * as wss from "../../js/wss"
import * as store from "../../js/store"
import * as webRTCHandler from "../../js/webRTCHandler"

import * as recordingUtils from "../../js/recordingUtils"
import "../../css/style.css"
import io from "socket.io-client";
import { Input,Button } from 'antd'
import { notification ,Modal,Spin} from "antd";
import axios from 'axios'


const ENDPOINT = import.meta.env.REACT_APP_SIGNAL_URL;

// const socket = io.connect(ENDPOINT);

// wss.registerSocketEvents(socket);
// webRTCHandler.getLocalPreview();


function VideoCallDoc() {


   

    ///new way of code
    // const [personalCode, setPersonalCode] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const [otp, setOtp] = useState('');
    const [placeholder,setPlaceholder]= useState(false)
    const [documentVisible,setDocumentVisible]=useState(false)
    const [documents, setDocuments] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [documentUrl, setDocumentUrl] = useState('');
    const handleOtpChange = (e) => {
        setOtp(e.target.value);
      };
      const handleSubmitOtp = () => {
        setPlaceholder(false)
      const id = localStorage.getItem("vcPatId")
      console.log("id of pat is",id);

        let payload={
            password:otp,
            patientId:12
        }
        let apiResponse = axios.post(import.meta.env.REACT_APP_BACKEND_URL +"/api/doctor/verifyOtp",payload)
        if(apiResponse){
            setDocumentVisible(true)
        notification.success({
            message: 'OTP Verified',
            description: `The otp you have entered has been verified successfully, Now you can check patient's document`,
            duration: 15
          });
        }
      }


      const fetchDocuments = async () => {
        setLoading(true);
        try {
          const response = await fetch(`${import.meta.env.REACT_APP_BACKEND_URL}/api/patient/files/12`);
          const data = await response.json();
          setDocuments(data);
        } catch (error) {
          console.error('Error fetching documents:', error);
        } finally {
          setLoading(false);
        }
      };
    
      // Function to handle View button click
      const handleViewDocument = async (fileName) => {
        try {
          const response = await fetch(`${import.meta.env.REACT_APP_BACKEND_URL}/api/patient/downloadOnePatientFile/${fileName}`);
          const blob = await response.blob();
          const blobUrl = URL.createObjectURL(blob);
          setDocumentUrl(blobUrl);
          setVisible(true);
        } catch (error) {
          console.error('Error fetching document:', error);
        }
      };
   
    useEffect(() => {
        const socket = io.connect(ENDPOINT);
        wss.registerSocketEvents(socket);
        webRTCHandler.getLocalPreview();

        return () => {
            // Cleanup function to disconnect socket when component unmounts
            socket.disconnect();
        };
    }, []);

    
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

// handle OTP
const handleOTP = () => {
    setPlaceholder(true)
    webRTCHandler.handleOTP();
};

  return (
    <div className='main_container'>
    <div className='dashboard_container'>
        <div className='logo_container'>
            <img src='logo.png' alt='logo'></img>
        </div>
        <div>
            <div className='description_container'>
                
            </div>
            <div className='personal_code_container'>
                <div>This is Lavish</div>
            </div>
            </div>
            <div className='personal_code_connecting_container'>
                
                
                <div className='personal_code_connecting_buttons_container' >
                <button className='connecting_button' id='personal_code_video_button' onClick={handleOTP}>
                       Request for OTP
                    </button>
                </div>
                { placeholder &&
                <div className='flex flex-row gap-4 mt-[30px]'>
                <Input className='w-[100px]' value={otp} onChange={handleOtpChange} placeholder="Enter OTP" /> 
                <Button type="primary" onClick={handleSubmitOtp}>Submit</Button>
                </div>
}
{ documentVisible &&
             <Button onClick={() => { setVisible(true); fetchDocuments(); }} type="primary">View Documents</Button>
}

<Modal
        title="Document List"
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        {loading ? (
          <Spin size="large" />
        ) : (
          <ul>
            {documents && documents.length > 0 ? (
              documents.map((document) => (
                <li key={document.id}>
                  {document.placeholder}
                  <Button onClick={() => handleViewDocument(document.fileName)}>View</Button>
                </li>
              ))
            ) : (
              <p>No documents available</p>
            )}
          </ul>
        )}
      </Modal>

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
  )
}

export default VideoCallDoc