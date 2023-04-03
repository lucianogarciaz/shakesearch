import React from 'react';
import PropTypes from 'prop-types';

export default function Pills({ handlePillClick }) {
  const firstSuggestion = "What prophecy drives Macbeth's ambition?";
  const secondSuggestion = "Who is Prospero's servant in 'The Tempest?";
  const thirdSuggestion = 'Who betrays Julius Caesar in his play?';
  const fourthSuggestion = "Who are Romeo and Juliet's feuding families?";

  return (
    <>
      <div className="pills">
        <button type="button" className="pill" onClick={() => handlePillClick(firstSuggestion)}>
          {firstSuggestion}
        </button>
        <button type="button" className="pill" onClick={() => handlePillClick(secondSuggestion)}>
          {secondSuggestion}
        </button>
      </div>
      <div className="pills">
        <button type="button" className="pill" onClick={() => handlePillClick(thirdSuggestion)}>
          {thirdSuggestion}
        </button>
        <button type="button" className="pill" onClick={() => handlePillClick(fourthSuggestion)}>
          {fourthSuggestion}
        </button>
      </div>
    </>
  );
}

Pills.propTypes = {
  handlePillClick: PropTypes.func.isRequired,
};
