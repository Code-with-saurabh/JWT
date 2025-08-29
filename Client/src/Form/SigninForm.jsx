// SigninForm.js
import React, { useState } from 'react';
import { Formik, Form, useField } from 'formik';
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
const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});

// Reusable text input component
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

// Password input with visibility toggle
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

const SigninForm = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // Simulate login request
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
          <h3 className="mb-4 text-center">User  Sign In</h3>

          {showSuccess && (
            <Alert variant="success" onClose={() => setShowSuccess(false)} dismissible>
              Signed in successfully!
            </Alert>
          )}

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={SigninSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form noValidate>
                <TextInput
                  label="Email address"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  autoComplete="email"
                />

                <PasswordInput label="Password" name="password" />

                <div className="d-grid">
                  <Button type="submit" variant="primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Signing in...' : 'Sign In'}
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

export default SigninForm;
