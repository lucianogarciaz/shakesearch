import React from 'react';
import PropTypes from 'prop-types';
import Answer from './Answer';
import MagGlass from '../assets/MagGlass';
import Pills from './Pills';
import useForm from '../hooks/useForm';
import useShakespeareSearch from '../hooks/useShakespeareSearch';

export default function Form({ addConversation }) {
  const { warningMessage, isAnswering, submitQuestion } = useShakespeareSearch(addConversation);
  const {
    inputValue, handleInputChange, handleSubmit, handleKeyPress,
  } = useForm(submitQuestion);

  const handlePillClick = async (pillText) => {
    await submitQuestion(pillText);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="search">
        <div className="box">
          <button type="submit" aria-label="Submit question" className="mag-glass-button"><MagGlass /></button>
          <input
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
