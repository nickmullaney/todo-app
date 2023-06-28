import React, { useEffect, useState } from 'react';
import useForm from '../hooks/form';

import { v4 as uuid } from 'uuid';
import Header from '../Header';
import Footer from '../Footer';
import List from '../List';

import { Grid, TextInput, Card } from '@mantine/core';

import { Button } from '@mantine/core';
import { Slider } from '@mantine/core';

const Todo = () => {

  const [defaultValues] = useState({
    difficulty: 3,
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log(item);
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {

    const items = list.map(item => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);

  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
    // linter will want 'incomplete' added to dependency array unnecessarily. 
    // disable code used to avoid linter warning 
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [list]);

  return (
    <>
      {/* rendering but need to check if incomplete is passing down correctly */}
      <Header incomplete={incomplete} />

      {/* leave the form code inside of the Todo Component */}


      <Grid display="inline-block">
        <Card>

        <form onSubmit={handleSubmit}>

          <h2>Add To Do Item</h2>

          <label>
            <span>To Do Item</span>
            <TextInput onChange={handleChange} name="text" type="text" placeholder="Item Details" />
          </label>

          <label>
            <span>Assigned To</span>
            <TextInput onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
          </label>

          <label>
            <span>Difficulty</span>
            <Slider

              marks={[
                { value: 20, label: '1' },
                { value: 40, label: '2' },
                { value: 60, label: '3' },
                { value: 80, label: '4' },
                { value: 100, label: '5' },
              ]}
              onChange={handleChange} defaultValue={defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
          </label>

          <label>
            <Button radius="md" type="submit">Add Item</Button>
          </label>
        </form>
        </Card>
      </Grid>

      <List list={list} toggleComplete={toggleComplete} />

      <Footer />
    </>
  );
};

export default Todo;