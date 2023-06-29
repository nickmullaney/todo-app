import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import SettingsProvider from './Components/Context/Settings';
import { MantineProvider } from '@mantine/core';

ReactDOM.render(
  <React.StrictMode>
    <MantineProvider>
      <SettingsProvider>
        <App />
      </SettingsProvider>
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
