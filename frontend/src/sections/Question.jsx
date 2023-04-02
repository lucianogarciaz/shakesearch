import React from 'react';
import PropTypes from 'prop-types';

export default function Question({ conversation }) {
  return (
    <div className="response">
      <div className="question-box">
        <pre>
          {conversation.question}
        </pre>
      </div>
    </div>
  );
}

Question.propTypes = {
  conversation: PropTypes.func.isRequired,
};
