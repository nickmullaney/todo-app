import { SettingsContext } from '../Context/Settings';
import { useContext, useState } from 'react';

import { Card, Button, Pagination, Text} from '@mantine/core';

function List({list, toggleComplete}) {

  const { pageItems, showCompleted } = useContext(SettingsContext); //sort was taken out of here
  const [currentPage, setCurrentPage] = useState(1);

  const displayItems = showCompleted 
  ? list
  : list.filter((items) => !items.complete);
  
  const pages = Math.ceil(displayItems.length / pageItems);
  const firstItem = (currentPage - 1) * pageItems;
  const lastItem = currentPage * pageItems;
  const finalItems = displayItems.slice(firstItem, lastItem);

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
        onChange={(value)=> setCurrentPage(value)}
      />
      </Card>

    </>
  )
}

export default List;