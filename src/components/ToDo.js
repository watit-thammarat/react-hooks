import React, {
  Fragment,
  useState,
  useEffect,
  useReducer,
  useRef,
  useMemo
} from 'react';
import axios from 'axios';

import List from './List';
import { useFormInput } from '../hooks/forms';

const ADD = 'ADD';
const REMOVE = 'REMOVE';
const SET = 'SET';

const todoListReducer = (state, { type, payload }) => {
  switch (type) {
    case SET:
      return payload;
    case ADD:
      return [...state, payload];
    case REMOVE:
      return state.filter(s => s.id !== payload);
    default:
      return state;
  }
};

const ToDo = () => {
  const todoInputRef = useRef();
  const [addedTodo, setAddedTodo] = useState(null);
  const [toDoList, dispatch] = useReducer(todoListReducer, []);
  const { value, valid, onChange } = useFormInput();

  const handleRemoveTodo = async id => {
    try {
      await axios.delete(`https://todo-bcdd3.firebaseio.com/todos/${id}.json`);
      dispatch({ type: REMOVE, payload: id });
    } catch (err) {
      console.error(err);
    }
  };

  const addToDoList = async () => {
    try {
      const name = todoInputRef.current.value;
      const { data } = await axios.post(
        `https://todo-bcdd3.firebaseio.com/todos.json`,
        { name }
      );
      setAddedTodo({ id: data.name, name });
      todoInputRef.current.value = '';
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `https://todo-bcdd3.firebaseio.com/todos.json`
        );
        const todos = [];
        for (const key in data) {
          todos.push({ id: key, name: data[key].name });
        }
        dispatch({ type: SET, payload: todos });
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(
    () => {
      if (addedTodo) {
        dispatch({ type: ADD, payload: addedTodo });
      }
    },
    [addedTodo]
  );

  // const handleMouseMove = e => {
  //   console.log(e.clientX, e.clientY);
  // };

  // useEffect(() => {
  //   document.addEventListener('mousemove', handleMouseMove);
  //   return () => {
  //     document.removeEventListener('mousemove', handleMouseMove);
  //   };
  // }, []);

  return (
    <Fragment>
      <input
        type="text"
        placeholder="ToDo"
        ref={todoInputRef}
        onChange={onChange}
        style={{ backgroundColor: valid ? 'transparent' : 'red' }}
      />
      <button type="button" onClick={addToDoList}>
        Add
      </button>
      {useMemo(
        () => (
          <List toDoList={toDoList} handleRemoveTodo={handleRemoveTodo} />
        ),
        [toDoList]
      )}
    </Fragment>
  );
};

export default ToDo;
