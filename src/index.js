import React from 'react';
import { createRoot } from 'react-dom';
import { MantineProvider } from '@mantine/core';

import App from './App';
import SettingsProvider from './Context/Settings';
import AuthProvider from './Context/Auth';

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <AuthProvider>
        <SettingsProvider>
          <App />
        </SettingsProvider>
      </AuthProvider>
    </MantineProvider>
  </React.StrictMode >
);
