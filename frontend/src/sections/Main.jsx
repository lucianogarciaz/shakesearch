import React, { useState } from 'react';
import { TypeAnimation } from 'react-type-animation';
import Header from './Header';
import Form from './Form';
import Shakespeare from '../assets/Shakespeare';

export default function Main() {
  const initialAnswer = 'In Twelfth Night, gender roles are significant as they challenge traditional '
      + 'societal norms. The character of Viola disguises herself as a man, Cesario, to gain '
      + 'employment and navigate a male-dominated world. This leads to confusion and comedic situations, '
      + 'as characters are attracted to Viola/Cesario without realizing their true identity. '
      + 'The play also highlights the limitations and expectations placed on women, as seen through the '
      + "character of Olivia, who is expected to mourn her brother's death and reject any suitors. "
      + 'Overall, Twelfth Night questions the rigidity of gender roles and suggests that individuals '
      + 'should be free to express themselves regardless of societal expectations.\n';
  const [answer] = useState([initialAnswer]);
  return (
    <div className="app">
      <Header />
      <div className="container">
        <div className="main">
          <div className="left">
            <h1 className="text">
              Unravel the Bard&apos;s
              <b className="alternative"> wisdom </b>
              with
              <br />
              a
              <i> single </i>
              question
            </h1>
            <h2>
              Explore Shakespeare&apos;s world through our app by engaging in a
              dialogue with the Bard himself.
              Type your questions or thoughts about his life, works,
              or characters into the search bar.
            </h2>
          </div>
          <div className="right">
            <Form />
            <div className="response">
              <div className="box">
                <pre>
                  <Shakespeare />
                  {answer && (
                  <TypeAnimation
                    sequence={answer}
                    wrapper="span"
                    speed={80}
                    cursor
                  />
                  )}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
      <footer className="container">
        <p>Copyright @ 2023</p>
        <img alt="something" src="./pulley.png" />
      </footer>
    </div>
  );
}
