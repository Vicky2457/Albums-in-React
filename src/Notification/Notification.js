import React, { useEffect } from 'react';
import './Notification.css';

// Notification component definition
const Notification = ({ message, onClose }) => {
  // useEffect hook for handling side effects
  useEffect(() => {
    // This hook runs after the component has rendered
    // You can use it for side effects such as setting up subscriptions or timers
    // Don't forget to clean up any subscriptions or timers to avoid memory leaks

    // Example: Setting up a timer to close the notification after 3 seconds
    const timerId = setTimeout(() => {
      onClose();
    }, 3000);

    // Clean up the timer when the component unmounts or when the effect is re-run
    return () => {
      clearTimeout(timerId);
    };
  }, [onClose, message]); // Dependencies array ensures the effect runs when these values change

  // JSX structure for the Notification component
  return (
    <div className="notification">
      <p>{message}</p>
    </div>
  );
};

// Export the Notification component
export default Notification;
