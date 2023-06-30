import React, { useState } from 'react';
import Todo from './Components/Todo';
import Footer from './Components/Footer';
import HeaderMenu from './Components/Header';
import SettingsForm from './Components/SettingsForm';
import { ModalLogin } from './Components/Modals/modalLogin';
import { ModalSignup } from './Components/Modals/modalSignup';
import Auth from './Components/Auth';

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
      <ModalLogin opened={loginOpened} onClose={closeLoginModal} />
      <ModalSignup opened={signupOpened} onClose={closeSignupModal} />

      <Auth capability={"read"}>
        <Todo />
        <SettingsForm />
      </Auth>
      <Footer />
    </>
  );
}

export default App;