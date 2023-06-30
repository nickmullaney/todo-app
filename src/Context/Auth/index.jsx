import React, { useEffect } from 'react';
// import testUsers from './lib/users';
import jwtDecode from 'jwt-decode';
import cookie from 'react-cookies'
import axios from 'axios';

export const AuthContext = React.createContext();

function AuthProvider({ children }) {
  // Define state variables for logged-in state, user data, and error
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [error, setError] = React.useState(null);

  useEffect(() => {
    let cookieToken = cookie.load('auth');
    _validateToken(cookieToken);
  }, []);

  // Function to validate the token and set the user data and logged-in state
  const _validateToken = (token) => {
    try {
      // Decode the JWT token to get the user information
      let validUser = jwtDecode(token);
      console.log('Valid User', validUser);
      if (validUser) {
        // Set the user data and update the logged-in state
        cookie.save('auth', token);
        setUser(validUser);
        setLoggedIn(true);
        console.log('Successfully Logged In');
        localStorage.setItem('loggedIn', 'true'); // Save the logged-in state in local storage
      }
    } catch (error) {
      setError(error.message);
      console.log('Error: ', error, 'Error Message: ', error.message);
    }
  };

  // Function to perform the login process
  const login = async (username, password) => {
    let config = {
      baseURL: 'https://auth-server-401.herokuapp.com',
      url: '/signin',
      method: 'post',
      auth: { username, password }
    }
    let response = await axios(config);
    console.log('user---------------', response.data)
    let token = response.data.token;
    // let user = testUsers[username];
    // if (user && user.password === password) {
    if (token) {
      try {
        _validateToken(token);
      } catch (error) {
        setError(error.message);
        console.log('Error: ', error, 'Error Message: ', error.message);
      }
    }
  };

  // Function to perform the logout process
  const logout = () => {
    // Clear the user data and update the logged-in state
    setUser({});
    setLoggedIn(false);
    localStorage.removeItem('loggedIn'); // Remove the logged-in state from local storage upon logout
  };

  // Function to check if the user has a specific capability
  const can = (capability) => {
    return user?.capabilities?.includes(capability);
  };

  // Use the useEffect hook to check for the presence of the logged-in state in local storage
  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('loggedIn');
    if (storedLoggedIn) {
      // If the logged-in state is found, update the state variable
      setLoggedIn(true);
    }
  }, []); // Run this effect only once when the component mounts

  // Create an object containing all the values to be provided by the context
  const values = {
    login,
    logout,
    can,
    loggedIn,
    user,
    error,
  };

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
