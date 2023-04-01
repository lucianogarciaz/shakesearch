import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Form({ setAnswer }) {
  const [inputValue, setInputValue] = useState('');
  const waitingPhrase = 'Hold, kind friend, whilst I ruminate upon the matter at hand...';
  const errorMessage = 'Alas, a grievous error hath occurred; prithee, '
      + 'attempt thy query once more, and fortune may favor us';
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setAnswer([waitingPhrase]);

    const endpoint = '/search';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: inputValue }),
      });

      if (!response.ok) {
        setAnswer([errorMessage]);
      }

      const data = await response.json();
      setAnswer([data.response]);
    } catch (error) {
      setAnswer([errorMessage]);
    }
  };

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      await handleSubmit(event);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search">
      <textarea
        className="box"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        placeholder="Chat with Shakespeare: Ask about his life, works, or characters..."
      />
      <div className="circle">
        <button type="submit">Ask</button>
      </div>
    </form>
  );
}

Form.propTypes = {
  setAnswer: PropTypes.func.isRequired,
};
