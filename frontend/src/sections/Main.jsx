import React from 'react';
import Header from './Header';
import ChatSection from './ChatSection';
import LeftSection from './LeftSection';

export default function Main() {
  return (
    <div className="app">
      <Header />
      <div className="container">
        <div className="main">
          <LeftSection />
          <ChatSection />
        </div>
      </div>
      <footer className="container">
        <p>Copyright @ 2023</p>
        <img alt="something" src="./pulley.png" />
      </footer>
    </div>
  );
}
