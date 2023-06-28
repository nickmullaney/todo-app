import React, { useContext, useState } from 'react';
import { SettingsContext } from '../Context/Settings/index';
import { Pagination}  from '@mantine/core';
import { Paper, Text } from '@mantine/core';

// Placeholder items array
const items = [
  { id: 1, title: 'Item 1', completed: false },
  { id: 2, title: 'Item 2', completed: true },
  { id: 3, title: 'Item 3', completed: false },
  // Add more items as needed
];

function List() {
  const { itemsPerPage, hideCompleted } = useContext(SettingsContext);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Filter completed items based on hideCompleted setting
  const filteredItems = items.filter((item) => !item.completed || !hideCompleted);

  const itemsToRender = filteredItems
    .slice(startIndex, endIndex)
    .map((item) => (
      <Paper key={item.id} padding="md" marginBottom="xs">
        <Text>{item.title}</Text>
      </Paper>
    ));

  return (
    <div>
      {itemsToRender}
      <Pagination
        color="blue"
        size="sm"
        currentPage={currentPage}
        onChange={handlePageChange}
        total={Math.ceil(filteredItems.length / itemsPerPage)}
      />
    </div>
  );
}

export default List;
