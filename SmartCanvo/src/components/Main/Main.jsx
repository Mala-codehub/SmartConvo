import React, { useContext, useState } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const [listening, setListening] = useState(false);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    return <p>Your browser does not support speech recognition.</p>;
  }

  const recognition = new SpeechRecognition();

  recognition.onstart = () => {
    setListening(true);
  };

  recognition.onend = () => {
    setListening(false);
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    setInput(transcript);
    // Optionally trigger the onSent function to automatically send the recognized input
    // onSent();
  };

  const startListening = () => {
    recognition.start();
  };

  return (
    <div className='main'>
      <div className="nav">
        <p>SmartConvo</p>
        <img src={assets.user_icon} alt="User" />
      </div>
      <div className="main-container">
        {showResult ? (
          <div className="result">
            <div className='result-title'>
              <img src={assets.user_icon} alt="User" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini" />
              {loading ? (
                <div className="loader">
                  <hr className="animated-bg" />
                  <hr className="animated-bg" />
                  <hr className="animated-bg" />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="greet">
              <p>Hello, Mala.</p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Create a cartoon illustration of my pet</p>
                <img src={assets.compass_icon} alt="Compass" />
              </div>
              <div className="card">
                <p>Morning routine for productivity</p>
                <img src={assets.bulb_icon} alt="Bulb" />
              </div>
              <div className="card">
                <p>Write a story in my favorite genre</p>
                <img src={assets.message_icon} alt="Message" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="Code" />
              </div>
            </div>
          </>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder='Enter a prompt here'
            />
            <div>
              <img src={assets.gallery_icon} width={30} alt="Gallery" />
              <img
                src={assets.mic_icon}
                width={30}
                alt="Mic"
                onClick={startListening}
                style={{ cursor: 'pointer', opacity: listening ? 0.5 : 1 }}
              />
              {input ? (
                <img
                  onClick={() => onSent()}
                  src={assets.send_icon}
                  width={30}
                  alt="Send"
                />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            AI may display inaccurate info, including about people, so double-check its responses.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
