import React, { useState } from 'react';

export const SettingsContext = React.createContext();

function SettingsProvider({ children }){

  const [pageItems, setPageItems] = useState(3);
  const [completed, setCompleted] = useState(true);
  const [sort, setSort] = useState('difficulty');

  const values = {
    pageItems,
    completed,
    sort,
  }

  return(
    <SettingsContext.Provider value={values}>
      {children}
    </SettingsContext.Provider>
  )
}

export default SettingsProvider;