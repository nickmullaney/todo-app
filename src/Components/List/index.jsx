import { SettingsContext } from '../Context/Settings';
import { useContext, useState } from 'react';

import { Card, Button, Pagination, Text } from '@mantine/core';

function List({ list, toggleComplete }) {

  const { pageItems, showCompleted } = useContext(SettingsContext); // Access the pageItems and showCompleted values from the SettingsContext
  const [currentPage, setCurrentPage] = useState(1); // Initialize currentPage state variable with a value of 1

  const displayItems = showCompleted
    ? list
    : list.filter((items) => !items.complete); // Filter the list based on the showCompleted value

  const pages = Math.ceil(displayItems.length / pageItems); // Calculate the number of pages based on the displayItems length and pageItems value
  const firstItem = (currentPage - 1) * pageItems; // Calculate the index of the first item on the current page
  const lastItem = currentPage * pageItems; // Calculate the index of the last item on the current page
  const finalItems = displayItems.slice(firstItem, lastItem); // Get the items for the current page

  return (
    <>
      <Card shadow="sm" padding="md" margin="md">
        <Card.Section>
          {finalItems.map(item => (
            <div key={item.id}>
              <Text>{item.text}</Text>
              <Text><small>Assigned to: {item.assignee}</small></Text>
              <Text><small>Difficulty: {item.difficulty}</small></Text>
              <Button onClick={() => toggleComplete(item.id)}>Complete: {item.complete.toString()}</Button>
              <hr />
            </div>
          ))}
        </Card.Section>

        <Pagination
          total={pages}
          value={currentPage}
          onChange={(value) => setCurrentPage(value)} // Update the currentPage value when the page changes
        />
      </Card>
    </>
  )
}

export default List;
