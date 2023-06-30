import { SettingsContext } from '../../Context/Settings';
import { useContext, useState } from 'react';

import { Card, Button, Pagination, Text, Badge, CloseButton, Group } from '@mantine/core';
import Auth from '../Auth';
import { Else, If, Then } from 'react-if';
import { AuthContext } from '../../Context/Auth';

function List({ list, toggleComplete, deleteItem }) {
  const { loggedIn, can } = useContext(AuthContext);
  const { pageItems, showCompleted, sort } = useContext(SettingsContext); // Access the pageItems and showCompleted values from the SettingsContext
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
    {finalItems.map(item => (
      <Card mb="sm" shadow="md" withBorder key={item.id}>
        <Card.Section withBorder>
          <Group position="apart">
            <Group>
              <If condition={loggedIn && can('update')}>
                <Then>
                  <Badge
                    onClick={() => toggleComplete(item.id)}
                    color={item.complete ? 'red' : 'green'}
                    variant="filled"
                    m="3px"
                  >
                    {item.complete ? 'Complete' : 'Pending'}
                  </Badge>
                </Then>
                <Else>
                <Badge
                    color={item.complete ? 'red' : 'green'}
                    variant="filled"
                    m="3px"
                  >
                    {item.complete ? 'Complete' : 'Pending'}
                  </Badge>
                </Else>
              </If>
              <Text>{item.assignee}</Text>
            </Group>
            <Auth capability="delete">
              <CloseButton
                onClick={() => deleteItem(item.id)}
                title="Close Todo Item"
              />
            </Auth>
          </Group>
        </Card.Section>
        <Text mt="sm" align="left">{item.text}</Text>
        <Text align="right"><small>Difficulty: {item.difficulty}</small></Text>
      </Card>

    ))}

    <Pagination value={currentPage} onChange={setCurrentPage} total={pages} />

  </>
  )
}

export default List;
