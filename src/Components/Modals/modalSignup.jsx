import React, { useState } from 'react';
import { Button, Modal, TextInput } from '@mantine/core';


export function ModalSignup({ opened, onClose }) {
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleSignupDataChange = (event) => {
    const { name, value } = event.target;
    setSignupData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignupSubmit = () => {
    // Perform signup logic here
    console.log('Signup Data:', signupData);

    // Close the modal after submitting
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Sign Up" centered>
      <div>
        <TextInput
          label="Name"
          name="name"
          value={signupData.name}
          onChange={handleSignupDataChange}
          placeholder="Enter your name"
        />
        <TextInput
          label="Email"
          name="email"
          value={signupData.email}
          onChange={handleSignupDataChange}
          placeholder="Enter your email"
        />
        <TextInput
          label="Username"
          name="username"
          value={signupData.username}
          onChange={handleSignupDataChange}
          placeholder="Enter your username"
        />
        <TextInput
          label="Password"
          name="password"
          value={signupData.password}
          onChange={handleSignupDataChange}
          placeholder="Enter your password"
          type="password"
        />
        <TextInput
          label="Confirm Password"
          name="confirmPassword"
          value={signupData.confirmPassword}
          onChange={handleSignupDataChange}
          placeholder="Confirm your password"
          type="password"
        />
        <Button onClick={handleSignupSubmit}>Sign Up</Button>
      </div>
    </Modal>
  );
}
