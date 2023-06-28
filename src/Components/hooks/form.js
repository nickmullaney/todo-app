import { useState, useEffect } from 'react';

const useForm = (callback, defaultValues = {}) => {
  // Declaring a custom hook named useForm, which accepts 'callback' and 'defaultValues' as parameters with default value of an empty object

  const [values, setValues] = useState({});
  // Initializing state variables values and setValues using useState hook, with initial value of an empty object

  const handleSubmit = (event) => {
    event.preventDefault();
    // Preventing the default form submission behavior

    callback({ ...values });
    // Invoking the 'callback' function, passing a shallow copy of the 'values' object

  };

  const handleChange = (event) => {
    let name, value;
    // Declaring variables 'name' and 'value'

    if (typeof(event) === 'object') {
      // Checking if the 'event' parameter is of type 'object'

      name = event.target.name;
      value = event.target.value;
      // Extracting the 'name' and 'value' from the event target (assumed to be an input element)

    } else {
      console.log('event from slider', event);
      // Logging the 'event' when it is not an object (assumed to be a slider event)

      // hard coded for Mantine slider functionality
      // change "difficulty" language if desired
      // change name dynamically if doing stretch goal!
      name = 'difficulty';
      value = event;
      // Assigning 'name' as 'difficulty' and 'value' as the value received from the slider event

    }

    if (parseInt(value)) {
      value = parseInt(value);
      // Parsing the 'value' as an integer if it is a numeric string
    }

    setValues(values => ({ ...values, [name]: value }));
    // Updating the 'values' object with a new property using computed property name syntax

  };

  useEffect(() => {
    setValues(defaultValues);
    // Setting the 'values' object to the 'defaultValues' when it changes

  }, [defaultValues]);

  return {
    handleChange,
    handleSubmit,
    values,
  };
  // Returning an object with handleChange, handleSubmit, and values as properties
};

export default useForm;

