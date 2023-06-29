import React, { useContext, useState } from 'react';
import { SettingsContext } from '../Context/Settings';
import { TextInput, Button } from '@mantine/core';

function SettingsForm() {
  const { pageItems, completed, sort, updateSettings } = useContext(SettingsContext);
  const [showCompleted, setShowCompleted] = useState(completed);
  const [itemsPerPage, setItemsPerPage] = useState(pageItems);

  const handleShowCompletedChange = (event) => {
    setShowCompleted(event.currentTarget.checked);
  };

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.currentTarget.value));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateSettings({ pageItems: itemsPerPage, completed: showCompleted, sort });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Show completed items:
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={handleShowCompletedChange}
          />
        </label>
      </div>
      <div>
        <label>
          Number of items per page:
          <TextInput
            type="number"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
          />
        </label>
      </div>
      <Button type="submit">Save</Button>
    </form>
  );
}

export default SettingsForm;
