import React, { useState, useEffect, useRef } from "react";
import { FaUserMd } from 'react-icons/fa';
import { IoMdPerson } from "react-icons/io";
import { MdRecordVoiceOver, MdVoiceOverOff, MdLocalHospital, MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md"; // Import MdLocalHospital and MdKeyboardArrowDown, MdKeyboardArrowUp icons
import "./chat.css";

function chat() {
  const [messages, setMessages] = useState([]);
  const [initialMessageSent, setInitialMessageSent] = useState(false);
  const [listening, setListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [collapsed, setCollapsed] = useState(true);
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const recognitionInstance = new window.webkitSpeechRecognition();
    setRecognition(recognitionInstance);

    return () => {
      if (recognitionInstance) {
        recognitionInstance.stop();
      }
    };
  }, []);

  useEffect(() => {
    if (!initialMessageSent) {
      setMessages([
        { text: "What symptoms are you experiencing?", sender: "bot" },
        { text: "1. Fever", sender: "bot" },
        { text: "2. Cough", sender: "bot" },
        { text: "3. Sore throat", sender: "bot" },
        { text: "4. Fatigue", sender: "bot" },
        { text: "5. Body aches", sender: "bot" },
        { text: "6. Headache", sender: "bot" }
      ]);
      setInitialMessageSent(true);
    }
  }, [initialMessageSent]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleBotResponse = (userMessage) => {
    const symptoms = {
      fever: "Rest, drink plenty of fluids, and take over-the-counter fever reducers like acetaminophen or ibuprofen.",
      cough: "Stay hydrated by drinking warm fluids. Use cough drops or lozenges to soothe throat irritation. Avoid exposure to smoke and other respiratory irritants.",
      "sore throat": "Gargle with warm salt water. Stay hydrated by drinking warm liquids. Avoid irritants like tobacco smoke.",
      fatigue: "Get plenty of rest and sleep. Maintain a balanced diet. Avoid excessive caffeine intake, especially before bedtime.",
      "body aches": "Take over-the-counter pain relievers like acetaminophen or ibuprofen. Apply heat packs or take warm baths to soothe muscles.",
      headache: "Stay hydrated by drinking warm fluids. Use cough drops or lozenges to soothe throat irritation. Avoid exposure to smoke and other respiratory irritants."
    };

    const response = symptoms[userMessage.toLowerCase()] || "You can consult with our doctors by calling our toll-free number 9131487737.";
    return response;
  };

  const handleUserMessage = (message) => {
    setMessages((prevMessages) => [...prevMessages, { text: message, sender: "user" }]);
    setTimeout(() => {
      const botResponse = handleBotResponse(message);
      setTyping(true);
      setTimeout(() => {
        setTyping(false);
        setMessages((prevMessages) => [...prevMessages, { text: botResponse, sender: "bot" }]);
      }, 1000);
    }, 500);
  };

  const startListening = () => {
    if (recognition) {
      recognition.onstart = () => {
        setListening(true);
      };

      recognition.onresult = (event) => {
        const message = event.results[0][0].transcript;
        handleUserMessage(message);
      };

      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setListening(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleChatbot = () => {
    setCollapsed(!collapsed);
    if (!collapsed) {
      inputRef.current.focus();
    }
  };

  return (
    <div className="chatbot-container">
      {collapsed ? (
        <div className="chatbot-toggle" onClick={toggleChatbot}>
          <MdLocalHospital className="bot-icon" /> {/* Change the icon to MdLocalHospital */}
        </div>
      ) : (
        <div className="chatbot-wrapper">
          <div className="chatbot-header" onClick={toggleChatbot}>
            <MdLocalHospital className="bot-icon-expanded" /> {/* Change the icon to MdLocalHospital */}
            <span className="chatbot-title">Medico-Bot</span>
            <MdKeyboardArrowDown className="minimize-icon" onClick={toggleChatbot} /> {/* Minimize button */}
          </div>
          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`message ${message.sender === "user" ? "user-message" : "bot-message"}`}>
                <span className="message-content" dangerouslySetInnerHTML={{ __html: message.text }}></span>
                {message.sender === "user" ? <IoMdPerson className="user-icon" /> : typing ? <div className="typing-indicator"></div> : <FaUserMd className="bot-icon" />}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="chatbot-input">
            {listening ? (
              <MdRecordVoiceOver
                onClick={stopListening}
                className="voice-icon"
                aria-label="Stop Listening"
              />
            ) : (
              <MdVoiceOverOff
                onClick={startListening}
                className="voice-icon"
                aria-label="Start Listening"
              />
            )}
            <input
              type="text"
              placeholder="Type your message..."
              onKeyDown={(e) => {
                if (e.key === "Enter" && e.target.value.trim() !== "") {
                  handleUserMessage(e.target.value);
                  e.target.value = "";
                }
              }}
              className="input-field"
              ref={inputRef}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default chat;
