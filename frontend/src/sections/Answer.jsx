import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import PropTypes from 'prop-types';

export default function Answer({ conversation, isFirstElement, isWaiting }) {
  return (
    <div className="response">
      <div className="answer-box">
        <pre>
          {isFirstElement || isWaiting ? (
            <TypeAnimation
              key={conversation.answer.toString()}
              sequence={conversation.answer}
              wrapper="span"
              speed={90}
              cursor={isWaiting}
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
  isWaiting: PropTypes.bool,
};

Answer.defaultProps = {
  isWaiting: false,
};
