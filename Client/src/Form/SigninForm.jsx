import React, { useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios'
import * as Yup from 'yup';
import './SigninForm.css';

// Yup validation schema
const SigninSchema = Yup.object().shape({
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
});

const SigninForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SigninSchema,
    onSubmit: async (values, { resetForm }) => {
  try {
    const response = await axios.post("http://localhost:3000/api/signin", values);

    if (response.status === 200) {
      setShowSuccess(true);
    } else {
      setShowSuccess(false);
    }

    console.log(response.data); // actual server response
    resetForm();
  } catch (error) {
    console.error('Signin error:', error);
    setShowSuccess(false);
  }
},
  });

  return (
    <div className="form-container">
      <h3>User Sign In</h3>

      {showSuccess && (
        <div className="success-message">
          Signed in successfully!
          <button className="close-btn" onClick={() => setShowSuccess(false)}>×</button>
        </div>
      )}

      <form onSubmit={formik.handleSubmit} noValidate>
        {/* Email */}
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

        {/* Password */}
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
              autoComplete="current-password"
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

        {/* Submit button */}
        <button type="submit" className="submit-btn" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
};

export default SigninForm;
