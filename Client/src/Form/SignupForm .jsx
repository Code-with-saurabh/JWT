// SignupForm.js
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, useField } from 'formik';
import * as Yup from 'yup';
import {
  Button,
  Container,
  Row,
  Col,
  Form as BootstrapForm,
  Alert,
  InputGroup,
} from 'react-bootstrap';
import { EyeFill, EyeSlashFill } from 'react-bootstrap-icons';

// Validation schema
const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(50, 'Too Long!')
    .required('First Name is required'),
  lastName: Yup.string()
    .max(50, 'Too Long!')
    .required('Last Name is required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string()
    .min(6, 'Password too short - should be 6 chars min.')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm your password'),
});

// Reusable input component with Formik + Bootstrap styling
const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const isInvalid = meta.touched && meta.error;

  return (
    <BootstrapForm.Group className="mb-3" controlId={props.id || props.name}>
      <BootstrapForm.Label>{label}</BootstrapForm.Label>
      <BootstrapForm.Control
        {...field}
        {...props}
        isInvalid={!!isInvalid}
        aria-describedby={`${props.name}-error`}
      />
      <BootstrapForm.Control.Feedback type="invalid" id={`${props.name}-error`}>
        {meta.error}
      </BootstrapForm.Control.Feedback>
    </BootstrapForm.Group>
  );
};

const PasswordInput = ({ label, name }) => {
  const [field, meta] = useField(name);
  const [showPassword, setShowPassword] = useState(false);
  const isInvalid = meta.touched && meta.error;

  return (
    <BootstrapForm.Group className="mb-3" controlId={name}>
      <BootstrapForm.Label>{label}</BootstrapForm.Label>
      <InputGroup>
        <BootstrapForm.Control
          {...field}
          type={showPassword ? 'text' : 'password'}
          isInvalid={!!isInvalid}
          aria-describedby={`${name}-error`}
        />
        <Button
          variant="outline-secondary"
          onClick={() => setShowPassword((prev) => !prev)}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          tabIndex={-1}
        >
          {showPassword ? <EyeSlashFill /> : <EyeFill />}
        </Button>
        <BootstrapForm.Control.Feedback type="invalid" id={`${name}-error`}>
          {meta.error}
        </BootstrapForm.Control.Feedback>
      </InputGroup>
    </BootstrapForm.Group>
  );
};

const SignupForm = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Simulate API call
    setTimeout(() => {
      setShowSuccess(true);
      resetForm();
      setSubmitting(false);
    }, 1000);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h3 className="mb-4 text-center">User  Signup</h3>

          {showSuccess && (
            <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
              User registered successfully!
            </Alert>
          )}

          <Formik
            initialValues={{
              firstName: '',
              lastName: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form noValidate>
                <TextInput
                  label="First Name"
                  name="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  autoComplete="given-name"
                />

                <TextInput
                  label="Last Name"
                  name="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  autoComplete="family-name"
                />

                <TextInput
                  label="Email address"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                />

                <PasswordInput label="Password" name="password" />

                <PasswordInput label="Confirm Password" name="confirmPassword" />

                <div className="d-grid">
                  <Button type="submit" variant="primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Sign Up'}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupForm;
