import React, { useContext } from 'react';

import Login from './components/Login/Login';
import HomeLibrary from './components/Library/HomeLibrary';
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from './store/auth-context';
import BookHome from './components/Book/BookHome';

function App() {

  const ctx = useContext(AuthContext);

  let content = (<Login />);

  if (ctx.isLoggedIn && !ctx.isClickedLibrary) {
    content = (<HomeLibrary />);
  }

  if (ctx.isLoggedIn && ctx.isClickedLibrary) {
    content = (
      <BookHome />
    );
  }

  return (
    <React.Fragment>
      <MainHeader onLogout={ctx.logoutHandler} />
      <main>
        {content}
      </main>
    </React.Fragment>
  );
}

export default App;
