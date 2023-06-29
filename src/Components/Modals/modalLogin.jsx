import { Button, Modal, TextInput } from '@mantine/core';
import React, { useState } from 'react';


export function ModalLogin({ opened, onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = () => {
    // Perform login logic here
    console.log('Username:', username);
    console.log('Password:', password);

    // Close the modal after submitting
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Login" centered>
      <div>
        <TextInput
          label="Username"
          value={username}
          onChange={handleUsernameChange}
          placeholder="Enter your username"
        />
        <TextInput
          label="Password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Enter your password"
          type="password"
        />
        <Button onClick={handleLoginSubmit}>Submit</Button>
      </div>
    </Modal>
  );
}
