import React, { useState, useEffect } from "react";

const AlertBar = ({ message, type }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsVisible(false);
    }, 3000); // Adjust duration as needed

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div
      className={`alert-bar ${type}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease-out",
      }}
    >
      {message}
    </div>
  );
};

// Add the CSS styles directly within the component
const styles = `
  .alert-bar {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px 20px;
    border-radius: 5px;
    color: white;
    font-size: 14px;
    text-align: center;
  }

  .alert-bar.success {
    background-color: rgba(0, 255, 0, 0.1);
  }

  .alert-bar.error {
    background-color: rgba(255, 0, 0, 0.1);
  }
`;

// Create a style element and append it to the head
const styleElement = document.createElement("style");
styleElement.textContent = styles;
document.head.appendChild(styleElement);

export default AlertBar;
