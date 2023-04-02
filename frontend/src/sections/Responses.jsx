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
  conversation: PropTypes.func.isRequired,
  isFirstElement: PropTypes.bool.isRequired,
};
