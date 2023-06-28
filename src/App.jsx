import React, { useState } from 'react';
import Todo from './Components/Todo';
import Footer from './Components/Footer';
import HeaderMenu from './Components/Header';

function App() {
  const [loginOpened, setLoginOpened] = useState(false);
  const [signupOpened, setSignupOpened] = useState(false);

  const openLoginModal = () => {
    setLoginOpened(true);
  };

  const closeLoginModal = () => {
    setLoginOpened(false);
  };

  const openSignupModal = () => {
    setSignupOpened(true);
  };

  const closeSignupModal = () => {
    setSignupOpened(false);
  };

  return (
    <>
      <HeaderMenu
        openLoginModal={openLoginModal}
        closeLoginModal={closeLoginModal}
        openSignupModal={openSignupModal}
        closeSignupModal={closeSignupModal}
        signupOpened={signupOpened}
      />
      <Todo />
      <Footer />
    </>
  );
}

export default App;
