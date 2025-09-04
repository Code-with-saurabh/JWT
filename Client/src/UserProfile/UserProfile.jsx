import React, { useState } from 'react';
import axios from 'axios';

const UserProfile = () => {
  const [showInfo, setShowInfo] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null); // Fixed: Removed space in variable name

  const toggleUserInfo = async () => { // Fixed: Removed space in function name
    if (!showInfo && !userData) {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get('http://localhost:3000/api/user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        console.log(response);
        setUserData(response.data.data); // Fixed: Removed space
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
    <div className="container my-4" style={{ maxWidth: '400px' }}>
      <button
        className={`btn ${showInfo ? 'btn-danger' : 'btn-primary'} w-100 mb-3`}
        onClick={toggleUserInfo} // Fixed: Removed space
        disabled={loading}
      >
        {showInfo ? 'Hide Profile Info' : 'Show Profile Info'}
      </button>

      {loading && (
        <div className="alert alert-info text-center" role="alert">
          Loading user data...
        </div>
      )}

      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}

      {showInfo && userData && (
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title text-primary">
              {userData.firstName && userData.lastName
                ? `${userData.firstName} ${userData.lastName}`
                : 'N/A'}
            </h5>
            <p className="card-text mb-1">
              <strong>Email:</strong> {userData.email || 'N/A'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
