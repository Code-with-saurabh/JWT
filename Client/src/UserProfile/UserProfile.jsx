import React, { useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

 const toggleUserInfo = async () => {
  if (!showInfo && !userData) {
    
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://localhost:3000/api/user',{
        headers:{
            'Authorization' : `Bearer ${localStorage.getItem("token")}`
        }
      });
      console.log(response)
      setUserData(response.data.data);
      setShowInfo(true);
    } catch (error) {
      setError('Failed to load user data.');
      setShowInfo(false);
    } finally {
      setLoading(false);
    }
  } else {
     
    setShowInfo((prev) => !prev);
  }
};


  return (
    <div className="user-profile-container">
      <button className="toggle-btn" onClick={toggleUserInfo}>
        {showInfo ? 'Hide Profile Info' : 'Show Profile Info'}
      </button>

      {loading && <p className="loading-text">Loading user data...</p>}

      {error && <p className="error-text">{error}</p>}

      {showInfo && userData && (
        <div className="user-info-card">
          <h3 className="user-name">{userData.firstName +" "+userData.lastName || 'N/A'}</h3>
          <p className="user-email">
            <strong>Email:</strong> {userData.email || 'N/A'}
          </p>
 
        </div>
      )}
    </div>
  );
};

export default UserProfile;
