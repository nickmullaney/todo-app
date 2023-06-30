import React, { useEffect, useState, useContext } from 'react';
import useForm from '../../hooks/form';
import axios from 'axios';
import List from '../List';
import { Grid, Card, TextInput, Button, Text, createStyles, Slider } from '@mantine/core';
import Auth from '../Auth';
import { AuthContext } from '../../Context/Auth';
import { When } from 'react-if';


const styles = createStyles((theme) => ({
  todo: {
    backgroundColor: theme.colors.gray[8],
    color: theme.colors.gray[0],
    width: '80%',
    margin: 'auto',
    fontSize: theme.fontSizes.lg,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
  }
}));

const Todo = () => {
  const { classes } = styles(); // Destructure classes from styles
  const { loggedIn, logout } = useContext(AuthContext);

  const [defaultValues] = useState({
    difficulty: 3,
  });
  const [list, setList] = useState([]); // Initialize list state variable with an empty array
  const [incomplete, setIncomplete] = useState([]); // Initialize incomplete state variable with an empty array
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues); // Custom useForm hook for form handling

  function addItem(item) {
    try {
      const url = 'https://api-js401.herokuapp.com/api/v1/todo';
      const method = 'post';
      const data = item;
      item.complete = false; // Set the complete property of the item to false
      console.log(item);
      axios({
        url,
        method,
        data,
      });
      setList([...list, item]); // Add the item to the list array
    } catch (e) {
      console.error('Error while adding an item', e.message);
    }
  }

  function deleteItem(id) {
    try {
      axios.delete(`https://api-js401.herokuapp.com/api/v1/todo/${id}`);
      const items = list.filter(item => item._id !== id); // Filter out the item with the given ID from the list
      setList(items); // Update the list with the filtered items
    } catch (e) {
      console.error('Error while deleting an item', e.message);
    }
  }

  function toggleComplete(id) {
    try {
      const items = list.map(item => {
        const url = `https://api-js401.herokuapp.com/api/v1/todo/${id}`;
        const method = 'put';
        const data = { complete: !item.complete };
        axios({
          url,
          method,
          data,
        });
        if (item._id === id) {
          item.complete = !item.complete; // Toggle the complete property of the item
        }
        return item;
      });
      setList(items); // Update the list with the modified items
    }
    catch (e) {
      console.error('Error while updating an item', e.message);
    };
  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length; // Count the number of incomplete items
    setIncomplete(incompleteCount); // Update the incomplete state with the count
    document.title = `To Do List: ${incomplete}`;
    // linter will want 'incomplete' added to dependency array unnecessarily.
    // disable code used to avoid linter warning
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list]);

  useEffect(() => {
    const getData = async () => {
      let response = await axios.get('https://api-js401.herokuapp.com/api/v1/todo');
      setList(response.data.results);
    };
    getData();
  }, []);

  return (
    <>
      <When condition={loggedIn}>
        <h1 data-testid="header-h1" className={classes.todo}>To Do List: {incomplete} items pending</h1>

        <Grid style={{ width: '80%', margin: 'auto' }}>
          <Grid.Col xs={12} sm={4}>
            <Auth capability="create">
              <Card withBorder>
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
              </Card>
            </Auth>
          </Grid.Col>
          <Grid.Col xs={12} sm={8}>
            <List
              deleteItem={deleteItem} // Pass the deleteItem function as a prop to the List component
              list={list} // Pass the list as a prop to the List component
              toggleComplete={toggleComplete} // Pass the toggleComplete function as a prop to the List component
            />
          </Grid.Col>
        </Grid>
      </When>
      <When condition={!loggedIn}>
        <h1>Please log in to view your to-do list.</h1>
      </When>
    </>
  );
};

export default Todo;
