import { Button, Modal, TextInput } from '@mantine/core';
import React, { useContext, useState } from 'react';
import { AuthContext } from '../../Context/Auth';


export function ModalLogin({ opened, onClose }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // Perform login logic here
    login(username, password);
    console.log('Username:', username);
    console.log('Password:', password);
    setUsername('');
    setPassword('');
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
