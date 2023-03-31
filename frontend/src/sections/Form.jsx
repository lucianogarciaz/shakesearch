import React, { useState } from 'react';
import Filter from './Filter';

export default function Form() {
  const [inputValue, setInputValue] = useState('');

  const handleSelectedOption = (options) => {
    const value = options.label;
    setInputValue(value);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <form className="search">
      <Filter onSelectedOptionsChange={handleSelectedOption} />
      <textarea
        className="box"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Chat with Shakespeare: Ask about his life, works, or characters..."
      />
      <button type="submit">Discover</button>
    </form>
  );
}
