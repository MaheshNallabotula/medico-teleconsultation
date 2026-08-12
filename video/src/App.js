import React from 'react'

import * as elements from "./js/elements.js";
import * as constants from './js/constants.js';
import * as ui from './js/ui.js';
import * as wss from './js/wss.js';
import * as store from './js/store.js';
import * as webRTCHandler from './js/webRTCHandler.js';
import * as main from './js/main.js';
import * as recordingUtils from './js/recordingUtils.js';
import './css/style.css';

function App() {
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
                <div className='personal_code_title_container'>
                    <p className='personal_code_title_paragraph'>
                        Your personal code
                    </p>
                </div>
                <div className="personal_code_value_container">
                    <p className='personal_code_value_paragraph' id='personal_code_paragraph'>DDDDDD</p>
                    <button className='personal_code_copy_button' id='personal_code_copy_button'>
                        <img src='copyButton.png' alt='copy-button'></img>
                    </button>
                </div>
            </div>
            </div>
            <div className='personal_code_connecting_container'>
                <p className='personal_code_connecting_paragraph'>Personal Code</p>
                <div className='personal_code_connecting_input_container'>
                    <input className='personal_code_input' id='personal_code_input'></input>
                </div>
                <div className='personal_code_connecting_buttons_container'>
                    <button className='connecting_button' id='personal_code_chat_button'>
                        <img src='chatButton.png' className='connecting_buttons_image' alt='chat-button'></img>
                    </button>
                    <button className='connecting_button display_none' id='personal_code_video_button'>
                        <img src='videoButton.png' className='connecting_buttons_image' alt='video-button'></img>
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
                    <button className='call_button_small' id='mic_button'>
                        <img src='mic.png' id='mic_button_image' alt='mic-button'></img>
                    </button>
                    <button className='call_button_small' id='camera_button'>
                        <img src='camera.png' id='camera_button_image' alt='camera-button'></img>
                    </button>
                    <button className='call_button_large' id='hang_up_button'>
                        <img src='hangUp.png' alt='hang-up-button'></img>
                    </button>
                    <button className='call_button_small' id='screen_sharing_button'>
                        <img src='switchCameraScreenSharing.png' alt='screen-sharing'></img>
                    </button>
                    <button className='call_button_small' id='start_recording_button'>
                        <img src='recordingStart.png' alt='recording-start'></img>
                    </button>
                </div>
                <div className='finish_chat_button_container display_none' id='finish_chat_button_container'>
                    <button className='call_button_large' id='finish_chat_call_button'>
                        <img src='hangUp.png' alt='end chat call button'></img>
                    </button>
                </div>
                <div className='video_recording_buttons_container display_none' id='video_recording_buttons'>
                    <button id='pause_recording_button'>
                        <img src='pause.png' alt='pause recording button'></img>
                    </button>
                    <button id='resume_recording_button' className='display_none'>
                        <img src='resume.png' alt='resume recording button'></img>
                    </button>
                    <button id='stop_recording_button'>
                        Stop recording
                    </button>
                </div>
            </div>
        </div>
    <div className='messenger_container'>
        <div className='messages_container' id='messages_container'></div>
        <div className='new_message_container display_none' id='new_message'>
            <input className='new_message_input' id='new_message_input' type='text' placeholder="Type your message..."></input>
            <button className='send_message_button' id='send_message_button'>
                <img className='send_message_button_image' src='sendMessageButton.png' alt='send message button'></img>
            </button>
        </div>
    </div>
    <div id='dialog'></div>    
    </div>
  );
}

export default App;
