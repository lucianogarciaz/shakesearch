import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import PropTypes from 'prop-types';

export default function Answer({ conversation, isFirstElement }) {
  return (
    <div className="response">
      <div className="answer-box">
        <pre>
          {isFirstElement ? (
            <TypeAnimation
              key={conversation.answer.toString()}
              sequence={conversation.answer}
              wrapper="span"
              speed={90}
              cursor={false}
            />
          ) : (
            conversation.answer
          )}
        </pre>
      </div>
    </div>
  );
}

Answer.propTypes = {
  conversation: PropTypes.shape({
    answer: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  isFirstElement: PropTypes.bool.isRequired,
};
