import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function Form({ addConversation }) {
  const [inputValue, setInputValue] = useState('');
  const waitingPhrase = "Patience is a virtue! We're searching Shakespeare's world for the perfect response...";
  const errorMessage = 'Oops! Your Shakespearean request hit a snag. Please give it another go.';

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const question = inputValue;
    setInputValue('');

    addConversation(question, [waitingPhrase]);

    const endpoint = '/search';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        addConversation(question, [errorMessage]);
      }

      const data = await response.json();
      addConversation(question, [data.response]);
    } catch (error) {
      addConversation(question, [errorMessage]);
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
    </form>
  );
}

Form.propTypes = {
  addConversation: PropTypes.func.isRequired,
};
