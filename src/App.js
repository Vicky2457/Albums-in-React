// src/App.js
import React, { useState, useEffect } from 'react';
import Album from './Album/Album'; // Updated import path
import Notification from './Notification/Notification'; // Updated import path
import './App.css';

// Main App Component
const App = () => {
  // State for managing albums
  const [albums, setAlbums] = useState([]);
  // State for the input value for adding a new album
  const [newAlbumName, setNewAlbumName] = useState('');
  // State for managing the display of notifications
  const [showNotification, setShowNotification] = useState(false);
  // State for the notification message
  const [notificationMessage, setNotificationMessage] = useState('');

  // Fetch albums from the API on component mount
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/albums')
      .then((response) => response.json())
      .then((data) => setAlbums(data));
  }, []);

  // Handler for adding a new album
  const handleAddAlbum = () => {
    // Check if the album name is not empty
    if (newAlbumName.trim() !== '') {
      // Create a new album object
      const newAlbum = { id: albums.length + 1, title: newAlbumName };
      // Update the albums state
      setAlbums([...albums, newAlbum]);
      // Clear the input field
      setNewAlbumName('');
      // Display a success notification
      showNotificationMessage('Album added successfully.');
    }
  };

  // Handler for updating an album
  const handleUpdateAlbum = (id, newTitle) => {
    // Update the albums state
    setAlbums((prevAlbums) =>
      prevAlbums.map((album) =>
        album.id === id ? { ...album, title: newTitle } : album
      )
    );
  };

  // Handler for deleting an album
  const handleDeleteAlbum = (id) => {
    // Remove the album from the albums state
    setAlbums((prevAlbums) => prevAlbums.filter((album) => album.id !== id));
    // Display a success notification
    showNotificationMessage('Album deleted successfully.');
  };

  // Function to display notifications and hide them after 3 seconds
  const showNotificationMessage = (message) => {
    // Set the notification message
    setNotificationMessage(message);
    // Display the notification
    setShowNotification(true);
    // Hide the notification after 3 seconds
    setTimeout(() => {
      setShowNotification(false);
      setNotificationMessage('');
    }, 3000);
  };

  // Render the JSX structure
  return (
    <div>
      {/* Header */}
      <h1>Album Manager</h1>

      {/* Add Album Form */}
      <div className="add-album-container">
        <input
          type="text"
          placeholder="Enter album name"
          value={newAlbumName}
          onChange={(e) => setNewAlbumName(e.target.value)}
        />
        <button onClick={handleAddAlbum}>Add Album</button>
      </div>

      {/* Album Grid */}
      <div className="album-grid">
        {albums.map((album) => (
          <Album
            key={album.id}
            album={album}
            onDelete={handleDeleteAlbum}
            onUpdate={handleUpdateAlbum}
          />
        ))}
      </div>

      {/* Notification */}
      {showNotification && (
        <Notification
          message={notificationMessage}
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};

export default App;
