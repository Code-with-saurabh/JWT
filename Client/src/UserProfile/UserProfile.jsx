import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

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
        const response = await axios.get("http://localhost:3000/api/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setUserData(response.data.data);
        setShowInfo(true);
      } catch (error) {
        console.error("Error fetching user:", error);
        setError("Failed to load user data.");
        setShowInfo(false);
      } finally {
        setLoading(false);
      }
    } else {
      setShowInfo((prev) => !prev);
    }
  };

  return (
    <>
      {/* Navbar */}
      <Navbar bg="light" expand="lg" fixed="top" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold fs-3 text-primary">
            E-Shop
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto align-items-center gap-3">
              {!localStorage.getItem("token") ? (
                <>
                  <Link to="/signin" className="btn btn-outline-primary">
                    Sign In
                  </Link>
                  <Link to="/signup" className="btn btn-primary">
                    Sign Up
                  </Link>
                </>
              ) : (
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/signin";
                  }}
                >
                  Logout
                </button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* User Profile Section */}
      <div className="container my-5 pt-5" style={{ maxWidth: "400px" }}>
        <button
          className={`btn ${showInfo ? "btn-danger" : "btn-primary"} w-100 mb-3`}
          onClick={toggleUserInfo}
          disabled={loading}
        >
          {showInfo ? "Hide Profile Info" : "Show Profile Info"}
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
                  : "N/A"}
              </h5>
              <p className="card-text mb-1">
                <strong>Email:</strong> {userData.email || "N/A"}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserProfile;
