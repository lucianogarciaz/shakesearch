import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

export default function Pills({ handlePillClick }) {
  const [suggestions, setSuggestions] = useState([]);

  const questions = [
    "What prophecy drives Macbeth's ambition?",
    "Who is Prospero's servant in 'The Tempest?",
    'Who betrays Julius Caesar in his play?',
    "Who are Romeo and Juliet's feuding families?",
    "Who disguises as a lawyer in 'Merchant of Venice'?",
    'Which play features fairy queen Titania?',
    "What forest is 'As You Like It' set in?",
    'Which play has a jealous King Leontes?',
    "Who is the king of Britain in 'King Lear'?",
    'What ghost haunts Hamlet in his play?',
    "Which play features the 'Three Witches'?",
    "Who is Othello's manipulative ensign?",
    "What island is 'The Tempest' set on?",
    'Which comedy has twins Viola and Sebastian?',
    "Who speaks the monologue 'All the world's a stage'?",
    "Which play has the famous line 'To be or not to be'?",
    'What play features the mischievous character Puck?',
    "Who is the Moorish general in 'Othello'?",
    "Which Shakespeare play is also known as 'The Scottish Play'?",
    "What is the name of the fairy king in 'A Midsummer Night's Dream'?",
    "Who is the Prince of Denmark in 'Hamlet'?",
    'Which play has the character of the Duke of Vienna disguised as a friar?',
    "In which play does a character say 'Parting is such sweet sorrow'?",
    "Who is the daughter of the Duke of Milan in 'The Tempest'?",
    'Which play has the famous balcony scene?',
    "What is the name of the town in 'Much Ado About Nothing'?",
    'Which play features the character Shylock, a Jewish moneylender?',
    'In which play does the Queen of Egypt fall in love with a Roman general?',
    "What is the name of the King of England in 'Richard III'?",
    'Which play features the Battle of Agincourt?',
  ];

  useEffect(() => {
    const randomQuestions = [];
    const questionsCopy = [...questions];

    for (let i = 0; i < questions.length; i += 1) {
      const randomIndex = Math.floor(Math.random() * questionsCopy.length);
      randomQuestions.push(questionsCopy[randomIndex]);
      questionsCopy.splice(randomIndex, 1);
    }

    setSuggestions(randomQuestions);
  }, []);

  const handlePillsSuggestion = async (suggestion, index) => {
    await handlePillClick(suggestion);
    if (suggestions.length > 4) {
      suggestions.splice(index, 1);
    }
  };

  return (
    <>
      <div className="pills">
        {suggestions.slice(0, 2).map((suggestion, index) => (
          <button
            key={suggestion}
            type="button"
            className="pill"
            onClick={() => handlePillsSuggestion(suggestion, index)}
          >
            {suggestion}
          </button>
        ))}
      </div>
      <div className="pills">
        {suggestions.slice(2, 4).map((suggestion, index) => (
          <button
            key={suggestion}
            type="button"
            className="pill"
            onClick={() => handlePillsSuggestion(suggestion, index + 2)}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </>
  );
}

Pills.propTypes = {
  handlePillClick: PropTypes.func.isRequired,
};
