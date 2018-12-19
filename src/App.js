import React, { useState } from 'react';

import ToDo from './components/ToDo';
import Header from './components/Header';
import Auth from './components/Auth';
import AuthContext from './auth-context';

const App = props => {
  const [showTodoList, setShowTodoList] = useState(false);
  const [showAuth, setShowAuth] = useState(true);
  const [auth, setAuth] = useState(false);

  const onLoadTodoList = () => {
    setShowTodoList(true);
    setShowAuth(false);
  };

  const onLoadAuth = () => {
    setShowTodoList(false);
    setShowAuth(true);
  };

  const login = () => {
    setAuth(true);
  };

  return (
    <div>
      <AuthContext.Provider value={{ auth, login }}>
        <Header onLoadTodoList={onLoadTodoList} onLoadAuth={onLoadAuth} />
        <hr />
        {showTodoList && <ToDo />}
        {showAuth && <Auth />}
      </AuthContext.Provider>
    </div>
  );
};

export default App;
