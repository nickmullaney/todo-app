import React, { createContext, useEffect, useState } from 'react';

export const SettingsContext = createContext();

function SettingsProvider({ children }) {
  const [pageItems, setPageItems] = useState(3);
  const [completed, setCompleted] = useState(true);
  const [sort, setSort] = useState('difficulty');

  useEffect(() => {
    // Retrieve settings from localStorage on component mount
    const storedSettings = localStorage.getItem('settings');
    if (storedSettings) {
      const parsedSettings = JSON.parse(storedSettings);
      setPageItems(parsedSettings.pageItems);
      setCompleted(parsedSettings.completed);
      setSort(parsedSettings.sort);
    }
  }, []);

  const updateSettings = (newSettings) => {
    setPageItems(newSettings.pageItems);
    setCompleted(newSettings.completed);
    setSort(newSettings.sort);
  };

  useEffect(() => {
    // Save settings to localStorage whenever they change
    const settings = { pageItems, completed, sort };
    localStorage.setItem('settings', JSON.stringify(settings));
  }, [pageItems, completed, sort]);

  const contextValues = {
    pageItems,
    completed,
    sort,
    updateSettings,
  };

  return (
    <SettingsContext.Provider value={contextValues}>
      {children}
    </SettingsContext.Provider>
  );
}

export default SettingsProvider;
