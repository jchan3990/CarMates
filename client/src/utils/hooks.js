import { useState } from 'react';

export const useForm = (callback, initialState = {}) => {
  const [values, setValues] = useState(initialState);

  const onChange = (e) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    callback();
  }

  return {
    onChange,
    onSubmit,
    setValues,
    values
  }
}