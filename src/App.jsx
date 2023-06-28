import React from 'react';
import { SettingsProvider } from './Components/Context/Settings/index';
import Header from './Components/Header/index';
import List from './Components/List';
import Footer from './Components/Footer';

const App = () => {
  return (
    <SettingsProvider>
      <Header />
      <h1>Hello</h1>
      <List />
      <Footer />
    </SettingsProvider>
  );
};

export default App;
