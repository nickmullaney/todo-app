import { Pagination } from '@mantine/core'; 
import { SettingsContext } from '../Context/Settings'; 
import { useContext, useState } from 'react';

import { Grid, TextInput, Card } from '@mantine/core';

function List(props) {
  const { pageItems, completed, sort } = useContext(SettingsContext);
  // Destructuring pageItems, completed, and sort values from the SettingsContext using useContext hook

  const [currentPage, setCurrentPage] = useState(1);
  // Initializing state variables currentPage and setCurrentPage using useState hook, with initial value of 1

  const pages = Math.ceil(props.list.length / pageItems);
  // Calculating the total number of pages by dividing the length of the list by the number of items per page and rounding up using Math.ceil

  const displayItems = completed 
  ? props.list.filter((items) => !items.complete)
  : props.list;
  // Conditionally filtering the list based on the value of 'completed' variable. If 'completed' is true, only incomplete items are displayed, otherwise all items are displayed

  const firstItem = (currentPage - 1) * pageItems;
  // Calculating the index of the first item to be displayed on the current page

  const lastItem = currentPage * pageItems;
  // Calculating the index of the last item to be displayed on the current page

  const finalItems = displayItems.slice(firstItem, lastItem);
  // Extracting the items to be displayed on the current page using slice method

  return (
    <>
    <Grid display="inline-block">
      <Card>
      {/* Rendering a Grid component with display set to "inline-block" */}
      {/* Rendering a Card component */}

      {finalItems.map(item => (
        // Iterating over the 'finalItems' array using map method to render each item

        <div key={item.id}>
          {/* Creating a div element with a unique key based on the item id */}

          <p>{item.text}</p>
          {/* Displaying the item's text */}
          
          <p><small>Assigned to: {item.assignee}</small></p>
          {/* Displaying the assignee of the item */}
          
          <p><small>Difficulty: {item.difficulty}</small></p>
          {/* Displaying the difficulty of the item */}
          
          <div onClick={() => props.toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
          {/* Creating a div element with an onClick event listener that calls 'toggleComplete' function from props, passing the item id as an argument. Displays the completion status of the item as a string */}
          
          <hr />
          {/* Rendering a horizontal line */}
          
        </div>
      ))}

      <Pagination
        total={pages}
        value={currentPage}
        onChange={(value)=> setCurrentPage(value)}
      />
      {/* Rendering a Pagination component with total number of pages, current page value, and an onChange event listener to update the current page */}

      </Card>
    </Grid>
    </>
  )
}

export default List;
// Exporting the List component as the default export
