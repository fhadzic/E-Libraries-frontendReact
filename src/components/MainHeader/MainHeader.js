import React, { useContext } from 'react';

import Navigation from './Navigation';
import classes from './MainHeader.module.css';
import AuthContext from '../../store/auth-context';

const MainHeader = (props) => {

  const ctx = useContext(AuthContext);

  return (
    <header className={classes['main-header']}>
      <h1 onClick={ctx.onClickOut}>eLibraries</h1>
      <Navigation/>
    </header>
  );
};

export default MainHeader;
