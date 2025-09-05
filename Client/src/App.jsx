import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';

import SigninForm from './Form/SigninForm';
import SignupForm from './Form/SignupForm';
import EcommerceHomePage from './Home/EcommerceHomePage';

import UserProfile from './UserProfile/UserProfile';
import Logout from './Form/Logout';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/signin" element={<SigninForm />} />
        <Route path="/signup" element={<SignupForm />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <EcommerceHomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/logout"
          element={
            <PrivateRoute>
              <Logout />
            </PrivateRoute>
          }
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
