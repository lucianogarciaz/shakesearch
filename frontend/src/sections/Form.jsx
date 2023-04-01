import React, { useState } from 'react';

export default function Form() {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <form className="search">
      <textarea
        className="box"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Chat with Shakespeare: Ask about his life, works, or characters..."
      />
      <div className="circle">
        <button type="submit">Ask</button>
      </div>
    </form>
  );
}
