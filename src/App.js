// src/App.js
import React, { useState, useEffect } from "react";

const App = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [countdown, setCountdown] = useState(10); // Default countdown time
  const [isCounting, setIsCounting] = useState(false);

  // Update the current time every second
  useEffect(() => {
    let timeInterval;
    if (currentTime) {
      timeInterval = setInterval(() => {
        const now = new Date();
        setCurrentTime(now.toLocaleTimeString());
      }, 1000);
    }
    return () => clearInterval(timeInterval); // Cleanup on unmount
  }, [currentTime]);

  // Fetch Current Time
  const fetchCurrentTime = () => {
    const now = new Date();
    setCurrentTime(now.toLocaleTimeString());
  };

  // Start Countdown
  const startCountdown = () => {
    if (isCounting || countdown <= 0) return; // Prevent multiple countdowns
    setIsCounting(true);

    let timeLeft = countdown;
    const timer = setInterval(() => {
      timeLeft -= 1;
      setCountdown(timeLeft);

      if (timeLeft <= 0) {
        clearInterval(timer);
        setIsCounting(false);
      }
    }, 1000);
  };

  // Handle user input for countdown
  const handleInputChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setCountdown(value > 0 ? value : 0); // Ensure no negative values
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>React Real-Time Clock and Countdown App</h1>

      {/* Current Time Section */}
      <div style={{ margin: "20px" }}>
        <button onClick={fetchCurrentTime} style={buttonStyle}>
          Fetch Current Time
        </button>
        {currentTime && <p>Current Time (Real-Time): {currentTime}</p>}
      </div>

      {/* Countdown Timer Section */}
      <div style={{ margin: "20px" }}>
        <input
          type="number"
          min="1"
          placeholder="Enter Countdown Seconds"
          value={countdown}
          onChange={handleInputChange}
          style={inputStyle}
        />
        <button onClick={startCountdown} style={buttonStyle}>
          Start Countdown
        </button>
        <p>Countdown: {countdown}</p>
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: "10px 20px",
  margin: "10px",
  fontSize: "16px",
  cursor: "pointer",
};

const inputStyle = {
  padding: "10px",
  fontSize: "16px",
  marginRight: "10px",
  width: "200px",
};

export default App;
