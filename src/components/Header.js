import React, { useContext, Fragment } from 'react';

import AuthContext from '../auth-context';

const Header = ({ onLoadTodoList, onLoadAuth }) => {
  const auth = useContext(AuthContext);

  return (
    <header>
      {auth.auth && (
        <Fragment>
          <button onClick={onLoadTodoList}>Todo List</button> |{' '}
        </Fragment>
      )}
      <button onClick={onLoadAuth}>Auth</button>
    </header>
  );
};

export default Header;
