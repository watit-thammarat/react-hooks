import { useState } from 'react';

export const useFormInput = () => {
  const [value, setValue] = useState('');
  const [valid, setValid] = useState(false);

  const onChange = e => {
    setValue(e.target.value);
    setValid(e.target.value.trim().length > 0);
  };

  return { value, onChange, valid };
};
