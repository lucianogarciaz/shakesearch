import { useState } from 'react';

export default function useForm(submitFunction) {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await submitFunction(inputValue);
  };

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      await submitFunction(inputValue);
    }
  };

  return {
    inputValue, handleInputChange, handleSubmit, handleKeyPress,
  };
}
