import React from 'react';
import PropTypes from 'prop-types';
import Question from './Question';
import Answer from './Answer';

export default function Responses({ conversation, isFirstElement }) {
  return (
    <div className="responses">
      <Question conversation={conversation} />
      <Answer conversation={conversation} isFirstElement={isFirstElement} />
    </div>
  );
}

Responses.propTypes = {
  conversation: PropTypes.shape({
    answer: PropTypes.arrayOf(PropTypes.string).isRequired,
    question: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  isFirstElement: PropTypes.bool.isRequired,
};
