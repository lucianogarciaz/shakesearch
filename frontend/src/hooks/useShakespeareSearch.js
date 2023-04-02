import { useState } from 'react';

export default function useShakespeareSearch(addConversation, setInputValue) {
  const [warningMessage, setWarningMessage] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);

  const waitingPhrase = '...';
  const errorMessage = 'Oops! Your Shakespearean request hit a snag. Please give it another go.';

  const submitQuestion = async (question) => {
    if (isAnswering || question === '') {
      return;
    }

    setIsAnswering(true);

    setWarningMessage(waitingPhrase);

    const endpoint = '/search';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question }),
      });

      if (!response.ok) {
        setTimeout(() => {
          setWarningMessage(errorMessage);
        }, 1000);
        setWarningMessage(errorMessage);
      }

      const data = await response.json();
      addConversation(question, [data.response]);
      setWarningMessage('');
      setInputValue('');
    } catch (error) {
      setTimeout(() => {
        setWarningMessage(errorMessage);
      }, 1000);
    }
    setIsAnswering(false);
  };

  return { warningMessage, isAnswering, submitQuestion };
}
