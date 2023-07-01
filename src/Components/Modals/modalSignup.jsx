import React, { useState } from 'react';
import { Button, Modal, TextInput, Text } from '@mantine/core';

export function ModalSignup({ opened, onClose }) {
  // Initialize signupData state with empty field values
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  // Initialize passwordsMatch state as true
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  // Handle input field changes and update signupData state
  const handleSignupDataChange = (event) => {
    const { name, value } = event.target;
    setSignupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle signup form submission
  const handleSignupSubmit = () => {
    if (signupData.password !== signupData.confirmPassword) {
      // Passwords don't match, set error state to false
      setPasswordsMatch(false);
    } else {
      // Passwords match, perform signup logic here
      console.log('Signup Data:', signupData);

      // Close the modal after submitting
      onClose();
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Sign Up" centered>
      <div>
        {/* Name input field */}
        <TextInput
          label="Name"
          name="name"
          value={signupData.name}
          onChange={handleSignupDataChange}
          placeholder="Enter your name"
          required // Mark the field as required
        />
        {/* Email input field */}
        <TextInput
          label="Email"
          name="email"
          value={signupData.email}
          onChange={handleSignupDataChange}
          placeholder="Enter your email"
          required // Mark the field as required
        />
        {/* Username input field */}
        <TextInput
          label="Username"
          name="username"
          value={signupData.username}
          onChange={handleSignupDataChange}
          placeholder="Enter your username"
          required // Mark the field as required
        />
        {/* Password input field */}
        <TextInput
          label="Password"
          name="password"
          value={signupData.password}
          onChange={handleSignupDataChange}
          placeholder="Enter your password"
          type="password"
          required // Mark the field as required
        />
        {/* Confirm Password input field */}
        <TextInput
          label="Confirm Password"
          name="confirmPassword"
          value={signupData.confirmPassword}
          onChange={handleSignupDataChange}
          placeholder="Confirm your password"
          type="password"
          required // Mark the field as required
        />
        {!passwordsMatch && (
          // Display error message if passwords don't match
          <Text color="red" size="sm" style={{ marginBottom: '1rem' }}>
            Passwords do not match.
          </Text>
        )}
        {/* Submit button */}
        <Button onClick={handleSignupSubmit}>Sign Up</Button>
      </div>
    </Modal>
  );
}
