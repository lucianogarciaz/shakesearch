import React from 'react';
import PropTypes from 'prop-types';

export default function Pills({ handlePillClick }) {
  const firstSuggestion = 'Can you tell us more about your creative process?';
  const secondSuggestion = 'Did you enjoy writing comedies more?';

  return (
    <div className="pills">
      <button type="button" className="pill" onClick={() => handlePillClick(firstSuggestion)}>
        {firstSuggestion}
      </button>
      <button type="button" className="pill" onClick={() => handlePillClick(secondSuggestion)}>
        {secondSuggestion}
      </button>
    </div>
  );
}

Pills.propTypes = {
  handlePillClick: PropTypes.func.isRequired,
};
