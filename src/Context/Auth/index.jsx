import React from 'react';
import testUsers from './lib/users';
import jwtDecode from 'jwt-decode';

export const AuthContext = React.createContext();

function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState({});
  const [error, setError] = React.useState(null);

  const _validateToken = (token) => {
    try {
      let validUser = jwtDecode(token);
      console.log('Valid User', validUser);
      if (validUser) {
        setUser(validUser);
        setLoggedIn(true);
        console.log('Successfully Logged In');
      }
    } catch (error) {
      setError(error.message);
      console.log('Error: ', error, 'Error Message: ', error.message);
    }
  }

  const login = (username, password) => {
    let user = testUsers[username];
    if (user && user.password === password) {
      try {
        _validateToken(user.token);
      } catch (error) {
        setError(error.message);
        console.log('Error: ', error, 'Error Message: ', error.message);
      }
    }
  }

  const logout = () => {
    setUser({});
    setLoggedIn(false);
  }

  const can = (capability) => {
    return user?.capabilities?.includes(capability);
  }

  const values = {
    login,
    logout,
    can,
    loggedIn,
    user,
    error,
  }
  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}
export default AuthProvider;