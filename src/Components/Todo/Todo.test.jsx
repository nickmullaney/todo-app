import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import axios from 'axios';
import Todo from '../Components/Todo';

jest.mock('axios'); // Mock the axios module

describe('Todo Component', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocked axios calls before each test
  });

  test('renders the component with initial state', () => {
    render(<Todo />);

    // Assert that the header is rendered with the correct text
    const header = screen.getByTestId('header-h1');
    expect(header).toBeInTheDocument();
    expect(header).toHaveTextContent('To Do List: 0 items pending');

    // Assert that the add item form is rendered
    const addItemForm = screen.getByRole('form');
    expect(addItemForm).toBeInTheDocument();

    // Assert that the list is rendered
    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();
  });

  test('adds an item when the form is submitted', () => {
    render(<Todo />);

    const addItemForm = screen.getByRole('form');

    // Simulate user input in the form fields
    const itemDetailsInput = screen.getByPlaceholderText('Item Details');
    fireEvent.change(itemDetailsInput, { target: { value: 'Buy groceries' } });

    const assigneeInput = screen.getByPlaceholderText('Assignee Name');
    fireEvent.change(assigneeInput, { target: { value: 'John Doe' } });

    const addButton = screen.getByRole('button', { name: 'Add Item' });

    // Mock the axios post request
    axios.post.mockResolvedValueOnce({ data: { id: '123', text: 'Buy groceries', assignee: 'John Doe', complete: false } });

    // Submit the form
    fireEvent.submit(addItemForm);

    // Assert that the axios post request was called with the correct data
    expect(axios.post).toHaveBeenCalledWith('https://api-js401.herokuapp.com/api/v1/todo', {
      text: 'Buy groceries',
      assignee: 'John Doe',
      complete: false,
    });

    // Assert that the item is added to the list
    const listItem = screen.getByText('Buy groceries - John Doe');
    expect(listItem).toBeInTheDocument();
  });

  test('deletes an item when the delete button is clicked', () => {
    render(<Todo />);

    // Mock the initial GET request to populate the list
    axios.get.mockResolvedValueOnce({ data: { results: [{ id: '123', text: 'Buy groceries', assignee: 'John Doe', complete: false }] } });

    // Wait for the initial list to be loaded
    return screen.findByRole('list').then(() => {
      const deleteButton = screen.getByRole('button', { name: 'Delete' });

      // Mock the axios delete request
      axios.delete.mockResolvedValueOnce();

      // Click the delete button
      fireEvent.click(deleteButton);

      // Assert that the axios delete request was called with the correct URL
      expect(axios.delete).toHaveBeenCalledWith('https://api-js401.herokuapp.com/api/v1/todo/123');

      // Assert that the item is removed from the list
      const listItem = screen.queryByText('Buy groceries - John Doe');
      expect(listItem).not.toBeInTheDocument();
    });
  });

  test('marks an item as complete when the toggle button is clicked', () => {
    render(<Todo />);

    // Mock the initial GET request to populate the list
    axios.get.mockResolvedValueOnce({ data: { results: [{ id: '123', text: 'Buy groceries', assignee: 'John Doe', complete: false }] } });

    // Wait for the initial list to be loaded
    return screen.findByRole('list').then(() => {
      const toggleButton = screen.getByRole('button', { name: 'Toggle' });

      // Mock the axios put request
      axios.put.mockResolvedValueOnce();

      // Click the toggle button
      fireEvent.click(toggleButton);

      // Assert that the axios put request was called with the correct URL and data
      expect(axios.put).toHaveBeenCalledWith('https://api-js401.herokuapp.com/api/v1/todo/123', {
        complete: true,
      });

      // Assert that the item is marked as complete
      const listItem = screen.getByText('Buy groceries - John Doe');
      expect(listItem).toHaveClass('completed');
    });
  });

  // Add more tests as needed for other functionality of the Todo component
});
