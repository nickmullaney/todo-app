import React, { useEffect, useState } from 'react';
import useForm from '../../hooks/form';
import { v4 as uuid } from 'uuid';
import List from '../List';

import { Grid, TextInput, Button, Text, createStyles, Slider } from '@mantine/core';

const styles = createStyles((theme) => ({
  todo: {
    backgroundColor: theme.colors.gray[8],
    color: theme.colors.gray[0],
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '16px auto',
    padding: '16px',
    width: '80%',
  }
}));

const Todo = () => {
  const { classes } = styles(); // Destructure classes from styles

  const [defaultValues] = useState({
    difficulty: 3,
  });
  const [list, setList] = useState([]); // Initialize list state variable with an empty array
  const [incomplete, setIncomplete] = useState([]); // Initialize incomplete state variable with an empty array
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues); // Custom useForm hook for form handling

  function addItem(item) {
    item.id = uuid(); // Generate a unique ID using uuid()
    item.complete = false; // Set the complete property of the item to false
    console.log(item);
    setList([...list, item]); // Add the item to the list array
  }

  function deleteItem(id) {
    const items = list.filter(item => item.id !== id); // Filter out the item with the given ID from the list
    setList(items); // Update the list with the filtered items
  }

  function toggleComplete(id) {
    const items = list.map(item => {
      if (item.id === id) {
        item.complete = !item.complete; // Toggle the complete property of the item
      }
      return item;
    });

    setList(items); // Update the list with the modified items
  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length; // Count the number of incomplete items
    setIncomplete(incompleteCount); // Update the incomplete state with the count
    document.title = `To Do List: ${incomplete}`;
    // linter will want 'incomplete' added to dependency array unnecessarily.
    // disable code used to avoid linter warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  return (
    <>
      <h1 data-testid="header-h1" className={classes.todo}>To Do List: {incomplete} items pending</h1>

      <Grid>
        <Grid.Col xs={12} sm={4}>
          <form onSubmit={handleSubmit}>
            <h2>Add To Do Item</h2>

            <TextInput
              onChange={handleChange}
              name="text"
              type="text"
              placeholder="Item Details"
            />

            <TextInput
              onChange={handleChange}
              name="assignee"
              type="text"
              placeholder="Assignee Name"
            />

            <Text>Difficulty Rating</Text>
            <Slider
              onChange={handleChange}
              defaultValue={defaultValues.difficulty}
              min={1}
              max={5}
              name="difficulty"
            />

            <label>
              <Button radius="md" type="submit">Add Item</Button>
            </label>
          </form>
        </Grid.Col>
        <Grid.Col xs={12} sm={8}>
          <List
            deleteItem={deleteItem} // Pass the deleteItem function as a prop to the List component
            list={list} // Pass the list as a prop to the List component
            toggleComplete={toggleComplete} // Pass the toggleComplete function as a prop to the List component
          />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default Todo;
