import React from 'react';

const list = ({ toDoList, handleRemoveTodo }) => {
  console.log('Rerendering list...');

  const renderToDoList = () => {
    return toDoList.map(d => (
      <li onClick={() => handleRemoveTodo(d.id)} key={d.id}>
        {d.name}
      </li>
    ));
  };

  return <ul>{renderToDoList()}</ul>;
};

export default list;
