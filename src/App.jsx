import React, { useState, useContext } from 'react';
import Todo from './Components/Todo';
import Footer from './Components/Footer';
import HeaderMenu from './Components/Header';
import SettingsForm from './Components/SettingsForm';
import { ModalLogin } from './Components/Modals/modalLogin';
import { ModalSignup } from './Components/Modals/modalSignup';
import Auth from './Components/Auth';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { When } from 'react-if';
import { AuthContext } from './Context/Auth';

function App() {
  const { loggedIn } = useContext(AuthContext);
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
      <BrowserRouter>
        <HeaderMenu
          openLoginModal={openLoginModal}
          closeLoginModal={closeLoginModal}
          openSignupModal={openSignupModal}
          closeSignupModal={closeSignupModal}
          signupOpened={signupOpened}
        />
        <ModalLogin opened={loginOpened} onClose={closeLoginModal} />
        <ModalSignup opened={signupOpened} onClose={closeSignupModal} />
        <When condition={loggedIn}>
          <Routes>
            <Route path="/" element={<Todo />} />
            <Route path="/settings" element={<SettingsForm />} />
        </Routes>
      </When>
      <Footer />
    </BrowserRouter >
    </>
  );
}

export default App;