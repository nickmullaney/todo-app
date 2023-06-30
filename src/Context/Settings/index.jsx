import React, { useEffect, useState } from 'react';

// Create a new context called SettingsContext
export const SettingsContext = React.createContext();

function SettingsProvider({ children }) {
  // Define state variables using the useState hook
  const [pageItems, setPageItems] = useState(3);
  const [showCompleted, setShowCompleted] = useState(false);
  const [sort, setSort] = useState('difficulty');

  // Function to save settings in localStorage
  const saveLocalStorage = () => {
    localStorage.setItem('pageItems', JSON.stringify(+pageItems)); // Convert pageItems to a number using '+'
    localStorage.setItem('showCompleted', JSON.stringify(showCompleted));
    localStorage.setItem('sort', JSON.stringify(sort));
  };

  // Combine state variables and saveLocalStorage function into a single object
  const values = {
    pageItems,
    setPageItems,
    showCompleted,
    setShowCompleted,
    sort,
    setSort,
    saveLocalStorage,
  };

  // useEffect hook to load settings from localStorage when the component mounts
  useEffect(() => {
    const localPageItems = localStorage.getItem('pageItems');
    console.log('my local page items', localPageItems);
    const localShowCompleted = localStorage.getItem('showCompleted');
    console.log('my local show completed', localShowCompleted);
    const localSort = localStorage.getItem('sort');
    console.log('my local sort', localSort);

    // Check if localPageItems exists and update the state variable if true
    if (localPageItems) {
      setPageItems(JSON.parse(localPageItems)); // Convert the stored string back to a number using JSON.parse()
    }
    // Check if localShowCompleted exists and update the state variable if true
    if (localShowCompleted) {
      setShowCompleted(JSON.parse(localShowCompleted));
    }
    // Check if localSort exists and update the state variable if true
    if (localSort) {
      setSort(JSON.parse(localSort));
    }
  }, []); // The empty dependency array ensures the effect runs only once when the component mounts

  return (
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  );
}

export default SettingsProvider;
