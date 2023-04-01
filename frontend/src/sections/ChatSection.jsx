import React, { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import Form from './Form';
import Shakespeare from '../assets/Shakespeare';

export default function ChatSection() {
  const initialAnswer = 'Greetings, good friend! Welcome to this wondrous place where thou shalt '
      + 'converse with me, the Bard, in merry discourse. '
      + 'Pray, dost thou seek to know of love or tragedy in my works?';

  const [answer, setAnswer] = useState([initialAnswer]);
  return (
    <div className="right">
      <Form setAnswer={setAnswer} />
      <div className="response">
        <div className="box">
          <pre>
            <Shakespeare />
            {answer && (
            <TypeAnimation
              key={answer.toString()}
              sequence={answer}
              wrapper="span"
              speed={90}
              cursor
            />
            )}
          </pre>
        </div>
      </div>
    </div>
  );
}
