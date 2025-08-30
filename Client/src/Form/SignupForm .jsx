import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import './SignupForm.css';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(50, 'Too Long!')
    .required('First Name is required'),
  lastName: Yup.string()
    .max(50, 'Too Long!')
    .required('Last Name is required'),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Invalid email format'
    )
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/\d/, 'Password must contain at least one number')
    .matches(/[@$!%*?#&]/, 'Password must contain at least one special character (@$!%*?#&)'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm your password'),
});

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const response = await axios.post("http://localhost:3000/api/signup", values);

        if (response.status === 200) {
          setShowSuccess(true);
          setShowError(false);
          setErrorMessage(''); // Clear any error message
        } else {
          setShowSuccess(false);
          setShowError(true);
          setErrorMessage('An error occurred, please try again.');
        }

        console.log(response.data);
        resetForm();
      } catch (error) {
        console.error('Signup error:', error);
        
        // Checking if the error is related to the email already existing
        if (error.response && error.response.data.message === 'Email already exists') {
          setShowError(true);
          setErrorMessage('Email already exists, try another one.');
        } else {
          setShowError(true);
          setErrorMessage('An error occurred, please try again.');
        }
        setShowSuccess(false);
      }
    },
  });

  return (
    <div className="form-container">
      <h3>User Signup</h3>

      {showSuccess && (
        <div className="alert alert-success alert-dismissible fade show" role="alert">
          User registered successfully!
          <button type="button" className="btn-close" onClick={() => setShowSuccess(false)} aria-label="Close"></button>
        </div>
      )}

      {showError && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {errorMessage}
          <button type="button" className="btn-close" onClick={() => setShowError(false)} aria-label="Close"></button>
        </div>
      )}

      <form onSubmit={formik.handleSubmit} noValidate>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Enter your first name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
            className={formik.touched.firstName && formik.errors.firstName ? 'input-error' : ''}
            autoComplete="given-name"
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <div className="error">{formik.errors.firstName}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Enter your last name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
            className={formik.touched.lastName && formik.errors.lastName ? 'input-error' : ''}
            autoComplete="family-name"
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <div className="error">{formik.errors.lastName}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={formik.touched.email && formik.errors.email ? 'input-error' : ''}
            autoComplete="email"
          />
          {formik.touched.email && formik.errors.email && (
            <div className="error">{formik.errors.email}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={formik.touched.password && formik.errors.password ? 'input-error' : ''}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="toggle-btn"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {formik.touched.password && formik.errors.password && (
            <div className="error">{formik.errors.password}</div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <div className="password-wrapper">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className={formik.touched.confirmPassword && formik.errors.confirmPassword ? 'input-error' : ''}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(prev => !prev)}
              className="toggle-btn"
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {formik.touched.confirmPassword && formik.errors.confirmPassword && (
            <div className="error">{formik.errors.confirmPassword}</div>
          )}
        </div>

        <button type="submit" className="submit-btn" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Submitting...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
