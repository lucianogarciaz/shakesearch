import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Answer from './Answer';
import MagGlass from '../assets/MagGlass';
import Pills from './Pills';

export default function Form({ addConversation }) {
  const [warningMessage, setWarningMessage] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);

  const waitingPhrase = "Patience is a virtue! We're searching Shakespeare's world for the perfect response...";
  const errorMessage = 'Oops! Your Shakespearean request hit a snag. Please give it another go.';

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isAnswering || inputValue === '') {
      return;
    }

    setIsAnswering(true);

    const question = inputValue;

    setWarningMessage(waitingPhrase);

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
        setTimeout((() => {
          setWarningMessage(errorMessage);
        }), 1000);
        setWarningMessage(errorMessage);
      }

      const data = await response.json();
      addConversation(question, [data.response]);
      setWarningMessage('');
      setInputValue('');
    } catch (error) {
      setTimeout((() => {
        setWarningMessage(errorMessage);
      }), 1000);
    }
    setIsAnswering(false);
  };

  const handlePillClick = async (pillText) => {
    setInputValue(pillText);
    const event = new Event('submit');
    await handleSubmit(event);
  };

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      await handleSubmit(event);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="search">
        <div className="box">
          <button type="submit" aria-label="Submit question" className="mag-glass-button"><MagGlass /></button>
          <textarea
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyPress}
            placeholder="Chat with Shakespeare: Ask about his life, works, or characters..."
          />
        </div>
      </form>

      {!isAnswering && (
      <Pills handlePillClick={handlePillClick} />
      )}

      {(isAnswering || warningMessage !== '') && (
        <Answer isFirstElement conversation={{ answer: [warningMessage] }} />
      )}
    </>
  );
}

Form.propTypes = {
  addConversation: PropTypes.func.isRequired,
};
