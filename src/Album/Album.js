
import React, { useState } from 'react';
import './Album.css';
import Notification from '../Notification/Notification'; // Updated import path

// Album component definition
const Album = ({ album, onDelete, onUpdate }) => {
  // State variables
  const [isUpdating, setIsUpdating] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState(album.title);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  // Handle delete action
  const handleDelete = () => {
    onDelete(album.id);
    setNotificationMessage('Album deleted successfully.');
    setShowNotification(true);
    setIsUpdating(false); // Reset isUpdating after successful delete
    resetNotification();
  };

  // Handle update action
  const handleUpdate = () => {
    setIsUpdating(true);
  };

  // Handle update confirmation
  const handleUpdateConfirm = () => {
    onUpdate(album.id, newAlbumName);
    setNotificationMessage('Album updated successfully.');
    setShowNotification(true);
    setIsUpdating(false); // Reset isUpdating after successful update
    resetNotification();
  };

  // Handle update cancellation
  const handleUpdateCancel = () => {
    setIsUpdating(false);
    setNewAlbumName(album.title);
    setNotificationMessage('Update canceled.');
    setShowNotification(true);
    resetNotification();
  };

  // Handle input change for album name
  const handleNameChange = (e) => {
    setNewAlbumName(e.target.value);
  };

  // Reset notification after a certain time
  const resetNotification = () => {
    setTimeout(() => {
      setShowNotification(false);
      setNotificationMessage('');
    }, 3000); // Close notification after 3 seconds
  };

  // JSX structure for the Album component
  return (
    <div className="album-card">
      {isUpdating && (
        <div className="update-popup-overlay">
          <div className="update-popup">
            <input
              type="text"
              value={newAlbumName}
              onChange={handleNameChange}
            />
            <button onClick={handleUpdateConfirm}>Update</button>
            <button onClick={handleUpdateCancel}>Cancel</button>
          </div>
        </div>
      )}

      {showNotification && (
        <Notification
          message={notificationMessage}
          onClose={() => setShowNotification(false)}
        />
      )}

      <>
        <h3>{album.title}</h3>
        <div className="album-actions">
          <button onClick={handleUpdate}>Update</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
      </>
    </div>
  );
};

// Export the Album component
export default Album;
