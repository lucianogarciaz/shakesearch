import React from 'react';
import Header from './Header';
import ChatSection from './ChatSection';

export default function Main() {
  return (
    <div className="app">
      <Header />
      <div className="container">
        <div className="main">
          <ChatSection />
        </div>
      </div>
      <footer className="container">
        <img alt="something" src="./pulley.png" />
      </footer>
    </div>
  );
}
