import { useState, useEffect } from 'react';

const useForm = (callback, defaultValues={}) => {

  const [values, setValues] = useState({}); // Initialize values state variable with an empty object

  const handleSubmit = (event) => {
    event.preventDefault();
    callback({...values}); // Call the callback function with a copy of the values object
  };

  const handleChange = (event) => {
    let name, value;
    if (typeof(event) === 'object') {
      name = event.target.name;
      value = event.target.value;
    } else {
      console.log('event from slider', event);
      // hard coded for Mantine slider functionality
      // change "difficulty" language if desired
      // change name dynamically if doing stretch goal!
      name = 'difficulty';
      value = event;
    }

    if (parseInt(value)) {
      value = parseInt(value);
    }

    setValues(values => ({ ...values, [name]: value })); // Update the values object with the new name-value pair
  };

  useEffect(() => {
    setValues(defaultValues); // Set the initial values to the defaultValues
  }, [defaultValues]);

  return {
    handleChange,
    handleSubmit,
    values,
  };
};

export default useForm;
