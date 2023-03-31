import React from 'react';
import './App.css';
import Header from './sections/Header';
import Form from './sections/Form';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="container">
        <div className="main">
          <div className="left">
            <h1 className="text">
              Unravel the Bard&apos;s
              <b className="alternative"> wisdom</b>
              &nbsp;
              with
              <br />
              a
              <i> single</i>
              &nbsp;
              question
            </h1>
            <Form />
          </div>
          <div className="right">
            <h2>
              <b>Example: </b>
              What is the significance of gender roles in Twelfth Night?
            </h2>
            <div className="response">
              <div className="box">
                <pre>
                  In Twelfth Night, gender roles play a significant role in the plot and themes.
                  The play challenges traditional notions of gender identity and explores the
                  fluidity of gender roles. The character of Viola, who disguises herself as
                  a man, highlights the social limitations placed on women in Elizabethan
                  society. The play also depicts the confusion and ambiguity that arises when
                  gender roles are not strictly defined. Overall, Twelfth Night suggests that
                  gender is a construct that can be manipulated and challenged, and that
                  individuals should be free to express themselves regardless
                  of societal expectations.
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

export default App;
