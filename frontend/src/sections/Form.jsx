import React from 'react';
import PropTypes from 'prop-types';
import Answer from './Answer';
import MagGlass from '../assets/MagGlass';
import Pills from './Pills';
import useForm from '../hooks/useForm';
import useShakespeareSearch from '../hooks/useShakespeareSearch';

export default function Form({ addConversation }) {
  const {
    inputValue, handleInputChange, handleSubmit, handleKeyPress, setInputValue,
  } = useForm();
  const {
    warningMessage,
    isAnswering,
    submitQuestion,
  } = useShakespeareSearch(addConversation, setInputValue);

  const handlePillClick = async (pillText) => {
    await submitQuestion(pillText);
  };

  return (
    <>
      <Pills handlePillClick={handlePillClick} />

      <form
        onSubmit={(e) => {
          handleSubmit(e, submitQuestion);
        }}
        className="search"
      >
        <div className="box">
          <button type="submit" aria-label="Submit question" className="mag-glass-button"><MagGlass /></button>
          <input
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={(e) => { handleKeyPress(e, submitQuestion); }}
            placeholder="Chat with Shakespeare: Ask about his life, works, or characters..."
          />
        </div>
      </form>

      {(isAnswering || warningMessage !== '') && (
        <Answer isFirstElement isWaiting conversation={{ answer: [warningMessage] }} />
      )}
    </>
  );
}

Form.propTypes = {
  addConversation: PropTypes.func.isRequired,
};
