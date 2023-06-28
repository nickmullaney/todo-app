import { Pagination } from '@mantine/core';
import { SettingsContext } from '../Context/Settings';
import { useContext, useState } from 'react';

import { Grid, TextInput, Card } from '@mantine/core';

function List(props) {

  const { pageItems, completed, sort } = useContext(SettingsContext);
  const [currentPage, setCurrentPage] = useState(1);

  const pages = Math.ceil(props.list.length / pageItems);

  const displayItems = completed 
  ? props.list.filter((items) => !items.complete)
  : props.list;

  const firstItem = (currentPage - 1) * pageItems;
  const lastItem = currentPage * pageItems;
  const finalItems = displayItems.slice(firstItem, lastItem);

  return (
    <>
    <Grid display="inline-block">
      <Card>

      {finalItems.map(item => (
        <div key={item.id}>
          <p>{item.text}</p>
          <p><small>Assigned to: {item.assignee}</small></p>
          <p><small>Difficulty: {item.difficulty}</small></p>
          <div onClick={() => props.toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
          <hr />
        </div>
      ))}

      <Pagination
        total={pages}
        value={currentPage}
        onChange={(value)=> setCurrentPage(value)}
      />
      </Card>
    </Grid>
    </>
  )
}

export default List;