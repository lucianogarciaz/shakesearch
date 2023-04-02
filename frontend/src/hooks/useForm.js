import { useState } from 'react';

export default function useForm() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (event, submitFunction) => {
    event.preventDefault();
    await submitFunction(inputValue);
  };

  const handleKeyPress = async (event, submitFunction) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      await submitFunction(inputValue);
    }
  };

  return {
    inputValue, handleInputChange, handleSubmit, handleKeyPress, setInputValue,
  };
}
